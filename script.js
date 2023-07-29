const gameBoard = function() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [6, 4, 2],
    ];
    let board = new Array(9);

    clear = () => board = new Array(9);

    getWinningCombos = () => winningCombos;

    addMark = (idx, mark) => board[idx] = mark;

    getBoard = () => board;

    isSquareEmpty = (idx) => !board[idx]

    return { clear, addMark, getBoard, getWinningCombos, isSquareEmpty };
}();

const Player = function(name, mark) {
    getName = () => name;
    getMark = () => mark;
    
    return { getName, getMark };
}

const gameController = function() {
    let players = [new Player('joe', 'x'), new Player('josh', 'o')];
    let currentPlayer = players[0];
    let arePlayersSet = true
    let numberOfMoves = 0;

    addMark = (index, mark) => {
        gameBoard.addMark(index, mark);
        displayController.drawMark(index, mark);
    }

    clearBoard = () => {
        gameBoard.clear()
        displayController.clearDisplay();
        numberOfMoves = 0;
    }

    hasPlayerWon = (mark) => {
        const board = gameBoard.getBoard();

        let wonFlag;
        gameBoard.getWinningCombos().forEach(i=> {
            if (board[i[0]] === mark && board[i[1]] === mark && board[i[2]] === mark) wonFlag = true
        })
        return wonFlag ? wonFlag : false;
    }

    incrementNumOfMoves = () => numberOfMoves++;
    hasTied = () => numberOfMoves === 9;

    changeCurrentPlayer = () => currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];

    getCurrentPlayer = () => currentPlayer;

    return { arePlayersSet, getCurrentPlayer, addMark, clearBoard, hasPlayerWon, changeCurrentPlayer,
    incrementNumOfMoves, hasTied }
}();

const displayController = function() {
    const squares = document.querySelectorAll('.square');
    const output = document.querySelector('.output');
    const restartBtn = document.querySelector('.restart button');

    updateTurn = () => {
        output.textContent = `Player ${gameController.getCurrentPlayer().getMark().toUpperCase()}'s turn!`
    }

    announceTie = () => {
        output.textContent = `Tie!`;
    }

    announceWinner = (mark) => {
        const output = document.querySelector('.output');
        output.textContent = `Player ${mark.toUpperCase()} has won!`;
    } 

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

    handleRestartBtn = () => {
        gameController.clearBoard();
        addEventsForDrawing();
        hideRestartBtn();
    }


    displayRestartBtn = () => {
        restartBtn.style['visibility'] = 'visible';

        restartBtn.addEventListener('click', handleRestartBtn);
    }

    hideRestartBtn = () => {
        restartBtn.style['visibility'] = 'hidden';

        restartBtn.removeEventListener('click', handleSquareSelect);
    }

    function handleSquareSelect() {
        if (this.style['background-image']) return;

        const index = this.getAttribute('data-board-index');
        const currentPlayer = gameController.getCurrentPlayer();
        const playerName = currentPlayer.getName();
        const playerMark = currentPlayer.getMark();

        gameController.addMark(index, playerMark);
        gameController.changeCurrentPlayer();

        gameController.incrementNumOfMoves();

        updateTurn();

        if (gameController.hasTied()) {
            announceTie();
            displayRestartBtn()
        }

        if (gameController.hasPlayerWon(playerMark)) {
            removeEventsForDrawing();
            announceWinner(playerMark);
            displayRestartBtn();
        }
    }

    removeEventsForDrawing = () => {
        squares.forEach(square => {
            square.removeEventListener('click', handleSquareSelect);
        })
    }

    addEventsForDrawing = () => {
        updateTurn();
        if (!gameController.arePlayersSet) return

        const squares = document.querySelectorAll('.square');

        squares.forEach(square => {
            square.addEventListener('click', handleSquareSelect)
        })
    };

    init = function() {
        addEventsForDrawing();
    }();

    return { drawMark, clearDisplay, addEventsForDrawing }
}();