const game = require('./GameAI');

// TODO: Takes a board and attempts to solve the board. 
// Return a boolean indicating if the board was successfully solved.
function solve(board) {
    const solution = new game.GameAI(board);
    const printSteps = true;
    return solution.singlePointAlgorithm(printSteps);
} 

// Leave as CommonJs for runSolver
module.exports = solve;
