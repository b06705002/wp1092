import React, { Component } from "react";
import Ul from "./Ul";
import Footer from "./Footer";

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            addList: [],
            idCount: 0,
            show: 0
        };
    }

    inputChange = (e) => this.setState(state => ({inputValue: e.target.value}));

    inputKeyUp = (e) => {
        if(e.keyCode===13) {
            if (this.state.idCount === 0) {
                this.setState(state => ({addList: [{id: 0, list: this.state.inputValue, stat: 1}]}));
            }
            else {
                var joined = [...this.state.addList, {id: this.state.idCount, list: this.state.inputValue, stat: 1}];
                this.setState(state => ({addList: joined}));
            }
            this.setState({inputValue: ''}, () => {
                // console.log("Hi");
            });
            this.setState({idCount: this.state.idCount+1}, () => {
                // console.log(this.state.idCount);
            });
        }
    };

    showStat(sta){
        this.setState(state => ({show: sta}));
    }

    tfChange(ID){
        var x = this.state.addList;
        for (var i = 0; i<x.length; i++){
            if (x[i].id === ID){
                if (x[i].stat === 1){
                    x[i].stat = 0;
                }
                else{
                    x[i].stat = 1;
                }
            }
        }
        this.setState(state => ({addList: x}));
    }
    
    tfDelete(ID){
        var arr = [];
        var x = this.state.addList;
        for (var i = 0; i<x.length; i++){
            if (x[i].id !== ID){
                arr.push(x[i]);
            }
        }
        this.setState(state => ({addList: arr}));
    }

    tfShow(){
        var arr = [];
        var x = this.state.addList;
        for (var i = 0; i<x.length; i++){
            if (x[i].stat === 1){
                arr.push(x[i]);
            }
        }
        this.setState(state => ({addList: arr}));
    }

    render() {
        return (
            <>
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" 
                        onChange={this.inputChange}  value={this.state.inputValue}
                            onKeyUp={this.inputKeyUp}/>
                    <Ul data={this.state.addList} status={this.state.show} TFChange={(e) => {this.tfChange(e)}} TFDelete={(e) => {this.tfDelete(e)}}/>
                </section>
                <Footer data={this.state.addList} TFShow={() => {this.tfShow()}} changeS={(e) => {this.showStat(e)}}/>
            </>
        );
    }
}

export default Section;
