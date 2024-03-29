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
    let playerOne = createPlayer('', 'x');
    let playerTwo = createPlayer('', 'o');
    let currentPlayer;
    
    const setNames = (p1, p2) => {
        p1 ? playerOne.playerName = p1 : playerOne.playerName = 'x';
        p2 ? playerTwo.playerName = p2 : playerTwo.playerName = 'o';
        currentPlayer = playerOne;
    }

    let result;
    let gameActive = true;

    const play = function (row, column) {
        if (gameboard.getBoard()[row][column] === '' && gameActive) {
            gameboard.setBoard(row, column, currentPlayer.getSymbol());
            if (isWin()) {
                gameActive = false;
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
                gameActive = false;
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
    const activateGame = () => gameActive = true;

    return { play, playerOne, playerTwo, getResult, getCurrentPlayer, activateGame, setNames };
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
        dialog.classList.add('dialog'); 

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
        restartButton.textContent = 'play again';
        dialog.appendChild(restartButton)
        
        document.body.appendChild(dialog);
        restartButton.addEventListener('click', () => {
            gameboard.clearBoard();
            update();
            game.activateGame();
            
            document.body.removeChild(dialog);
        });
    }

    const initialDialog = document.querySelector('.dialog');
    const xNameInput = document.querySelector('#x-name');
    const oNameInput = document.querySelector('#o-name');

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => {
        game.setNames(xNameInput.value, oNameInput.value);
        document.body.removeChild(initialDialog);
        update();    
    });

    const getXNameInput = () => xName;
    const getONameInput = () => oName;

    return { update, roundEndDialog, getXNameInput, getONameInput };
}());