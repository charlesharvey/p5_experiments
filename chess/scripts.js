

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
            this.value = '900';
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


function legalMove(piece, rank, file) {
    const otherPiece = getPieceAtPosition(rank, file);
    const color = piece.color;;
    const type = piece.type;;
    const cp = piece.position();

    const cp_ind = boardIndex(cp.rank, cp.file);
    const ind = boardIndex(rank, file);
    const diff_ind = (cp_ind - ind);

    if ((otherPiece?.color) === currentPlayer) {
        return false;
    }
    if (type == 'pawn') {
        if (color == 'white') {
            if (cp.rank == 6) {
                return ([8, 16, 7, 9].includes(diff_ind));
            } else {
                return ([8, 7, 9].includes(diff_ind));
            }
        } else {
            if (cp.rank == 1) {
                return ([-8, -16, -7, -9].includes(diff_ind));
            } else {
                return ([-8, -7, -9].includes(diff_ind));
            }
        }

    } else if (type == 'bishop') {
        // movement in x dir has to be same as y dir
        const dr = Math.abs(rank - cp.rank);
        const df = Math.abs(file - cp.file);
        return (dr === df)
    } else if (type == 'rook') {
        return (rank == cp.rank || file == cp.file);
    } else if (type == 'knight') {
        return ([17, -17, 10, -10, -6, 6, 15, -15].includes(diff_ind));
    } else if (type == 'king') {
        return ([8, -8, 1, -1, 7, -7, 9, -9].includes(diff_ind));
    } else if (type == 'queen') {
        const diagonally = ((rank + cp.rank) % 2 === (file + cp.file) % 2);
        const straightline = (rank == cp.rank || file == cp.file);
        return (diagonally || straightline);
    }



    return true;
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

    const black_pieces = [];
    for (let i = 0; i < pieces.length; i++) {
        if ((pieces[i].color) === 'black') {
            black_pieces.push(pieces[i])
        }
    }




    const randomI = Math.floor(Math.random() * black_pieces.length);

    if (randomI >= 0) {
        const randomPiece = black_pieces[randomI];


        const x = Math.floor(Math.random() * 8);
        const y = Math.floor(Math.random() * 8);
        if (legalMove(randomPiece, x, y)) {
            selectedPiece = randomPiece;
            movePiece(randomPiece, x, y);

        } else {
            computerMakeRandomMove();
        }
    }


}


function movePiece(piece, rank, file) {
    if (!gameEnded) {
        if ((piece.color) == currentPlayer) {
            if (legalMove(piece, rank, file)) {
                lastMovedPiece = selectedPiece;
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