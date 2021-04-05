import React, { Component } from "react";
import Header from "../components/Header";
import Section from "./Section";

class TodoApp extends Component {
    render() {
        return (
            <>
                <Header text="todos" />
                <Section />
            </>
        );
    }
}

export default TodoApp;
