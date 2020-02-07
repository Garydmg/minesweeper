/**
 * GameAI implements algorithms for solving the puzzle
 */

class GameAI {
  constructor(gameBoard) {
    this.board = gameBoard;
    this.untouched = this.boardToArray(this.board);
  }

  singlePointAlgorithm(printSteps = false) {
    this.untouched = this.boardToArray(this.board);

    // key: unique id, value: cell
    const S = new Map(); // safe cells to explore
    let SArray = []; // stores same content as S, assist S for deletion
    let Q = new Map(); // cells that need more information regarding neighbors

    const opener = this.firstMove();
    S.set(opener.id, opener);
    SArray.push(opener);

    let iteration = 0;
    
    // while game is not over
    while (this.untouched.length > this.board.numMines) {
      iteration++;
      
      // if S is empty, choose a random square that is untouched
      if (S.size === 0) {
        const randomPoint = this.selectRandomSquare();
        S.set(randomPoint.id, randomPoint.cell);
        SArray.push(randomPoint.cell);
      }

      while (S.size !== 0) {
        if (printSteps) {
          console.log(this.board.printBoard());
        }

        const removed = SArray.pop();
        S.delete(removed.id);

        if (printSteps) {
          // step-by-step: where AI chooses to click the cell
          console.log(`Consider: (${removed.rowNum}, ${removed.colNum})`);
        }
  
        // uncover the removed cell
        this.probe(removed);
          
        // if the removed contains a mine, game over
        if (this.board.isMine(removed.rowNum, removed.colNum)) {
          console.log(`GAME OVER: died at iteration: ${iteration}`);
          return false;
        }

        // if the cell has all-free neighbors
        if (this.hasAllFreeNeigbor(removed.rowNum, removed.colNum)) {
          // add all unmarked neighbors to S
          const unmarked = this.getUnMarkedNeighbors(removed.rowNum, removed.colNum);
          for (let cell of unmarked) {
            S.set(cell.id, cell);
            SArray.push(cell);
          }
        }
        // if we do not have enough info, add the cell to Q
        else {
            Q.set(removed.id, removed);
        }
      }
      
      // list of ids to be removed from Q
      let rm = [];
      for (const [key, value] of Q) {
        if (this.hasAllMineNeighbor(value.rowNum, value.colNum)) {
          const unmarked = this.getUnMarkedNeighbors(value.rowNum, value.colNum);
          for (let cell of unmarked) {
            this.board.markCell(cell.rowNum, cell.colNum);
          }
          rm.push(key);
        }
      }

      for (const id of rm) {
        Q.delete(id);
      }

      rm = [];
      for (const [key, value] of Q) {
        if (this.hasAllFreeNeigbor(value.rowNum, value.colNum)) {
          const unmarked = this.getUnMarkedNeighbors(value.rowNum, value.colNum);
          for (let cell of unmarked) {
            S.set(cell.id, cell);
            SArray.push(cell);
          }
          rm.push(key);
        }
      }

      for (const id of rm) {
        Q.delete(id);
      }
  }
    return true;
  }

  /**
   * Probe means: reveal the cell (mine/numMines) + remove from untouched array
   */
  probe(cell) {
    const { id, rowNum, colNum } = cell;
    // set reveal to true
    this.board.setRevealed(rowNum, colNum);

    // reveal number of mines around it
    const count = this.board.countMines(rowNum, colNum);
    this.board.setNeightborMines(rowNum, colNum, count);

    let idx = 0;

    for (const c of this.untouched) {
      if (id === c.id) {
        break;
      }
      idx++;
    }
    // if the cell is already revealed
    if (idx === this.untouched.length) {
      return;
    }
    const size = this.untouched.length;
    this.swap(this.untouched, idx, size - 1);
    this.untouched.pop();
  }

  boardToArray(board) {
    let result = [];
    const size = board.size;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result.push(board.content[i][j]);
      }
    }
    return result;
  }

  getRandom(size) {
    // range from 0 to size - 1
    return Math.floor(Math.random() * size);
  }

  /**
   * At the start of the game, select a random corner
   * this is least likely to step on a mine
   */
  firstMove() {
    const size = this.board.size;
    const corners = [[0, 0],[0, size - 1], [size - 1, 0], [size - 1, size - 1]];
    const selection = corners[this.getRandom(4)];
    const row = selection[0];
    const col = selection[1];
    return this.board.content[row][col];
  }

  /**
   * Select a random cell that is not marked or uncovered and remove it
   * Return its unique id
   */
  selectRandomSquare() {
    const size = this.untouched.length;
    const idx = this.getRandom(size);
    this.swap(this.untouched, idx, size - 1);
    const cell = this.untouched.pop();
    return {
      id: cell.id,
      cell
    };
  }

  swap(array, i, j) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  getMarkedNeighbors(i, j) {
    const directions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
    let markedNeighbors = []
    for (const dir of directions) {
        let rowPos = i + dir[0];
        let colPos = j + dir[1];
        if (this.board.checkBound(rowPos, colPos)) {
            if (this.board.isMarked(rowPos, colPos)) {
                markedNeighbors.push(this.board.content[rowPos][colPos]);
            }
        }
    }
    return markedNeighbors;
  } 

  /**
   * How to define unmarked?
   * - not marked (flagged) as mines
   * - not revealed (empty space) => definitely not labelled with numbers
   * - not labelled with numbers
   */
  getUnMarkedNeighbors(i, j) {
    const directions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
    let unmarkedNeighbors = []
    for (const dir of directions) {
      let rowPos = i + dir[0];
      let colPos = j + dir[1];
      if (this.board.checkBound(rowPos, colPos)) {
          if (!this.board.isMarked(rowPos, colPos) &&
              !this.board.isRevealed(rowPos, colPos)) {
                unmarkedNeighbors.push(this.board.content[rowPos][colPos]);
          }
      }
    }
    return unmarkedNeighbors;
  }



  computeEffectiveLabels(i, j) {
    return this.board.getNumNeightborMines(i, j) - this.getMarkedNeighbors(i, j).length;
  }

  /**
   * AFN Definition: when effective label of point is 0
   */
  hasAllFreeNeigbor(i, j) {
    return this.computeEffectiveLabels(i, j) === 0;
  }

  /**
   * AMN Definition: 
   */
  hasAllMineNeighbor(i, j) {
    return this.computeEffectiveLabels(i, j) === this.getUnMarkedNeighbors(i, j).length;
  }
}

module.exports.GameAI =  GameAI;