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
    let players = [new Player('dummy', 'x'), new Player('dummy', 'o')];
    let startingPlayer = players[0];
    let currentPlayer = players[0];
    let playersSet = true
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

    getWinningCombo = (mark) => {
        const board = gameBoard.getBoard();
        let winningCombo;
        gameBoard.getWinningCombos().forEach(i=> {
            if (board[i[0]] === mark && board[i[1]] === mark && board[i[2]] === mark) winningCombo = i;
        })
        return winningCombo
    }

    incrementNumOfMoves = () => numberOfMoves++;
    hasTied = () => numberOfMoves === 9;

    changeCurrentPlayer = () => currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];

    getCurrentPlayer = () => currentPlayer;

    arePlayersSet = () => playersSet;

    changeStartingPlayer = () => {
        const player = (startingPlayer === players[0]) ? players[1] : players[0];
        currentPlayer = player;
        startingPlayer = player;
    };

    return { getCurrentPlayer, addMark, clearBoard, hasPlayerWon, changeCurrentPlayer,
    incrementNumOfMoves, hasTied, arePlayersSet, changeStartingPlayer, getWinningCombo }
}();

const displayController = function() {
    const squares = document.querySelectorAll('.square');
    const output = document.querySelector('.output');
    const restartBtn = document.querySelector('.restart button');

    announceTurn = () => {
        output.textContent = `Player ${gameController.getCurrentPlayer().getMark().toUpperCase()}'s turn!`
    }

    announceTie = () => {
        output.textContent = `Tie!`;
    }

    announceWinner = (mark) => {
        output.textContent = `Player ${mark.toUpperCase()} has won!`;
    } 

    drawMark = (index, mark) => {
        const square = document.querySelector(`.square[data-board-index="${index}"`)
        square.style['background-image'] = `url(images/mark-${mark}.png)`;
    }

    clearDisplay = () => {
        squares.forEach(square => {
            square.removeAttribute('style');
        })
    }

    handleRestartBtn = () => {
        gameController.clearBoard();
        addListenersToSquares();
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

    darkenWinningFileds = (winningCombo) => {
        squares.forEach(square => {
            const squareIndex = square.getAttribute('data-board-index');
            if (winningCombo.includes(+squareIndex)) {
                square.style['background-color'] = '#9fd3c7';
            }
        })
    }

    function handleSquareSelect() {
        if (this.style['background-image']) return;

        const index = this.getAttribute('data-board-index');
        const currentPlayer = gameController.getCurrentPlayer();
        // const playerName = currentPlayer.getName();
        const playerMark = currentPlayer.getMark();

        gameController.addMark(index, playerMark);
        
        gameController.changeCurrentPlayer();
        announceTurn();

        gameController.incrementNumOfMoves();

        if (gameController.hasTied()) {
            announceTie();
            displayRestartBtn()
            gameController.changeStartingPlayer();
        }

        if (gameController.hasPlayerWon(playerMark)) {
            const winningCombo = gameController.getWinningCombo(playerMark);
            darkenWinningFileds(winningCombo);

            removeListenersFromSquares();
            announceWinner(playerMark);
            displayRestartBtn();
            gameController.changeStartingPlayer();
        }
    }

    removeListenersFromSquares = () => {
        squares.forEach(square => {
            square.removeEventListener('click', handleSquareSelect);
        })
    }

    addListenersToSquares = () => {
        announceTurn();
        if (!gameController.arePlayersSet()) return

        const squares = document.querySelectorAll('.square');

        squares.forEach(square => {
            square.addEventListener('click', handleSquareSelect)
        })
    };

    init = function() {
        addListenersToSquares();
    }();

    return { drawMark, clearDisplay, addListenersToSquares }
}();