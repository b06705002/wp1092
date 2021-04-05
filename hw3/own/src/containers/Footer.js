import React, { Component } from "react";

class Footer extends Component {
    render() {
        let l = this.props.data.length;
        if (l != 0){
            return (
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{l} left</div>
                    <ul className="todo-app__view-buttons">
                        <li><button>All</button></li>
                        <li><button>Active</button></li>
                        <li><button>Completed</button></li>
                    </ul>
                    <div className="todo-app__clean"><button>Clear completed</button></div>
                </footer>
            );
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