import React from 'react'

export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.value,
    }
    this.display = this.determineDisplay(
      { x: props.x, y: props.y },
      props.value
    )
    this.timer = 0
    this.delay = 200
    this.prevent = false
  }

  componentDidMount() {
    window.document.addEventListener('unselectAll',
      this.handleUnselectAll)
  }

  componentDidUpdate() {
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y }, this.state.value)
  }
  
  componentWillUnmount() {
    window.document.removeEventListener('unselectAll',
      this.handleUnselectAll)
  }
  
  onChange = (e) => {
    this.setState({ value: e.target.value })
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y }, e.target.value)
  }

  onChangeSelected = (e) => {
    if (e.target.value.length > this.state.value.length){
      var newValue = e.target.value.substr(e.target.value.length-1, 1);
      this.setState({ focusing: true })
      this.setState({ value: newValue })
      this.display = this.determineDisplay(
        { x: this.props.x, y: this.props.y }, newValue)
    }
    else {
      this.setState({ focusing: true })
      this.setState({ value: "" })
      this.display = this.determineDisplay(
        { x: this.props.x, y: this.props.y }, "")
    }
  }

  onKeyPressOnInput = (e) => {
    if (e.key === 'Enter') {
      // console.log(typeof e.target.value)
      this.hasNewValue(e.target.value)
      if (this.props.xlen === this.props.x+1){
        this.props.changeFocus({x: this.props.x, y: this.props.y})
      }
      else{
        this.props.changeFocus({x: this.props.x+1, y: this.props.y})
      }
      this.timer = setTimeout(() => {
        if (!this.prevent) {
          // Unselect all the other cells and set the current
          // Cell state to `selected`
          this.emitUnselectAllEvent()
          // this.setState({ selected: true })
        }
        this.prevent = false
      }, this.delay)
    }
  }
// modified
  onKeyPressOnSelected = (e) => {
    // console.log(e.key)
    if (e.key === 'Delete') {
      this.setState({ value: "" })
      this.display = this.determineDisplay(
        { x: this.props.x, y: this.props.y }, "")
    }
  }
// modified
  onKeyPressOnSpan = () => {
    if (!this.state.editing) {
      this.setState({ editing: true })
    }
    this.props.changeFocus({x: this.props.x, y: this.props.y})
  }

  onBlur = (e) => {
    this.hasNewValue(e.target.value)
  }

  handleUnselectAll = () => {
    if (this.state.selected || this.state.editing || this.state.focusing) {
      this.setState({ selected: false, editing: false, focusing: false})
    }
  }

  hasNewValue = (value) => {
    this.props.onChangedValue(
      {
        x: this.props.x,
        y: this.props.y,
      },
      value,
    )
    this.setState({ editing: false, focusing: false})
  }

  emitUnselectAllEvent = () => {
    const unselectAllEvent = new Event('unselectAll')
    window.document.dispatchEvent(unselectAllEvent)
  }

  clicked = () => {
    this.props.changeFocus({x: this.props.x, y: this.props.y})
    // Prevent click and double click to conflict
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        // Unselect all the other cells and set the current
        // Cell state to `selected`
        this.emitUnselectAllEvent()
        this.setState({ selected: true })
      }
      this.prevent = false
    }, this.delay)
  }

  doubleClicked = () => {
    this.props.changeFocus({x: this.props.x, y: this.props.y})
    // Prevent click and double click to conflict
    clearTimeout(this.timer)
    this.prevent = true
    // Unselect all the other cells and set the current
    // Cell state to `selected` & `editing`
    this.emitUnselectAllEvent()
    this.setState({ editing: true, selected: true, focusing: false})
  }
  determineDisplay = ({ x, y }, value) => {
    return value
  }

  calculateCss = () => {
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',
      fontFamily: 'Calibri, \'Segoe UI\', Thonburi, Arial, Verdana, sans-serif',
    }
    if (this.props.x === 0 || this.props.y === 0) {
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }
    return css
  }
  render() {
    const css = this.calculateCss()
    if (this.state.value !== this.props.value && this.state.focusing !== true){
      // console.log(this.props.x)
      this.setState({ value: this.props.value })
      this.determineDisplay({ x: this.props.x, y: this.props.y }, this.props.value)
    }

    // )
    if (this.props.x === 0) {
      return (
        <span style={css}>
          {this.props.y}
        </span>
      )
    }
    // row 0
    if (this.props.y === 0) {
      if (this.props.x > 26){
        var alphaList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var cName = alphaList[parseInt(this.props.x/26)-1]
        cName += alphaList[parseInt(this.props.x%26)-1]
        return (
          <span
            onKeyPress={this.onKeyPressOnSpan}
            style={css}
            role="presentation">
            {cName}
          </span>
        )
      }
      else{
        const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        return (
          <span
            onKeyPress={this.onKeyPressOnSpan}
            style={css}
            role="presentation">
            {alpha[this.props.x]}
          </span>
        )
      }
    }
    if (this.state.selected) {
      css.outlineColor = 'blue'
      css.outlineStyle = 'solid'
    }
    if (this.state.editing) {
      return (
        <input
          style={css}
          type="text"
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPressOnInput}
          value={this.state.value}
          onChange={this.onChange}
          autoFocus
        />
      )
    }
    // modified
    if (this.state.focusing) {
      return (
        <input
          className="test2"
          type="text"
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPressOnInput}
          onDoubleClick={e => this.doubleClicked(e)}
          value={this.state.value}
          onChange={this.onChange}
          // placeholder={this.state.value}
          autoFocus
        />
      )
    }
    if (this.state.selected) {
      return (
        <input
          className="test1"
          type="text"
          onBlur={this.onBlur}
          onKeyDown={this.onKeyPressOnSelected}
          onDoubleClick={e => this.doubleClicked(e)}
          value={this.state.value}
          onChange={this.onChangeSelected}
          // placeholder={this.state.value}
          autoFocus
        />
      )
    }
    // modified
    return (
      <span
        onClick={e => this.clicked(e)}
        onDoubleClick={e => this.doubleClicked(e)}
        style={css}
        role="presentation"
      >
        {this.display}
      </span>
    )
  }
}