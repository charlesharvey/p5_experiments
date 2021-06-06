

class Piece {


    constructor(color, type, rank, file) {
        this.element = document.createElement('DIV');

        this.color = color
        this.type = type
        this.rank = rank;
        this.file = file;
        this.value = 100;
        this.captured = false;
        this.setClassList();
        this.setPiecePosition();
        this.setValue();

        board.append(this.element);
    }



    setValue() {
        if (this.type == 'queen') {
            this.value = 900;
        } else if (this.type == 'bishop') {
            this.value = 300;
        } else if (this.type == 'knight') {
            this.value = 300;
        } else if (this.type == 'rook') {
            this.value = 500;
        } else if (this.type == 'king') {
            this.value = 999999;
        } else {
            this.value = 100;
        }
    }

    upgrade(type) {
        this.type = type;
        this.setClassList();
        this.setValue();
    }

    setClassList() {
        this.element.classList = `${this.color} ${this.type} piece`;
    }


    position() {
        return { rank: this.rank, file: this.file };
    }


    setPiecePosition() {
        this.element.style.transform = `translate(${this.file / 8 * board_size}px, ${this.rank / 8 * board_size}px)`;

    }

    setRankAndFile(rank, file) {
        this.rank = rank;
        this.file = file;
        this.setPiecePosition();

        if (this.type == 'pawn' && (this.rank == 0 || this.rank == 7)) {
            this.upgrade('queen');
        }
    }

    removeFromBoard() {
        this.captured = true;
        pieces = pieces.filter(p => p != this);
        board.removeChild(this.element);
    }

    sameColor(other) {
        if (!other) {
            return false
        }
        return (other.color == this.color);
    }


}



const board = document.getElementById('board');
let board_size = board.offsetWidth;

const players = ['white', 'black'];
let pieces = [];
let currentPlayer = 'white';
let selectedPiece = null;
let lastMovedPiece = null;
let lastMovedStaringPlace = null;
let gameEnded = false;

resetBoard();
addEventListeners();

function resetBoard() {
    players.forEach(color => {
        const main_piece_rank = (color === 'white') ? 7 : 0;
        const pawn_rank = (color === 'white') ? 6 : 1;
        appendPiece(color, 'rook', main_piece_rank, 0);
        appendPiece(color, 'knight', main_piece_rank, 1)
        appendPiece(color, 'bishop', main_piece_rank, 2)
        appendPiece(color, 'queen', main_piece_rank, 3)
        appendPiece(color, 'king', main_piece_rank, 4)
        appendPiece(color, 'bishop', main_piece_rank, 5)
        appendPiece(color, 'knight', main_piece_rank, 6)
        appendPiece(color, 'rook', main_piece_rank, 7);
        for (let i = 0; i < 8; i++) {
            appendPiece(color, 'pawn', pawn_rank, i);
        }
    })

}

function addEventListeners() {

    board.addEventListener("mousedown", (event) => {
        const bp = getBoardPositionFromEvent(event);
        const other_piece = getPieceAtPosition(bp.rank, bp.file);

        if (selectedPiece) {

            if (selectedPiece === other_piece) {
                selectPiece(null);
            } else {
                if (selectedPiece.sameColor(other_piece)) {
                    selectPiece(other_piece);
                } else {
                    movePiece(selectedPiece, bp.rank, bp.file);
                }
            }


        } else {
            // if no selected piece currently
            if (other_piece?.color == currentPlayer) {
                selectPiece(other_piece);
            }

        }
    })


    // HOVER
    // board.addEventListener('mousemove', (event) => {
    //     const bp = getBoardPositionFromEvent(event);
    //     const piece = getPieceAtPosition(bp.rank, bp.file);
    //     for (let i = 0; i < pieces.length; i++) {
    //         pieces[i].element.classList.remove('hovered');
    //     }
    //     if (piece) {
    //         piece.element.classList.add('hovered');
    //     }
    // });
    // HOVER


    window.addEventListener('resize', (event) => {
        board_size = board.offsetWidth;

        for (let i = 0; i < pieces.length; i++) {
            // refreshPiecePosition(pieces[i]);
            pieces[i].setPiecePosition();
        }
    })


}


function scoreMove(piece, rank, file) {
    const otherPiece = getPieceAtPosition(rank, file);
    if (otherPiece) {
        return otherPiece.value;
    } else {
        if (piece.type == 'pawn') {
            // encourage promoting of pawn
            return Math.abs(piece.rank - rank);
        }
    }

    return 0;

}

function legalMove(piece, rank, file) {
    const otherPiece = getPieceAtPosition(rank, file);
    if (otherPiece) {
        if (otherPiece.color === currentPlayer) {
            return false;
        }
    }

    const color = piece.color;
    const type = piece.type;
    const cp = piece.position();
    const cp_ind = boardIndex(cp.rank, cp.file);
    const ind = boardIndex(rank, file);
    const diff_ind = (cp_ind - ind);

    if (type == 'pawn') {
        let dirs = [8];
        if (otherPiece) {
            dirs = [7, 9];
        }
        if ((color == 'white' && cp.rank == 6) || (color == 'black' && cp.rank == 1)) {
            dirs.push(16);
        }
        if (color == 'black') {
            dirs = dirs.map(d => d * -1);
        }
        return dirs.includes(diff_ind);
    } else if (type == 'bishop') {
        // movement in x dir has to be same as y dir
        if (Math.abs(rank - cp.rank) === Math.abs(file - cp.file)) {
            return !diagonalBlockage(piece, rank, file, otherPiece);
        };
        return false;
    } else if (type == 'rook') {

        // check line of sight
        if (rank == cp.rank || file == cp.file) {
            return !linearBlockage(piece, rank, file, otherPiece);
        }
        return false;

    } else if (type == 'knight') {
        return ([17, -17, 10, -10, -6, 6, 15, -15].includes(diff_ind));
    } else if (type == 'king') {
        return ([8, -8, 1, -1, 7, -7, 9, -9].includes(diff_ind));
    } else if (type == 'queen') {
        const diagonally = Math.abs(rank - cp.rank) === Math.abs(file - cp.file);
        const straightline = (rank == cp.rank || file == cp.file);
        if (diagonally || straightline) {
            if (straightline) {
                return !linearBlockage(piece, rank, file, otherPiece);
            }
            if (diagonally) {
                return !diagonalBlockage(piece, rank, file, otherPiece);
            }
            return true;
        }
        return false;
    }



    return true;
}


