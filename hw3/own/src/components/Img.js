import React, { Component } from "react";

class Img extends Component {
    handerClickImage(){
        this.props.deleteImage();
    }
    render() {
        return (
            <img src="./img/x.png" className="todo-app__item-x" onClick={()=>{this.handerClickImage()}}/>
        );
    }
}

export default Img;