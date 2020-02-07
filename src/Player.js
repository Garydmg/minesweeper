import Board from './Board';

class Player {
  constructor(n, numMines) {
    this.board = new Board(n, numMines);
    this.numCellsRevealed = 0;
    this.numbered = 0;
    this.gameOver = false;
  }

  numCellsUnrevealed() {
    const size = this.board.size;
    return size * size - this.numCellsRevealed - this.numbered;
  }

  isWinning() {
    const { numMines } = this.board; 
    return (this.numCellsUnrevealed() === parseInt(numMines)) ? true : false;
  }

  /**
   * Click to reveal part of the board that represents # of mines nearby
   * @param i, j: row and col number
  */
  probe(i, j) {
      // game over
      if (this.board.isMine(i, j)) {
          this.gameOver = true;
          return this;
      }
      this.dfs(i, j);
      return this;
  }

  /**
   * Use depth-first search to recursively find # of nearby mines
   */
  dfs(i, j) {
      const directions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
      let count = this.board.countMines(i, j);

      // if there is a count, no need to recurse further
      if (count !== 0) {
          if (!this.board.isNumbered(i, j)) {
              this.board.setNeightborMines(i, j, count);
              this.numbered++;
          }
          return;
      }
      // if there is no count, mark current location as visited/revealed
      this.board.setRevealed(i, j);
      this.numCellsRevealed++;

      // check all 8 directions
      for (const dir of directions) {
          let rowPos = i + dir[0];
          let colPos = j + dir[1];
          if (this.board.checkBound(rowPos, colPos)) {
              // if it is not visited and not a mine, visit it
              if (!this.board.isRevealed(rowPos, colPos) && !this.board.isMine(rowPos, colPos)) {
                  this.dfs(rowPos, colPos);
              }
          }
      }
  }


}

export default Player;