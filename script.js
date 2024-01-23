const gameboard = (function () {
    let arr = [];
    let rows = 3;
    let columns = 3;

    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = j;
        }
    }

    const getBoard = () => arr;
    return { getBoard };
})();