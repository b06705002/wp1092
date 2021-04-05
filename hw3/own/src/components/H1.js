import React, { Component } from "react";

class H1 extends Component {
    render() {
        // const { progress = 0 } = this.props.sty;
        if (this.props.sty === 1){
            return (
                <h1 className="todo-app__item-detail">{this.props.txt}</h1>
            );
        }
        else{
            const style = {
                textDecoration: 'line-through',
                opacity: '0.5'
            };
            return (
                <h1 className="todo-app__item-detail" style={style}>{this.props.txt}</h1>
            );
        }
    }
}

export default H1;