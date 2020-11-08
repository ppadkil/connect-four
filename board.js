class Board {
 constructor(boardElementId) {
     // For 2 dimensional array and also the columns and rows should be dynamic as per requirement of game
     this.totalRows = 6;
     this.totalColumns = 7;
     this.board = boardElementId;
     this.createBoard();

 }

 createBoard() {
    const $board = $(this.board);
    for(let row = 0; row < this.totalRows; row++) {
        const $row = $('<div>').addClass('row')
        for (let col = 0; col < this.totalColumns; col++ ) {
            const $col = $('<div>').addClass('col empty');
            $row.append($col);
        }
        $board.append($row);
    }
 }
}