function linearBlockage(piece, rank, file, otherPiece) {
    let anyBlockage = false;
    if (rank == piece.rank) {
        const minf = Math.min(file, piece.file);
        const maxf = Math.max(file, piece.file);
        for (let ff = minf; ff <= maxf; ff++) {
            const blockage = getPieceAtPosition(rank, ff);
            if (blockage && blockage !== piece && blockage !== otherPiece) {
                anyBlockage = true;
                break;
            }
        }
        return anyBlockage;
    } else if (file == piece.file) {
        const minr = Math.min(rank, piece.rank);
        const maxr = Math.max(rank, piece.rank);
        for (let rr = minr; rr <= maxr; rr++) {
            const blockage = getPieceAtPosition(rr, file);
            if (blockage && blockage !== piece && blockage !== otherPiece) {
                anyBlockage = true;
                break;
            }
        }
        return anyBlockage;
    }
    return anyBlockage;
}

function diagonalBlockage(piece, rank, file, otherPiece) {
    let anyBlockage = false;
    let steps = Math.abs(piece.file - file);
    let rr = piece.rank;
    let ff = piece.file;
    for (let i = 0; i < steps; i++) {
        const blockage = getPieceAtPosition(rr, ff);
        if (blockage && blockage !== piece && blockage !== otherPiece) {
            anyBlockage = true;
            break;
        }
        if (rank > piece.rank) {
            rr++;
        } else {
            rr--;
        }
        if (file > piece.file) {
            ff++;
        } else {
            ff--;
        }
    }
    return anyBlockage;


}




function boardIndex(rank, file) {
    return file + rank * 8;
}

function takePiece(piece, rank, file) {
    const otherPiece = getPieceAtPosition(rank, file);
    if (otherPiece) {
        otherPiece.removeFromBoard();
    }
}




function computerMakeRandomMove() {
    let bestMoves = [];

    let attempts = 0;
    while (bestMoves.length < 5 && attempts < 500) {
        const newmove = computerGetRandomMove();
        if (newmove) {
            bestMoves.push(newmove);
        }
        attempts++;
    };

    if (bestMoves.length > 0) {
        bestMoves.sort((a, b) => a.score < b.score);
        const moveToMake = bestMoves[0];
        selectedPiece = moveToMake.piece;
        setTimeout(() => {
            movePiece(moveToMake.piece, moveToMake.rank, moveToMake.file);
        }, 600);

    }
}


function computerGetRandomMove() {
    const black_pieces = pieces.filter(p => p.color === 'black');
    if (black_pieces.length > 0) {
        const randomI = Math.floor(Math.random() * black_pieces.length);
        const randomPiece = black_pieces[randomI];
        const r = Math.floor(Math.random() * 8);
        const f = Math.floor(Math.random() * 8);

        if (legalMove(randomPiece, r, f)) {
            const score = scoreMove(randomPiece, r, f);
            return { piece: randomPiece, rank: r, file: f, score: score };
        } else {
            return false;
        }
    }


}


function movePiece(piece, rank, file) {
    if (!gameEnded) {
        if ((piece.color) == currentPlayer) {
            if (legalMove(piece, rank, file)) {
                lastMovedPiece = selectedPiece;
                // lastMovedStaringPlace = something
                takePiece(piece, rank, file);
                piece.setRankAndFile(rank, file);
                selectPiece(null);

                if (isCheckmate()) {
                    alert('checkmate');
                    gameEnded = true;
                } else {
                    switchPlayer();
                }


            } else {

            }
        }


    }
}

function switchPlayer() {
    if (currentPlayer === 'white') {
        currentPlayer = 'black';

        computerMakeRandomMove();
    } else {
        currentPlayer = 'white';
    }
}




function selectPiece(piece) {

    selectedPiece = piece;

    for (let i = 0; i < pieces.length; i++) {

        pieces[i].element.classList.remove('selected');
        pieces[i].element.classList.remove('last_moved');
        if (pieces[i] === selectedPiece) {
            pieces[i].element.classList.add('selected');
        }
        if (pieces[i] === lastMovedPiece) {
            pieces[i].element.classList.add('last_moved');
        }
    }

}


function getBoardPositionFromEvent(e) {
    const rank = Math.floor(e.layerY * 8 / board_size);
    const file = Math.floor(e.layerX * 8 / board_size);
    return { rank, file };
}
function getPieceAtPosition(rank, file) {

    return pieces.find(p => p.file === file && p.rank === rank);




}


function appendPiece(color, type, rank, file) {


    pieces.push(new Piece(color, type, rank, file));

}



function isCheckmate() {
    const alives = pieces.filter(p => p.captured === false);
    if (alives.filter(p => p.type === 'king').length < 2) {
        return true;
    }


    const blacks = alives.filter(p => p.color === 'black');
    const white = alives.filter(p => p.color === 'white');
    if (blacks.length === 0 || white.length === 0) {
        return true;
    }

    return false;
}