/* This class is used to create/ draw a connect four game board and logic for deciding winner*/
class Board {
    constructor(boardElementId) {
        this.board = boardElementId;
        this.boardState = new BoardState();
        this.createBoard();
        this.isGameOver = false;
        this.playerOneColor = 'player1-color';
        this.playerTwoColor = 'player2-color';
        //handle column click and change player..
        this.handleClickEvents();

    }

    // Create a board with defined no of rows and columns using global totalRows & totalColumns variables.
    createBoard() {
        const $board = $(this.board);
        for (let row = 0; row < this.boardState.totalRows; row++) {
            const $row = $('<div>').addClass('row');
            for (let col = 0; col < this.boardState.totalColumns; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                $row.append($col);
            }
            $board.append($row);
        }

        $('#startGame').on('click', this.resetBoard.bind(this));
    }

    resetBoard() {
        this.isGameOver = false;
        this.boardState = new BoardState();
        const $board = $(this.board);
        $board.empty();
        $("#gameStatus").addClass('hidden');
        this.createBoard();
    }

    handleClickEvents() {
        const $board = $(this.board);
        let that = this;
        function updateEmptyCellClass(currentColumn) {

            const latestEmptyPostion = that.boardState.getLatestEmptyPosition(currentColumn);

            const row$ = $(`.row:nth-child(${latestEmptyPostion[0] + 1})`);
            const cell$ = row$.find(".col")[latestEmptyPostion[1]];

            $(cell$).removeClass('empty');
            let className = that.boardState.currentColor === that.boardState.COLORS.RED ? that.playerOneColor
                : that.playerTwoColor;
            $(cell$).addClass(className);


        }

        $board.on('click', '.col.empty', function () {
            if (that.isGameOver) {
                return;
            }
            const currentColumn = $(this).index();
            updateEmptyCellClass(currentColumn);
            that.boardState.updateLatestEmptyPosition(currentColumn);
            const winner = that.boardState.checkWinner(currentColumn);

            // Find winner - core logic
            if (winner) {
                $('#currentPlayerStatus').html(`Player ${that.boardState.currentColor}`);
                $("#gameStatus").toggleClass('hidden');
                that.isGameOver = true;
                return;
            }
            if (!that.isGameOver) {
                that.boardState.switchPlayer();
                $('#currentPlayerAction').html(`Player ${that.boardState.currentColor}`);
            }
        })
    }
}