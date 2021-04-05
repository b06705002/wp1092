import React, { Component } from "react";
import H1 from "../components/H1";
import Img from "../components/Img";

class Li extends Component {
    handerClick(){
        this.props.changeStatus(this.props.id)
    }
    render() {
        if (this.props.sta === 1){
            return (
                <li className="todo-app__item">
                    <div className="todo-app__checkbox" onClick={()=>{this.handerClick()}}>
                        <label></label>
                    </div>
                    <H1 txt={this.props.text} sty={this.props.sta} />
                    <Img />
                </li>
            );
        }
        else {
            return (
                <li className="todo-app__item">
                    <div className="todo-app__checkbox" onClick={()=>{this.handerClick()}}>
                        <label className="gogogo"></label>
                    </div>
                    <H1 txt={this.props.text} sty={this.props.sta} />
                    <Img />
                </li>
            );
        }
    }
}

export default Li;