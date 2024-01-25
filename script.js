const gameboard = (function () {
    let arr = [];
    let rows = 3;
    let columns = 3;
    
    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = '';
            }
        }
    };

    const setBoard = (row, col, sym) => {
        arr[row][col] = sym;
    };

    const isFull = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (arr[i][j] === '') return false;
            }
        }
        return true;
    };
    
    clearBoard();
    const getBoard = () => arr;
    return { getBoard, setBoard, clearBoard, isFull };
})();

function createPlayer (name, symbol) {
    const playerName = name;
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => score++;
    const getSymbol = () => symbol;

    return { playerName, getScore, increaseScore, getSymbol };
};

const game = (function (){
    let playerOneName = 'x';
    let playerTwoName = 'o';

    const playerOne = createPlayer(playerOneName, 'x');
    const playerTwo = createPlayer(playerTwoName, (playerOne.getSymbol() === 'x' ? 'o' : 'x'));
    let currentPlayer = playerOne;
    let result;

    const play = function (row, column) {
        if (gameboard.getBoard()[row][column] === '') {
            gameboard.setBoard(row, column, currentPlayer.getSymbol());
            if (isWin()) {
                if (isWin() === 'x') {
                    playerOne.increaseScore()
                    result = isWin();
                } else {
                    playerTwo.increaseScore()
                    result = isWin();
                }
                currentPlayer = playerOne;
                display.roundEndDialog()
            } else 
            if (gameboard.isFull()) {
                result = 'tie';
                currentPlayer = playerOne;
                display.roundEndDialog()
            } else {
                currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
            }
        }  

        display.update();
    };

    function isWin () {
        let column = [];
        let diagonal = [];
        let diagonalB = [];
        const board = gameboard.getBoard();
        
        // check rows
        for (let row = 0; row < 3; row++){
            if (board[row].every((cell) => cell === 'x')){
                return 'x';
            };
            if (board[row].every((cell) => cell === 'o')){
                return 'o';
            }
        }; 

        // check columns
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++){
                column.push(board[row][col]); 
            } 
            if (column.every((cell) => cell === 'x')){
                return 'x';
            }
            if (column.every((cell) => cell === 'o')){
                return 'o';
            }
            column = [];    
        };
    
        // check diagonals
        for (let i = 0; i < 3; i++) {
            diagonal.push(board[i][i]); 
        };
        if (diagonal.every((cell) => cell === 'x')){
            return 'x';
        }
        if (diagonal.every((cell) => cell === 'o')){
            return 'o';
        }
        
        let n = 2; // reverse column order for the second diagonal
        for (let i = 0; i < 3; i++) {
                diagonalB.push(board[i][n]); 
                n--;
        };
        if (diagonalB.every((cell) => cell === 'x')){
            return 'x';
        }
        if (diagonalB.every((cell) => cell === 'o')){
            return 'o';
        }
    };

    const getResult = () => result;
    const getCurrentPlayer = () => currentPlayer;

    return { play, playerOne, playerTwo, getResult, getCurrentPlayer };
})();

const display = (function () {
    const wrapper = document.querySelector('.wrapper');

    const update = () => {
        wrapper.textContent = '';
        for (let i = 0; i < gameboard.getBoard().length; i++) {
            for (let j = 0; j < gameboard.getBoard()[i].length; j++) {
                let colCell = document.createElement('div');
                colCell.classList.add('cell');
                wrapper.appendChild(colCell);
                colCell.textContent = gameboard.getBoard()[i][j];
                colCell.addEventListener('click', () => {
                    game.play(i, j);
                })
            }
        }

        const scoreDisplay = document.querySelector('.score-display');
        scoreDisplay.textContent = '';
        
        const currentPlayer = document.createElement('p');
        currentPlayer.textContent = `turn: ${game.getCurrentPlayer().playerName}`;
        scoreDisplay.appendChild(currentPlayer); 

        const p1Score = document.createElement('p');
        p1Score.textContent = `score: ${game.playerOne.playerName} = ${game.playerOne.getScore()}`;
        scoreDisplay.appendChild(p1Score);

        const p2Score = document.createElement('p');
        p2Score.textContent = `${game.playerTwo.playerName} = ${game.playerTwo.getScore()}`;
        scoreDisplay.appendChild(p2Score);
    }
    
    const roundEndDialog = () => {
        const dialog = document.createElement('div');
        dialog.classList.add('round-end-dialog'); 

        let winner = document.createElement('p');  
        switch (game.getResult()) {
            case 'x':
                winner.textContent = `${game.playerOne.playerName} wins!`;
                break;
            case 'o':
                winner.textContent = `${game.playerTwo.playerName} wins!`;
                break;
            case 'tie':
                winner.textContent = `It's a tie!`;
                break;
        }
        dialog.appendChild(winner);
        
        const restartButton = document.createElement('button');
        restartButton.textContent = 'restart';
        dialog.appendChild(restartButton)
        
        document.body.appendChild(dialog);
        restartButton.addEventListener('click', () => {
            gameboard.clearBoard();
            update();
            document.body.removeChild(dialog);
        });
    }

    // const nameDialog = () => {
    //     const dialog = 
    // }

    update();
    return { update, roundEndDialog };
}());