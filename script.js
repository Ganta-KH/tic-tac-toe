const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const Player = function (mark) {
    function play(board, x, y) {
        board[x][y] = mark;
    }

    return { mark, play };
};

const Game = (function () {
    function restart(board) {
        board.forEach((col, index) => {
            col[index] = "";
        }, board);
    }

    return { restart };
})();

console.table(board);
const player = Player("X");
player.play(board, 0, 0);

console.table(board);

Game.restart(board);

console.table(board);
