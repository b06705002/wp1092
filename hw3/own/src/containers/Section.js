import React, { Component } from "react";
import Ul from "./Ul";
import Footer from "./Footer";

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            addList: [],
        };
    }

    inputChange = (e) => this.setState(state => ({inputValue: e.target.value}));

    inputKeyUp = (e) => {
        if(e.keyCode===13) {
            if (this.state.addList.length === 0) {
                this.setState(state => ({addList: [{id: 0, list: this.state.inputValue, stat: 1}]}));
            }
            else {
                var joined = [...this.state.addList, {id: this.state.addList.length, list: this.state.inputValue, stat: 1}];
                this.setState(state => ({addList: joined}));
            }
            this.setState({inputValue: ''}, () => {
                // console.log("Hi");
            });
        }
    };

    tfChange(ID){
        var x = this.state.addList;
        for (var i = 0; i<x.length; i++){
            if (x[i].id === ID){
                if (x[i].stat == 1){
                    x[i].stat = 0;
                }
                else{
                    x[i].stat = 1;
                }
            }
        }
        this.setState(state => ({addList: x}));
    }
    
    render() {
        return (
            <>
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" 
                        onChange={this.inputChange}  value={this.state.inputValue}
                            onKeyUp={this.inputKeyUp}/>
                    <Ul data={this.state.addList} TFChange={(e) => {this.tfChange(e)}}/>
                </section>
                <Footer data={this.state.addList} />
            </>
        );
    }
}

export default Section;
