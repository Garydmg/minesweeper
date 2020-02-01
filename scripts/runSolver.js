'use strict';

// DO NOT EDIT ---------------------------------------------------------
const solve = require('../src/Solver');
const Board = require('../src/Board');

let n = 10;
let numMines = 10;
let numTrials = 100000;

try{
    switch(process.argv.length) {
        case 5:
            numTrials = parseInt(process.argv[4], 10);
            if (isNaN(numTrials)) throw 1;
        case 4:
            numMines = parseInt(process.argv[3], 10);
            if (isNaN(numMines)) throw 1;
        case 3:
            n = parseInt(process.argv[2], 10);
            if (isNaN(n)) throw 1;
        case 2:
            break;
        default:
            throw 1;
    }
} catch (err) {
    console.error('Invalid arguments passed to script');
    console.error('Usage: yarn solve [ n [ numMines [ numTrials ] ] ]')
    process.exit();
}

let wins = 0;
const start = Date.now();
for (let i = 0; i < numTrials; i++) {
    const board = new Board(n, numMines);
    if (solve(board)) {
        wins++;
    }
    const currentPercentage = Math.floor((i + 1) * 100 / numTrials);
    process.stdout.write(`\r${currentPercentage}% complete (${i+1}/${numTrials})`);
}

const end = Date.now();
const delta = (end - start) / 1000;

console.log(`\nTime taken: ${delta.toFixed(2)}s`);

const winPercentage = Math.floor(wins * 100 /numTrials);
console.log(`Win percentage: ${winPercentage}% (${wins}/${numTrials}) `);

// DO NOT EDIT ---------------------------------------------------------
