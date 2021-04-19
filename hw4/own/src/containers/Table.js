import React, { Component } from "react";
import Table1 from "../components/Table1"

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 26,
            y: 100,
        }
    }
    
    // addColumn(){
        
    // }
    render() {
        return (
            <div style={{width: 'max-content'}}>
                <div className="stickytop">
                    <button className="b1style" onClick={() => {this.addColumn()}}>+</button>
                    <button className="b1style">-</button>
                </div>
                <div className="flex-container">
                    <div className="item1">
                        <button className="b2style">+</button>
                        <br/>
                        <button className="b2style">-</button>
                    </div>
                    <div className="item2">
                        <Table1 x={this.state.x} y={this.state.y} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;