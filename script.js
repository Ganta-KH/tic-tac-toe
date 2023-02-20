let playerTurnMark = "X";

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
    function _getPosition(index) {
        return [Math.floor(index / 3), index % 3];
    }

    function _play(cell, index, turn) {
        if (cell.textContent !== "") return;
        [x, y] = _getPosition(index);
        board[x][y] = playerTurnMark;
        console.table(board)

        cell.textContent = playerTurnMark;
        playerTurnMark = playerTurnMark === "O" ? "X" : "O";
        turn.textContent = `Player "${playerTurnMark}" Turn`;
    }

    function _fullBoard(board) {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if (board[i][j] === "") return false;
            }
        }
        return true;
    } 

    function restart(board) {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.textContent = "";
        });

        board.forEach((col, index) => {
            col[index] = "";
        }, board);
    }

    function winner(board) {
        let win = "";
        if (
            board[0][0] !== "" &&
            ((board[0][0] === board[0][1] && board[0][1] === board[0][2]) ||
                (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
                (board[0][0] === board[1][0] && board[1][0] === board[2][0]))
        )
            win = board[0][0];

        if (
            board[1][0] !== "" &&
            board[1][0] === board[1][1] &&
            board[1][1] === board[1][2]
        )
            win = board[1][0];

        if (
            board[2][0] !== "" &&
            board[2][0] === board[2][1] &&
            board[2][1] === board[2][2]
        )
            win = board[2][0];

        if (
            board[0][1] !== "" &&
            board[0][1] === board[1][1] &&
            board[1][1] === board[2][1]
        )
            win = board[0][1];

        if (
            board[0][2] !== "" &&
            ((board[0][2] === board[1][2] && board[1][2] === board[2][2]) ||
                (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
        )
            win = board[0][2];

        if (win !== "") return `The Winner is ${win}`;
        else if ( _fullBoard(board) ) return "It's a Draw";
        return win;
    }

    function setBoard() {
        const cells = document.querySelectorAll(".cell");
        const turn = document.querySelector(".turn");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                _play(cell, index, turn);
            });
        });
    }

    return { restart, winner, setBoard };
})();


function ticTacToe() {
    if (Game.winner(board) === "") {
        Game.setBoard()
    }
}

ticTacToe()