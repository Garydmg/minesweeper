const uuidv4 = require('uuid/v4');

/**
 * Board API
 */
class Board {
    constructor(n, numMines) {
        this.size = n;
        this.numMines = numMines;
        this.content = this.initializeBoard(n, numMines);
    }
    
    /**
     * Board initialization
     */
    initializeBoard(size, numMines) {
        let board = [];
        // build rows
        for (let i = 0; i < size; i++) {
            board.push([]);
            // build columns
            for (let j = 0; j < size; j++) {
                board[i][j] = {
                    id: uuidv4(),
                    rowNum: i,
                    colNum: j,
                    isMine: false,
                    isNumbered: false,
                    isRevealed: false,
                    isMarked: false,
                    numNeighborMines: 0
                }
            }
        }
        return this.addMines(board, size, numMines);
    }

    addMines(board, size, targetNumMines) {
        let numMines = 0;
        // truncate num of mines if it cannot fit into the board
        targetNumMines = Math.min(targetNumMines, size * size);

        while (numMines < targetNumMines) {
            // generate random rows and columns
            let rowPos = this.getRandom(size);
            let colPos = this.getRandom(size);
            if (!board[rowPos][colPos].isMine) {
                board[rowPos][colPos].isMine = true;
                numMines++;
            }
        }
        return board;
    }


    /**
     * Getters and setters
     */
    isRevealed(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        return this.content[i][j].isRevealed;
    }

    isNumbered(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        return this.content[i][j].isNumbered;
    }

    isMine(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        return this.content[i][j].isMine;
    }
    
    isEmpty(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        return this.content[i][j].isEmpty;
    }

    isMarked(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        return this.content[i][j].isMarked; 
    }
    
    markCell(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        this.content[i][j].isMarked = true;
    }

    setNeightborMines(i, j, num) {
        if (!this.checkBound(i, j)) {
            return false;
        }
        this.content[i][j].numNeighborMines = num;
        this.content[i][j].isNumbered = true;
    }

    setRevealed(i, j) {
        if (!this.checkBound(i, j)) {
            return false;
        }
        this.content[i][j].isRevealed = true;
    }

    getRandom(size) {
        // range from 0 to size - 1
        return Math.floor(Math.random() * size);
    }

    getNumNeightborMines(i, j) {
        if (!this.checkBound(i, j)) {
            return -1;
        }
        return this.content[i][j].numNeighborMines;
    }

    /**
     * Utility functions
     */
    checkBound(i, j) {
        if (i >= 0 && i < this.size && j >= 0 && j < this.size) {
            return true;
        }
        return false;
    }

    /**
     * Count number of mines in all directions around (i, j)
     */
    countMines(i, j) {
        const directions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        let count = 0;
        for (const dir of directions) {
            let rowPos = i + dir[0];
            let colPos = j + dir[1];
            if (this.checkBound(rowPos, colPos)) {
                if (this.isMine(rowPos, colPos)) {
                    count++;
                }
            }
        }
        return count;
    }

    
    /**
     * Reveal the entire board - if we lose the game
     */
    revealAll() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.setRevealed(i, j);
                const count = this.countMines(i, j);
                this.setNeightborMines(i, j, count);
            }
        }
    }

    /**
     * Print board on terminal
     */
    printBoard() {
        console.log("<========== Board: Actual ==========>")
        for (let i = 0; i < this.size; i++) {
          let row = '';
          for (let j = 0; j < this.size; j++) {
            let cell;
            if (this.isMine(i, j)) {
              cell = 'X';
            }
            else {
              cell = '.';
            }
            row += cell;
          }
          console.log(row)
        }

        console.log("<========== Board: What user sees ==========>");
        for (let i = 0; i < this.size; i++) {
          let row = '';
          for (let j = 0; j < this.size; j++) {
            let cell;
            if (this.isMarked(i, j)) {
              cell = 'M';
            }
            else if (this.isNumbered(i, j)) {
              const num = this.getNumNeightborMines(i, j);
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

};  

// Leave as CommonJS for runSolver
module.exports =  Board;
