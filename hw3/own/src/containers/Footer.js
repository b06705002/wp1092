import React, { Component } from "react";

class Footer extends Component {
    showStatus(){
        this.props.TFShow();
    }
    change0(){
        this.props.changeS(0);
    }
    change1(){
        this.props.changeS(1);
    }
    change2(){
        this.props.changeS(2);
    }

    render() {
        if (this.props.data.length !== 0){
            var showCC = false;
            for (var i=0; i<this.props.data.length; i++){
                if (this.props.data[i].stat === 0){
                    showCC = true;
                }
            }
            let l = 0;
            for (var i = 0; i<this.props.data.length; i++){
                if (this.props.data[i].stat === 1){
                    l+=1;
                }
            }
            if (showCC === true){
                return (
                    <footer className="todo-app__footer" id="todo-footer">
                        <div className="todo-app__total">{l} left</div>
                        <ul className="todo-app__view-buttons">
                            <li><button onClick={()=>{this.change0()}}>All</button></li>
                            <li><button onClick={()=>{this.change1()}}>Active</button></li>
                            <li><button onClick={()=>{this.change2()}}>Completed</button></li>
                        </ul>
                        <div className="todo-app__clean"><button onClick={()=>{this.showStatus()}}>Clear completed</button></div>
                    </footer>
                );
            }
            else {
                const style = {
                    visibility: 'hidden'
                };
                return (
                    <footer className="todo-app__footer" id="todo-footer">
                        <div className="todo-app__total">{l} left</div>
                        <ul className="todo-app__view-buttons">
                            <li><button onClick={()=>{this.change0()}}>All</button></li>
                            <li><button onClick={()=>{this.change1()}}>Active</button></li>
                            <li><button onClick={()=>{this.change2()}}>Completed</button></li>
                        </ul>
                        <div className="todo-app__clean"><button style={style} onClick={()=>{this.showStatus()}}>Clear completed</button></div>
                    </footer>
                );
            }
        }
        else{
            return (
                <footer className="todo-app__footer" id="todo-footer">
                </footer>
            );
        }
    }
}

export default Footer;