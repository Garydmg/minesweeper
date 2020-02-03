/**
 * Board API
 */
class Board {
    constructor(n, numMines) {
        this.size = n;
        this.numMines = numMines;
        this.content = this.initializeBoard(n, numMines);
        this.directions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
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
                    rowNum: i,
                    colNum: j,
                    isMine: false,
                    isEmpty: false,
                    isRevealed: false,
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
    checkBound(i, j) {
        if (i >= 0 && i < this.size && j >= 0 && j < this.size) {
            return true;
        }
        return false;
    }

    isRevealed(i, j) {
        return this.content[i][j].isRevealed;
    }

    isMine(i, j) {
        return this.content[i][j].isMine;
    }
    
    isEmpty(i, j) {
        return this.content[i][j].isEmpty;
    }

    setNeightbors(i, j, num) {
        this.content[i][j].numNeighborMines = num;
    }


    getRandom(size) {
        // range from 0 to size - 1
        return Math.floor(Math.random() * size);
    }
    
    /**
     * Get number of neighbors that are mines
     * @param i, j: row and col number
     * @returns: 0-8, -1 if the cell itself is a mine
     */
    getNeighborMines(i, j) {
        if (this.isMine(i, j)) {
            return -1;
        }
        let numMines = 0;
        for (const dir of this.directions) {
            let rowPos = i + dir[0];
            let colPos = j + dir[1];
            if (this.checkBound(rowPos, colPos)) {
                if (this.isMine(rowPos, colPos)) {
                    numMines++;
                }
            }
        }
        this.setNeightbors(i, j, numMines);
        return this;
    }

};  

// Leave as CommonJS for runSolver
module.exports =  Board;
