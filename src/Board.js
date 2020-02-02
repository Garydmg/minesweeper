class Board {
    constructor(n, numMines) {
        this.size = n;
        this.numMines = numMines;
        this.content = this.initializeBoard(n, numMines);
        this.directions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
    }

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

    getRandom(size) {
        // range from 0 to size - 1
        return Math.floor(Math.random() * size);
    }
    
    /**
     * Get number of neighbors that are mines
     * @param board
     * @returns: 0-8, -1 if the cell itself is a mine
     */
    getNeighborMines(i, j) {
        if (this.content[i][j].isMine) {
            return -1;
        }
        let numMines = 0;
        for (const dir of this.directions) {
            let deltaRow = dir[0];
            let deltaCol = dir[1];
            if (this.content[i + deltaRow][j + deltaCol].isMine) {
                numMines++;
            }
        }
        this.content[i][j] = numMines;
        return numMines;
    }
    

};  

// Leave as CommonJS for runSolver
module.exports =  Board;
