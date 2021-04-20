import Row from './Row'
import React, { Component } from "react";

class Board2048 extends Component {
    render(){
        let boardClassName = "board";
        let infoClassName = "info";
        let outSentence = "No funding this year QAO";
        let phdSentence = "You should study a PhD!";
        // console.log(this.props.board)
        return (
            <>
            <table className={boardClassName} id="board-full">
                <tbody>
                    {this.props.board.map((row_vector, row_idx) => (<Row key={row_idx} content={row_vector} rowID={row_idx}/>))}
                </tbody>
            </table>
            <div className={infoClassName} id="game-over-info">
                <span id="game-over-text">{outSentence}</span>
                <div className="button" id="game-over-button">Try again</div>
            </div>
            </>
        );
    }
};

export default Board2048;