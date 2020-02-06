const game = require('./GameAI');

// TODO: Takes a board and attempts to solve the board. 
// Return a boolean indicating if the board was successfully solved.
function solve(board) {
    const solution = new game.GameAI(board);
    return solution.singlePointAlgorithm();
} 

// Leave as CommonJs for runSolver
module.exports = solve;
