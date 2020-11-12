class BoardState {
    constructor() {
        this.totalRows = 6;
        this.totalColumns = 7;
        this.COLORS = {
            RED: 1,
            BLUE: 2
        }
        this.boardState = [
            [],
            [],
            [],
            [],
            [],
            []
        ];
        this.latestEmptyPositions = {
            0: [5, 0],
            1: [5, 1],
            2: [5, 2],
            3: [5, 3],
            4: [5, 4],
            5: [5, 5],
            6: [5, 6]
        }
        this.currentColor = this.COLORS.RED;
    }

    switchPlayer() {
        this.currentColor = (this.currentColor === this.COLORS.RED)
            ? this.COLORS.BLUE : this.COLORS.RED;
    }

    checkWinner(currentColumn) {
        const columnPosition = this.getLatestEmptyPosition(currentColumn);

        const row = columnPosition[0] + 1;
        const column = currentColumn;
        const that = this;

        function checkDirection(direction) {
            let total = 0;
            let rowNo = row + direction.row;
            let colNo = column + direction.column;
            let color = 0;
            if (that.boardState[rowNo] && that.boardState[rowNo][colNo]) {
                color = that.boardState[rowNo][colNo];
            }

            while (rowNo >= 0 && rowNo < that.totalRows && colNo >= 0 && colNo < that.totalColumns
                && color === that.currentColor) {
                total++;
                rowNo += direction.row;
                colNo += direction.column;
                if (that.boardState[rowNo] && that.boardState[rowNo][colNo]) {
                    color = that.boardState[rowNo][colNo];
                }
                else {
                    color = 0;
                }
            }

            return total;
        }
        function checkResult(directionUp, directionDown) {
            let total = 1 + checkDirection(directionUp) + checkDirection(directionDown);
            if (total >= 4) {
                return that.currentColor;
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

    updateLatestEmptyPosition(currentColumn) {
        const cellPosition = this.latestEmptyPositions[currentColumn];
        const row = cellPosition[0];
        this.boardState[row][currentColumn] = this.currentColor;
        cellPosition[0] = cellPosition[0] - 1;
    }

    getLatestEmptyPosition(column) {
        return this.latestEmptyPositions[column];
    }
}