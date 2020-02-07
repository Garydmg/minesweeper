import React, { Component } from 'react';
import Player from './Player';
import GameBoard from './component/GameBoard';
import './index.css';

class Minesweeper extends Component {
    constructor(props) {
        super(props)
        let size = 10;
        let numMines = 20;
        this.state = {
            size,
            numMines,
            player: new Player(size, numMines),
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

    render() {
        return (
            <div className="game-wrapper">
                <div className="title">
                    <h1>Minesweeper</h1>
                </div>
                <GameBoard 
                    player={this.state.player} 
                    icons={this.state.icons}
                />
            </div>
        );
    }
}
  
export default Minesweeper;
  