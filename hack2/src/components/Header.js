import react, { Component } from "react";

class Header extends Component{
    render(){
        return (
            <>
            <h1 id="title">Merging School</h1>
            <div className="btn-groups">
                <div className="qs-ranking" id="general-qs-ranking">QS: <p id="general-qs-ranking-value">{this.props.qs_ranking}</p></div>
                <div className="qs-ranking" id="general-step">Step: <p id="general-step-value">{this.props.step}</p></div>
                <div className="qs-ranking" id="best-qs-ranking">Best: <p id="best-qs-ranking-value">{this.props.bestqs}</p></div>
                <div className="button" id="reset-button" onClick={() => this.props.newGame()}>New Game</div>
            </div>
            </>
        );
    }
}

export default Header;