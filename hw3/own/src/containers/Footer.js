import React, { Component } from "react";

class Footer extends Component {
    showStatus(){
        this.props.TFShow();
    }
    render() {
        let l = this.props.data.length;
        if (l !== 0){
            var showCC = false;
            for (var i=0; i<l; i++){
                if (this.props.data[i].stat === 0){
                    showCC = true;
                }
            }
            if (showCC === true){
                return (
                    <footer className="todo-app__footer" id="todo-footer">
                        <div className="todo-app__total">{l} left</div>
                        <ul className="todo-app__view-buttons">
                            <li><button>All</button></li>
                            <li><button>Active</button></li>
                            <li><button>Completed</button></li>
                        </ul>
                        <div className="todo-app__clean"><button onClick={()=>{this.showStatus()}}>Clear completed</button></div>
                    </footer>
                );
            }
            else {
                return (
                    <footer className="todo-app__footer" id="todo-footer">
                        <div className="todo-app__total">{l} left</div>
                        <ul className="todo-app__view-buttons">
                            <li><button>All</button></li>
                            <li><button>Active</button></li>
                            <li><button>Completed</button></li>
                        </ul>
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