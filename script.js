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
    const playerOne = createPlayer('Player 1', 'x');
    const playerTwo = createPlayer('Player 2', (playerOne.getSymbol() === 'x' ? 'o' : 'x'));
    let currentPlayer = playerOne;

    console.log('Ready to play!')

    const play = function (row, column) {
        if (gameboard.getBoard()[row][column] === '') {
            gameboard.setBoard(row, column, currentPlayer.getSymbol());
            console.table(gameboard.getBoard());
            if (isWin()) {
                if (isWin() === 'x') {
                    playerOne.increaseScore()
                    console.log('the winner is: ' + playerOne.playerName)
                } else {
                    playerTwo.increaseScore()
                    console.log('the winner is: ' + playerTwo.playerName)
                }
                console.log('p1 score: ' + playerOne.getScore() + ' | p2 score: ' + playerTwo.getScore());
                // volver a empezar
                currentPlayer = playerOne;
                // Make it wait for an interaction before running clearBoard
                gameboard.clearBoard();
            } else 
            if (gameboard.isFull()) {
                console.log(`It's a Tie!`);
                console.log('p1 score: ' + playerOne.getScore() + ' | p2 score: ' + playerTwo.getScore());
                // volver a empezar
                currentPlayer = playerOne;
                // Make it wait for an interaction before running clearBoard
                gameboard.clearBoard();
            } else {
                console.log('ready for new round!');
                // switch currentPlayer
                currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
            }
        } 
        
        display.update();

    };

    function isWin () {
        let column = [];
        let diagonal = [];
        let diagonalB = [];
        let winner;
        const board = gameboard.getBoard();
        
        // check rows
        for (let row = 0; row < 3; row++){
            if (board[row].every((cell) => cell === 'x')){
                return winner = 'x';
            };
            if (board[row].every((cell) => cell === 'o')){
                return winner = 'o';
            }
        }; 

        // check columns
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++){
                column.push(board[row][col]); 
            } 
            if (column.every((cell) => cell === 'x')){
                return winner = 'x';
            }
            if (column.every((cell) => cell === 'o')){
                return winner = 'o';
            }
            column = [];    
        };
    
        // check diagonals
        for (let i = 0; i < 3; i++) {
            diagonal.push(board[i][i]); 
        };
        if (diagonal.every((cell) => cell === 'x')){
            return winner = 'x';
        }
        if (diagonal.every((cell) => cell === 'o')){
            return winner = 'o';
        }
        
        let n = 2; // reverse column order for the second diagonal
        for (let i = 0; i < 3; i++) {
                diagonalB.push(board[i][n]); 
                n--;
        };
        if (diagonalB.every((cell) => cell === 'x')){
            return winner = 'x';
        }
        if (diagonalB.every((cell) => cell === 'o')){
            return winner = 'o';
        }
    };
      
    return { play, playerOne, playerTwo };
})();

const display = (function () {
    const wrapper = document.querySelector('.wrapper');

    const update = () => {
        wrapper.textContent = '';
        for (let i = 0; i < gameboard.getBoard().length; i++) {
            // let rowCell = document.createElement('div');
            // rowCell.classList.add('row-cell');
            // wrapper.appendChild(rowCell);
            // console.log(gameboard.getBoard()[i]);
            for (let j = 0; j < gameboard.getBoard()[i].length; j++) {
                console.log(gameboard.getBoard()[i][j])
                let colCell = document.createElement('div');
                colCell.classList.add('cell');
                wrapper.appendChild(colCell);
                colCell.textContent = gameboard.getBoard()[i][j];
            }
        }
    }

    update();

    return { update };
}());

// // test
// //tie
// game.play(0, 2);
// game.play(1, 2);
// game.play(1, 1);
// game.play(2, 0);
// game.play(2, 1);
// game.play(0, 1);
// game.play(0, 0);
// game.play(2, 2);
// game.play(1, 0);

// // p1 win
// game.play(0, 0);
// game.play(1, 2);
// game.play(0, 1);
// game.play(2, 0);
// game.play(0, 2);

// // p2 win
// game.play(2, 2);
// game.play(0, 0);
// game.play(1, 2);
// game.play(0, 1);
// game.play(2, 0);
// game.play(0, 2);
