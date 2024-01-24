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
    
    clearBoard();
    const getBoard = () => arr;
    return { getBoard, clearBoard };
})();

function createPlayer (name, symbol) {
    const playerName = name;
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => score++;
    const getSymbol = () => symbol;

    return{ playerName, getScore, increaseScore, getSymbol };
};