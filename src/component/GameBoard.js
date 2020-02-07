import React, { Component } from 'react';
import Cell from './Cell';
import Player from '../Player';

export default class GameBoard extends Component {
    constructor(props) {
        super(props);
        const { player, icons } = this.props;
        this.state = {
            player,
            icons
        };
    }

    /**
     * Reveal number of mines around where we click
     */
    revealNeighbors = (rowNum, colNum) => {
        const { player } = this.state;
        const board = player.board;
        if (player.isWinning()) {
            return;
        }
        if (board.isRevealed(rowNum, colNum)) return;
        if (board.isMine(rowNum, colNum)) {
            board.revealAll();
        }
        
        this.setState({
            player: this.state.player.probe(rowNum, colNum)
        }, () => {
            // console.log(player.gameOver);
        });  
    }

    /**
     * Change parameters: board size and number of mines
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            player: new Player(this.boardSize.value, this.numMines.value)
        }, () => {
            // console.log(this.state.player);
        });
    }

    /**
     * Render 2D board row by row
     */
    renderRows = (data, icons) => {
        const { player } = this.state;
        return data.map((item) => {
            const {rowNum, colNum} = item;
            return (
                <div className="cell" key={rowNum * data.length + colNum}>
                    <Cell 
                        cellContent={item} 
                        icons={icons}
                        onClick={() => this.revealNeighbors(rowNum, colNum)}
                        gameOver={player.gameOver}
                    />
                </div>
            )
        });
    }

    renderBoard = (data, icons) => {
        return data.map((boardRow, index) => {
            return (
                <div key={index} className="board-row">
                    {
                        this.renderRows(boardRow, icons)
                    }
                </div>
            )
        })
    }
    
    render() {
        const { player, icons } = this.state;
        // happy face emoji
        let messageWin = player.isWinning() ? 
            <h2>Congrats! You win the game! {String.fromCodePoint(128512)}</h2> : <h2>{}</h2>
        // s*** face emoji
        let messageLose = player.gameOver ? 
            <h2>Game over! You just stepped on a bomb {String.fromCodePoint(128169)}</h2> : <h2>{}</h2>
        
        return (
            <div className="game-area">
                <div className="menu">
                    <h2>Step 1: Select your Settings</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Board Size
                            <input type="text" 
                                placeholder={"e.g. 10"}
                                ref={e => this.boardSize = e} 
                                name="size" 
                                className="input-box"
                            />
                        </label>
                        <label>
                            # of Mines
                            <input type="text" 
                                placeholder={"e.g. 20"}
                                ref={e => this.numMines = e} 
                                name="numMines" 
                                className="input-box"
                            />
                        </label>
                        <input className="button" type="submit" value="Start Game" />
                    </form>
                </div>
                <div>
                    <h2>Step 2: Start the Challenge</h2>
                    <p>Board size: {player.board.size}</p>
                    <p>
                        There are {player.board.numMines} mines contained in {player.numCellsUnrevealed()} unrevealed cells
                    </p>
                </div>
                <div className="message">
                    {messageWin}
                    {messageLose}
                </div>
                <div className="board-info">
                    {
                        this.renderBoard(player.board.content, icons)
                    }
                </div>
            </div>
        );
    }
}