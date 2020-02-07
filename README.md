# Minesweeper
## Part A: React.js Implementation
### The game can be played here: 
https://garydmg.github.io/minesweeper-deployed/

<img src="https://github.com/Garydmg/minesweeper/blob/source/media/computer-view.png" width="450" height="650"/>

## 1. Setup
#### In the project directory, run `yarn install` then you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />

## 2. Code Design
<img src="https://github.com/Garydmg/minesweeper/blob/source/media/design.png" width="350" height="380"/>

### Click to see code directly:
#### React.js Components
* [Game Entry Point](https://github.com/Garydmg/minesweeper/blob/source/src/Minesweeper.js)
* [GameBoard Component](https://github.com/Garydmg/minesweeper/blob/source/src/component/GameBoard.js)
* [Cell Component](https://github.com/Garydmg/minesweeper/blob/source/src/component/Cell.js)

#### Board API
* [Board API](https://github.com/Garydmg/minesweeper/blob/source/src/Board.js)

#### Human Player
* [Player](https://github.com/Garydmg/minesweeper/blob/source/src/Player.js)

#### Computer Player
* [Solver](https://github.com/Garydmg/minesweeper/blob/source/src/Solver.js)
* [GameAI](https://github.com/Garydmg/minesweeper/blob/source/src/GameAI.js)


## Part B: Puzzle Solver
## 1. How to Run
Launches the run solver script with the given optional arguments. <br />
#### `yarn solve [ n [ numMines [ numTrials ] ] ]`
#### `yarn solve` 
automatically solves the 10 * 10 puzzle with 10 mines 100,000 times (each time is a randomly generated puzzle)

### If you want to see step-by-step solution generated by GameAI:
Go to [Solver](https://github.com/Garydmg/minesweeper/blob/source/src/Solver.js) and set the flag below to true.
```javascript
  const printSteps = false; // set this to true
```

## 2. Algorithm
This solver implements a Double-Set-Single-Point (DSSP) strategy. For more information, check [here](https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf?sequence=1) in Chapter 5.3. 

Solving 10 by 10 puzzle with 10 mines 100,000 times (each time is a different puzzle), the chance of winning is around 72%, which is similar to what's been obtained in the paper. The run time is within 35 seconds. 

The pseudo-code is illustrated below:
```javascript
  firstStep = firstMove()
  S = new Set()   // "safe" cells to explore
  Q = new Set()   // cells that need more information about neighbors
  S.add(firstStep)
  
  while game is not over:
    if S is empty:
      x = selectRandomSquare()
      S.add(x)  
    
    while S is not empty:
      x = S.remove()
      probe(x)    // probe means uncover
      if x is mine:
        return failure
      if AFN(x):   // all-free-neighbor: # neighbor mines - marked cells == 0
        S.add(unmarkedNeighbors(x))
      else:
        Q.add(x)
    
    for q in Q:
      if AMN(q):   // all-mines-neighbor: # neighbor mines - marked cells == # of unmarked cells
        for y in unmarkedNeighbors(q):
          mark(y)   // mark cell y as mine
        Q.remove(q)
     
     for q in Q:
      if AFN(q):
        S.add(unmarkedNeighbors(q))
        Q.remove(q)  
```

