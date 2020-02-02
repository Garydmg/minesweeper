import React, { Component } from 'react';
import Board from './Board';
import GameBoard from './component/GameBoard';
import './style.css';

class Minesweeper extends Component {
    constructor(props) {
        super(props)
        let n = 10;
        let numMines = 80;
        this.state = {
            n,
            numMines,
            board: new Board(n, numMines),
            icons: {
                blank: 'http://i.imgur.com/HM1e3Tbb.jpg',
                pressed: 'http://i.imgur.com/bGT8xGEb.jpg',
                exposedBomb: 'http://i.imgur.com/pTJ8Swhb.jpg',
                explodedBomb: 'http://i.imgur.com/UFmXprFb.jpg',
                flag: 'http://i.imgur.com/nLPvW15b.jpg',
                // Index is # of adjacent bombs
                bombs: [
                    'http://i.imgur.com/Flqdqi1b.jpg', // 0
                    'http://i.imgur.com/bM8oExob.jpg', // 1
                    'http://i.imgur.com/bQKSbqYb.jpg', // 2
                    'http://i.imgur.com/5jNcEeVb.jpg', // 3
                    'http://i.imgur.com/BnxjHgHb.jpg', // 4
                    'http://i.imgur.com/RaFrMYcb.jpg', // 5
                    'http://i.imgur.com/GlwQOy0b.jpg', // 6
                    'http://i.imgur.com/8ngsVa8b.jpg', // 7
                    'http://i.imgur.com/lJ8P1wab.jpg'  // 8
                ] 
            }
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="game-wrapper">
                <div className="title">
                    <h1>Minesweeper</h1>
                </div>
                <div className="param">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Size:
                            <input type="text" value={this.state.n} onChange={this.handleChange} name="size" />
                        </label>
                        <label>
                            Number of Mines:
                            <input type="text" value={this.state.numMines} onChange={this.handleChange} name="numMines" />
                        </label>
                        <input type="submit" value="Start Game" />
                    </form>
                </div>
                <div className="board">
                    <GameBoard board={this.state.board} icons={this.state.icons}/>
                </div>
            </div>
        );
    }
}
  
export default Minesweeper;
  