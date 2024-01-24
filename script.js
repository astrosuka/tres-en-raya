const gameboard = (function () {
    let arr = [];
    let rows = 3;
    let columns = 3;
    
    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    };

    const setBoard = (row, col, sym) => {
        arr[row][col] = sym;
    };
    
    clearBoard();
    const getBoard = () => arr;
    return { getBoard, setBoard, clearBoard };
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
     
    const playRound = function (player, row, column) {
        if (gameboard.getBoard()[row][column] === 0) {
            gameboard.setBoard(row, column, player.getSymbol())
        }      
         
        isWin() ? console.log('the winner is: ' + isWin()) : console.log('ready for new round!');
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
      
    return { playRound, playerOne, playerTwo };
})();

// test
game.playRound(game.playerOne, 0, 2);
game.playRound(game.playerOne, 0, 1);
game.playRound(game.playerOne, 0, 0);
