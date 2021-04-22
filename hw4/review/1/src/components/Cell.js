import React from 'react'
import PropTypes from 'prop-types'

const Cell = (props) => {
  const { className, x, y, children, onClick } = props;
  
  if (this.props.x === 0) {
    return (
      <span className = "cell0">
        {this.props.y}
      </span>
    )
  }

  // row 0
  if (this.props.y === 0) {
    const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
    return (
      <span
        onKeyPress={this.onKeyPressOnSpan}
        className = "cell0"
        role="presentation">
        {alpha[this.props.x]}
      </span>
    )
  }

  /*
  if (this.state.selected) {
    css.outlineColor = 'blue'
    css.outlineStyle = 'auto'
  }
  */

  if (this.state.editing) {
    return (
      <input
        className = "cell"
        type="text"
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPressOnInput}
        value={this.state.value}
        onChange={this.onChange}
        autoFocus
      />
    )
  }
  return (
    <span
      onClick={e => this.clicked(e)}
      onDoubleClick={e => this.doubleClicked(e)}
      className = "cell"
      role="presentation"
    >
      {this.display}
    </span>
  )
}


Cell.propTypes = {
onChangedValue: PropTypes.func.isRequired,
x: PropTypes.number.isRequired,
y: PropTypes.number.isRequired,
value: PropTypes.string.isRequired,
}