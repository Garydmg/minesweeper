import React, { Component } from 'react';

export default class Cell extends Component {

    render() {
        const { rowNum, colNum } = this.props.cellContent;
        // const icons = this.props.cellIcons;
        return (
            <div>
                {rowNum} : {colNum}
            </div>
        )
    }
}