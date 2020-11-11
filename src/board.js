/* This class is used to create/ draw a connect four game board and logic for deciding winner*/
class Board {
    constructor(boardElementId) {
        this.totalRows = 6;
        this.totalColumns = 7;
        this.board = boardElementId;
        this.createBoard();
        this.isGameOver = false;
        this.playerOne = 'Player 1';
        this.playerTwo = 'Player 2';
        this.playerOneColor = 'player1-color';
        this.playerTwoColor = 'player2-color';
        // current player intitialized to Player 1
        this.currentPlayer = this.playerOne;
        //handle column click and change player..
        this.handleClickEvents();
    }

    // Create a board with defined no of rows and columns using global totalRows & totalColumns variables.
    createBoard() {
        this.isGameOver = false;
        const $board = $(this.board);
        for (let row = 0; row < this.totalRows; row++) {
            const $row = $('<div>').addClass('row');
            for (let col = 0; col < this.totalColumns; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col).attr('data-row', row);
                $row.append($col);
            }
            $board.append($row);
        }
    }

    handleClickEvents() {
        const $board = $(this.board);
        let that = this;
        function getEmptyCell(column) {
            const cells = $(`.col[data-col='${column}']`);
            for (let i = cells.length - 1; i >= 0; i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
        }

        $board.on('click', '.col.empty', function () {
            if (that.isGameOver) {
                return;
            }
            const currentColumn = $(this).data('col');
            const $emptyCell = getEmptyCell(currentColumn);
            $emptyCell.removeClass('empty');
            // add class for current player and store current player value
            that.currentPlayer === that.playerOne ? 
            $emptyCell.addClass(that.playerOneColor) : $emptyCell.addClass(that.playerTwoColor);
            $emptyCell.data('player', that.currentPlayer);

            // Find winner - core logic..settimeout added so that last cell gets time to render.
            setTimeout(() => {
            const winner = that.checkWinner($emptyCell.data('row'), $emptyCell.data('col'));
            if (winner) {
                that.isGameOver = true;
                alert(`Game won by ${winner} !!`);
                // Reset board for a new game and return
                that.resetBoard();
                return;
            }
            that.currentPlayer = (that.currentPlayer === that.playerOne) ? that.playerTwo : that.playerOne;
            $('#currentPlayer').text(that.currentPlayer);
            }, 0);

        })
    }

    resetBoard() {
        let that = this;
        that.currentPlayer = that.playerOne;
        const $board = $(that.board);
        $board.empty();
        that.createBoard();
    }

    checkWinner(row, column) {
        const that = this;
        function $getCell(rowNo, colNo) {
            return $(`.col[data-row='${rowNo}'][data-col='${colNo}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let rowNo = row + direction.row;
            let colNo = column + direction.column;
            let $next = $getCell(rowNo, colNo);
            // TODO: instead of $getCell which is more on DOM manipulation, 
            // this logic could be moved to a separate class to have, filled positions in a 2-dimensional array filledPositions[rowNo, colNo] = COLORS.RED
            // Then using jquery .index(column) and .index(parent).column
            while (rowNo >= 0 && rowNo < that.totalRows && colNo >= 0 && colNo < that.totalColumns
                && $next.data('player') === that.currentPlayer) {
                total++;
                rowNo += direction.row;
                colNo += direction.column;
                $next = $getCell(rowNo, colNo);
            }
            return total;
        }
        function checkResult(directionUp, directionDown) {
            let total = 1 + checkDirection(directionUp) + checkDirection(directionDown);
            if (total >= 4) {
                return that.currentPlayer;
            } else {
                return null;
            }
        }

        function checkVerticals() {
            return checkResult({ row: -1, column: 0 }, { row: 1, column: 0 });
        }
        function checkHorizontals() {
            return checkResult({ row: 0, column: -1 }, { row: 0, column: 1 });
        }

        function checkDiagonalsBottomToTop() {
            return checkResult({ row: 1, column: -1 }, { row: 1, column: 1 });
        }
        function checkDiagonalsTopToBottom() {
            return checkResult({ i: 1, j: 1 }, { i: -1, j: -1 });
        }
       
        return checkVerticals() || checkHorizontals() || checkDiagonalsBottomToTop() || checkDiagonalsTopToBottom();
    }
}