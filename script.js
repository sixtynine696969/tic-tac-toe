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

const displayController = function() {

    drawMark = (index, mark) => {
        const square = document.querySelector(`.square[data-board-index="${index}"`)
        square.style['background-image'] = `url(images/mark-${mark}.png)`;
    }

    clearDisplay = () => {
        const squares = document.querySelectorAll('.square');

        squares.forEach(square => {
            square.removeAttribute('style');
        })
    }

    return { drawMark, clearDisplay }
}();