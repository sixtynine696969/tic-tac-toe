const gameBoard = function() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [6, 4, 2],
    ];
    let board = [];

    clear = () => board = [];
    populateWithNulls = () => {
        while (board.length != 9) board.push(null);
    }

    startNew = () => {
        clear();
        populateWithNulls();
    }

    getWinningCombos = () => winningCombos;

    addMark = (idx, mark) => board[idx] = mark;

    getBoard = () => board;

    isSquareEmpty = (idx) => !board[idx] 

    return { startNew, addMark, getBoard, getWinningCombos, isSquareEmpty };
}();

const Player = function(name, mark) {
    getName = () => name;
    getMark = () => mark;
    
    return { getName, getMark };
}

/* ----------------------------------------------------------------- */

// player1 = Player('john', 'x')
// player2  = Player('joe', 'o')

// gameBoard.addMark(0, 'x')
// gameBoard.addMark(2, 'o')
// gameBoard.addMark(6, 'x')

// const squares = document.querySelectorAll('.square');

// squares.forEach(square => {
//     const index = square.getAttribute('data-board-index')
//     const board = gameBoard.getBoard();

//     if (!board[index] || square.style['background-image']) return;
//     if (board[index] === 'x') {
//         square.style['background-image'] = "url(images/mark-x.png)";
//     } else {
//         square.style['background-image'] = "url(images/mark-o.png)";
//     }

// })

/* ----------------------------------------------------------------- */

const displayController = function() {

    // const squares = document.querySelectorAll('.square');

    // squares.forEach(square => {
    //     square.addEventListener('click', e => {
    //         if (square.style['background-image']) return;

    //         square.style['background-image'] = "url(images/mark-o.png)";
    //         // square.removeAttribute('style')
    //     })
    // })
}();

const gameController = function() {
    
}