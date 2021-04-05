import React, { Component } from "react";
import Li from "./Li";

class Ul extends Component {
    chStatus(e){
        this.props.TFChange(e);
    }
    dlStatus(e){
        this.props.TFDelete(e);
    }
    render() {
        // console.log(this.props.data);
        let lists = this.props.data.map((list) => <Li key={list.id} id={list.id} text={list.list} sta={list.stat} changeStatus={(e) => {this.chStatus(e)}} deleteStatus={(e) => {this.dlStatus(e)}}/>)
        return (
            <ul className="todo-app_list" id="todo-list">
                {lists}
            </ul>
        );
    }
}

export default Ul;