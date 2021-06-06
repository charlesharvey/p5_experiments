

const board = document.getElementById('board');
const board_size = board.offsetWidth;

const players = ['white', 'black'];
const pieces = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
let currentPlayer = 'white';
let selectedPiece = null;
let lastMovedPiece = null;

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
                if (colorOfPiece(other_piece) === colorOfPiece(selectedPiece)) {
                    selectPiece(other_piece);
                } else {
                    movePiece(selectedPiece, bp.rank, bp.file);
                }
            }


        } else {
            // if no selected piece currently
            if (other_piece && colorOfPiece(other_piece) == currentPlayer) {
                selectPiece(other_piece);
            }
        }
    })


    // HOVER
    // board.addEventListener('mousemove', (event) => {
    //     const bp = getBoardPositionFromEvent(event);
    //     const piece = getPieceAtPosition(bp.rank, bp.file);
    //     const pieces = getPieces();
    //     for (let i = 0; i < pieces.length; i++) {
    //         pieces[i].classList.remove('hovered');
    //     }
    //     if (piece) {
    //         piece.classList.add('hovered');
    //     }
    // });
    // HOVER


}


function legalMove(piece, rank, file) {
    const otherPiece = getPieceAtPosition(rank, file);
    if (colorOfPiece(otherPiece) === currentPlayer) {
        return false;
    }
    return true;
}


function colorOfPiece(piece) {
    if (piece) {
        return piece.dataset.color;
    }
    return null;

}
function typeOfPiece(piece) {
    if (piece) {
        return piece.dataset.type;
    }
    return null;

}


function positionOfPiece(piece) {
    const rank = piece.dataset.rank;
    const file = piece.dataset.file;
    return { rank, file };
}

function takePiece(piece, rank, file) {
    const otherPiece = getPieceAtPosition(rank, file);
    if (otherPiece) {
        board.removeChild(otherPiece);
    }
}

function upgradePiece(piece, type) {
    const color = colorOfPiece(piece);
    piece.classList = `${color} ${type} piece`;
    piece.dataset.type = type;
}

function setPiecePosition(piece, rank, file) {

    if (typeOfPiece(piece) == 'pawn' && (rank == 0 || rank == 7)) {
        upgradePiece(piece, 'queen');
    }
    piece.style.transform = `translate(${file / 8 * board_size}px, ${rank / 8 * board_size}px)`;
    piece.dataset.rank = rank;
    piece.dataset.file = file;

}


function computerMakeRandomMove() {
    const pieces = getPieces();
    const black_pieces = [];
    for (let i = 0; i < pieces.length; i++) {
        if (colorOfPiece(pieces[i]) === 'black') {
            black_pieces.push(pieces[i])
        }
    }

    if (black_pieces.length > 0) {


        const randomI = Math.floor(Math.random() * black_pieces.length);

        if (randomI >= 0) {
            const randomPiece = black_pieces[randomI];

            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            if (legalMove(randomPiece, x, y)) {
                movePiece(randomPiece, x, y);
            } else {
                computerMakeRandomMove();
            }
        }
    } else {
        alert(' checkmate ');
    }

}


function movePiece(piece, rank, file) {
    if (colorOfPiece(piece) == currentPlayer) {
        if (legalMove(piece, rank, file)) {
            lastMovedPiece = selectedPiece;
            takePiece(piece, rank, file);
            setPiecePosition(piece, rank, file);
            selectPiece(null);
            switchPlayer();
        } else {

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


function getPieces() {
    return board.getElementsByClassName('piece');;
}

function selectPiece(piece) {

    selectedPiece = piece;
    const pieces = getPieces()
    for (let i = 0; i < pieces.length; i++) {

        pieces[i].classList.remove('selected');
        pieces[i].classList.remove('last_moved');
        if (pieces[i] === selectedPiece) {
            pieces[i].classList.add('selected');
        }
        if (pieces[i] === lastMovedPiece) {
            pieces[i].classList.add('last_moved');
        }



    }
    return null;
}


function getBoardPositionFromEvent(e) {
    const rank = Math.floor(e.layerY * 8 / board_size);
    const file = Math.floor(e.layerX * 8 / board_size);
    return { rank, file };
}
function getPieceAtPosition(rank, file) {
    const pieces = getPieces();
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        if (piece.dataset.rank === rank.toString() && piece.dataset.file === file.toString()) {
            return piece;
        }
    }
    return null;
}


function appendPiece(color, type, rank, file) {
    let piece = document.createElement('DIV');
    piece.classList = `${color} ${type} piece`;
    setPiecePosition(piece, rank, file);
    piece.dataset.type = type;
    piece.dataset.color = color;
    board.append(piece);
}

