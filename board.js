class Board {
 constructor(boardElementId) {
     // For 2 dimensional array and also the columns and rows should be dynamic as per requirement of game
     this.totalRows = 6;
     this.totalColumns = 7;
     this.board = boardElementId;
     this.createBoard();
     // current player intitialized to Player 1
     this.currentPlayer = 'Player 1';
     
     //handle column click and change player..
     this.handleClickEvents();
 }

 createBoard() {
    const $board = $(this.board);
    for(let row = 0; row < this.totalRows; row++) {
        const $row = $('<div>').addClass('row')
        for (let col = 0; col < this.totalColumns; col++ ) {
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
            if($cell.hasClass('empty')) {
                return $cell;
            }
            return null;
        }
    }
    
    $board.on('click', '.col.empty', function() {
        const currentColumn = $(this).data('col');
        const $emptyCell = getEmptyCell(currentColumn);
        that.currentPlayer === 'Player 1'?  $emptyCell.addClass('player1-color') : $emptyCell.addClass('player2-color');
        that.currentPlayer = (that.currentPlayer === 'Player 1') ? 'Player 2':'Player 1';
        console.log('Player Changed = ', that.currentPlayer);
    })
 }
}