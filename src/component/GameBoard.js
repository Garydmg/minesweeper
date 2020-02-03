import React, { Component } from 'react';
import Cell from './Cell';

export default class Board extends Component {
    renderRows = (data, icons) => {
        return data.map((item) => {
            const {rowNum, colNum} = item;
            return (
                <div className="cell" key={rowNum * data.length + colNum}>
                    <Cell cellContent={item} cellIcons={icons}/>
                </div>
            )
        });
    }

    renderCells = (data, icons) => {
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
        const { board, icons } = this.props;
        return (
            <div>
                <div className="board-info">
                    {
                        this.renderCells(board.content, icons)
                    }
                </div>
            </div>
        );
    }
}