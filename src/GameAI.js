/**
 * GameAI implements algorithms for solving the puzzle
 */

class GameAI {
  constructor(gameBoard) {
    this.board = gameBoard;
    this.untouched = this.boardToArray(this.board);
  }

  singlePointAlgorithm() {
    this.untouched = this.boardToArray(this.board);

    // key: unique id, value: cell
    const S = new Map(); // safe cells to explore
    let SArray = []; // stores same content as S, assist S for deletion
    let Q = new Map(); // cells that need more information regarding neighbors

    console.log("Algorithm starts here");
    const opener = this.firstMove();
    S.set(opener.id, opener);
    SArray.push(opener);
    
    // while game is not over
    while (this.untouched.length > this.board.numMines) {
      // console.log('==========START==========')
      this.printBoard();
      
      // if S is empty, choose a random square that is untouched
      if (S.size === 0) {
        const randomPoint = this.selectRandomSquare();
        S.set(randomPoint.id, randomPoint.cell);
        SArray.push(randomPoint.cell);
      }
      // console.log('==========START==========')
    
      // when the safe-to-explore set is not empty
      while (S.size !== 0) {
        this.printBoard();
        // console.log('---------PRINT MAP-----------')
        // console.log(S);
        // cell that needs to be removed from set
        const removed = SArray.pop();
        
        console.log('------------New move-------------')
        console.log("Considering: " + removed.rowNum + ", " + removed.colNum);
        // console.log(this.board.content[removed.rowNum][removed.colNum])
        // remove by id
        S.delete(removed.id);
  
        // uncover the removed cell
        this.probe(removed);
          
        // if the removed contains a mine, game over
        if (this.board.isMine(removed.rowNum, removed.colNum)) {
          console.log("GAME OVER");
          return false;
        }

        // if the cell has all-free neighbors
        if (this.hasAllFreeNeigbor(removed.rowNum, removed.colNum)) {
          // add all unmarked neighbors to S
          const unmarked = this.getUnMarkedNeighbors(removed.rowNum, removed.colNum);
          // console.log('------------UNMARKED move-------------')
          // console.log(unmarked);
          for (let cell of unmarked) {
            S.set(cell.id, cell);
            SArray.push(cell);
            // console.log("Add unmarked: " + cell.rowNum + ", " + cell.colNum);
          }
        }
        // if we do not have enough info, add the cell to Q
        else {
            Q.set(removed.id, removed);
        }
      }

      // loop over each cell in Q
      // console.log("Loop over Q");
      const iterator1 = Q.keys();
      
      let rm = [];
      while (iterator1.next().value) {
        const id = iterator1.next().value;
        if (id === undefined) {
          break;
        }
        const q = Q.get(id);
        // console.log(q);
        if (this.hasAllMineNeighbor(q.rowNum, q.colNum)) {
          const unmarked = this.getUnMarkedNeighbors(q.rowNum, q.colNum);
          for (let cell of unmarked) {
            this.board.markCell(cell.rowNum, cell.colNum);
          }
          rm.push(id);
        }
      }

      for (const id of rm) {
        Q.delete(id);
      }

      rm = [];
      while (iterator1.next().value) {
        const id = iterator1.next().value;
        if (id === undefined) {
          break;
        }
        const q = Q.get(id);
        if (this.hasAllFreeNeigbor(q.rowNum, q.colNum)) {
          const unmarked = this.getUnMarkedNeighbors(q.rowNum, q.colNum);
          for (let cell of unmarked) {
            S.set(cell.id, cell);
            SArray.push(cell);
            // console.log("Add unmarked: " + cell.rowNum + ", " + cell.colNum);
          }
          rm.push(id);
        }
      }

      for (const id of rm) {
        Q.delete(id);
      }
    }

    return true;
  }

  printBoard() {
    const size = this.board.size;
    const board = this.board.content;
    console.log("-----Actual-------")
    for (let i = 0; i < size; i++) {
      let row = '';
      for (let j = 0; j < size; j++) {
        let cell;
        if (this.board.isMine(i, j)) {
          cell = 'X';
        }
        else {
          cell = '.';
        }
        row += cell;
      }
      console.log(row)
    }
    console.log("----Game-------");
    for (let i = 0; i < size; i++) {
      let row = '';
      for (let j = 0; j < size; j++) {
        let cell;
        if (this.board.isMarked(i, j)) {
          cell = 'M';
        }
        else if (this.board.isNumbered(i, j)) {
          const num = this.board.getNumNeightborMines(i, j);
          cell = num === 0 ? '*' : num;
        }
        else {
          cell = '.';
        }
        row += cell;
      }
      console.log(row)
    }

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

    // time bottleneck:
    let idx = 0;
    // console.log('--------------------------------------')
    // console.log("Probe");
    // console.log(this.untouched);
    // console.log(this.untouched.length);

    for (const c of this.untouched) {
      // console.log("Index: " + idx);
      // console.log(this.untouched.length);
      // console.log(c);
      if (id === c.id) {
        break;
      }
      idx++;
    }
    // this cell is already revealed
    // S 
    if (idx === this.untouched.length) {
      return;
    }
    const size = this.untouched.length;
    this.swap(this.untouched, idx, size - 1);
    this.untouched.pop();
    // console.log('----------------after probe---------------')
    // console.log(this.printBoard());
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
   * - not revealed (empty space)
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
              !this.board.isRevealed(rowPos, colPos) &&
              !this.board.isNumbered(rowPos, colPos)) {
                // TODO: write a getter 
                // console.log("(" + rowPos + ", " + colPos + " is unmarked");
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