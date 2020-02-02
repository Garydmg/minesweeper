// TODO: Takes a board and attempts to solve the board. 
// Return a boolean indicating if the board was successfully solved.
function solve(boardObj) {
    const size = boardObj.size;
    let board = boardObj.content;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            console.log(board[i][j]);
        }
    }
    return true;
} 

// Leave as CommonJs for runSolver
module.exports = solve;
