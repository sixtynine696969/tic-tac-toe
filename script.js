const gameBoard = function() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [6, 4, 2],
    ]
    let board = []

    clearBoard = () => board = [];
    populatBoardWithNulls = () => {
        while (board.length != 9) {
            board.push(null);
        }
    }

    startNew = () => {
        clearBoard()
        populatBoardWithNulls()
    }

    addMark = (idx, mark) => board[idx] = mark;

    getBoard = () => board;

    return { startNew, addMark, getBoard }
}();