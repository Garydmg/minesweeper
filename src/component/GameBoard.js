import React, { Component } from 'react';
import Cell from './Cell';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.props.board,
            icons: this.props.icons
        }
    }

    renderRows = (data, icons) => {
        return data.map((item) => {
            return (
                <div className="cell" key={item.rowNum * item.length + item.colNum}>
                    <Cell cellContent={item} cellIcons={icons}/>
                </div>
            )
        });
    }

    renderCells = (data, icons) => {
        return data.map((boardRow, idx) => {
            return (
                <div key={idx} className="board-row">
                    {this.renderRows(boardRow, icons)}
                </div>
            )
        })
    }
    
    render() {
        const { board, icons } = this.state;
        return (
            <div>
                <div className="board-info">
                    {
                        this.renderCells(board.content, icons)
                    }
                    {/* <p>--------------</p>
                    {
                        this.renderCells(this.state.board.content)
                    } */}
                </div>
            </div>
        );
    }
}