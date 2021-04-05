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
        if (this.props.status === 0){
            let lists = this.props.data.map((list) => <Li key={list.id} id={list.id} text={list.list} sta={list.stat} changeStatus={(e) => {this.chStatus(e)}} deleteStatus={(e) => {this.dlStatus(e)}}/>)
            return (
                <ul className="todo-app_list" id="todo-list">
                    {lists}
                </ul>
            );
        }
        else if (this.props.status === 1){
            var x = [];
            for (var i = 0; i<this.props.data.length; i++){
                if (this.props.data[i].stat === 1){
                    x.push(this.props.data[i]);
                }
            }
            let lists = x.map((list) => <Li key={list.id} id={list.id} text={list.list} sta={list.stat} changeStatus={(e) => {this.chStatus(e)}} deleteStatus={(e) => {this.dlStatus(e)}}/>)
            return (
                <ul className="todo-app_list" id="todo-list">
                    {lists}
                </ul>
            );
        }
        else {
            var x = [];
            for (var i = 0; i<this.props.data.length; i++){
                if (this.props.data[i].stat === 0){
                    x.push(this.props.data[i]);
                }
            }
            let lists = x.map((list) => <Li key={list.id} id={list.id} text={list.list} sta={list.stat} changeStatus={(e) => {this.chStatus(e)}} deleteStatus={(e) => {this.dlStatus(e)}}/>)
            return (
                <ul className="todo-app_list" id="todo-list">
                    {lists}
                </ul>
            );
        }
    }
}

export default Ul;