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

    setNeightborMines(i, j, num) {
        this.content[i][j].numNeighborMines = num;
    }

    setRevealed(i, j) {
        this.content[i][j].isRevealed = true;
    }

    getRandom(size) {
        // range from 0 to size - 1
        return Math.floor(Math.random() * size);
    }
    
    /**
     * Click to reveal part of the board that represents # of mines nearby
     * @param i, j: row and col number
     */
    getNeighborMines(i, j) {
        // game over
        if (this.isMine(i, j)) {
            return -1;
        }
        this.dfs(i, j);
        return this;
    }

    /**
     * Use depth-first search to recursively find # of nearby mines
     */
    dfs(i, j) {
        let count = this.countMines(i, j);

        // if there is a count, no need to recurse further
        if (count !== 0) {
            this.setNeightborMines(i, j, count);
            return;
        }
        // if there is no count, mark current location as visited/revealed
        this.setRevealed(i, j);

        // check all 8 directions
        for (const dir of this.directions) {
            let rowPos = i + dir[0];
            let colPos = j + dir[1];
            if (this.checkBound(rowPos, colPos)) {
                // if it is not visited and not a mine, visit it
                if (!this.isRevealed(rowPos, colPos) && !this.isMine(rowPos, colPos)) {
                    this.dfs(rowPos, colPos);
                }
            }
        }
    }
    
    /**
     * Count number of mines in all directions around (i, j)
     */
    countMines(i, j) {
        let count = 0;
        for (const dir of this.directions) {
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

};  

// Leave as CommonJS for runSolver
module.exports =  Board;
