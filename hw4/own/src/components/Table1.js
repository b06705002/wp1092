import React from 'react'
import Row from './Row'
export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 26,
      y: 101,
      data: {},
      focusOn: {}
    }
  }
  handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, this.state.data)
    if (!modifiedData[y]) {
      modifiedData[y] = {}
    }
    // if (value === ""){
    //   console.log("hi")
    // }
    modifiedData[y][x] = value
    // console.log(modifiedData[y][x])
    this.setState({ data: modifiedData })
  }
  updateCells = () => {
    this.forceUpdate()
  }
  changeFocus = ({x, y}) => {
    this.setState({ focusOn: {x, y}}, () =>  {
      // console.log(this.state.focusOn);
    });
  }
  isEmptyObject(obj){
    for (var n in obj) {
        return false
    }
    return true; 
  }
  addColumn = () => {
    const modifiedData = Object.assign({}, this.state.data)
    for (var i=0; i<this.state.y; i++){
      if (!modifiedData[i]) {
        modifiedData[i] = {}
      }
      else{
        for (let j=this.state.x; j>this.state.focusOn.x; j--){
          if ((typeof(modifiedData[i][j-1]) !== "undefined" || modifiedData[i][j-1] === '') && j>this.state.focusOn.x+1){
            modifiedData[i][j] = modifiedData[i][j-1]
            delete modifiedData[i][j-1]
          }
        }
      }
    }
    this.setState({ data: modifiedData}, () =>  {
      // console.log(this.state.data);
    });
    this.setState({ x: this.state.x+1 })
    this.updateCells()
  }
  removeColumn = () => {
    const modifiedData = Object.assign({}, this.state.data)
    for (var i=0; i<this.state.y; i++){
      if (!modifiedData[i]) {
        modifiedData[i] = {}
      }
      else{
        for (let j=this.state.focusOn.x; j<this.state.x; j++){
          if (typeof(modifiedData[i][j+1]) !== "undefined" || modifiedData[i][j+1] === ''){
            modifiedData[i][j] = modifiedData[i][j+1]
          }
          else if ((typeof(modifiedData[i][j]) !== "undefined" || modifiedData[i][j] === '') && typeof(modifiedData[i][j+1]) === "undefined"){
            delete modifiedData[i][j]
          }
        }
      }
      delete modifiedData[i][this.state.x]
    }
    this.setState({ data: modifiedData}, () =>  {
      // console.log(this.state.data);
    });
    this.setState({ x: this.state.x-1 })
    this.updateCells()
  }
  addRow = () => {
    const modifiedData = Object.assign({}, this.state.data)
    for (var i=this.state.y; i>this.state.focusOn.y; i--){
      if (i === this.state.focusOn.y+1) {
        modifiedData[i] = {}
      }
      else if (typeof(modifiedData[i-1]) !== "undefined") {
        modifiedData[i] = modifiedData[i-1]
      }
      else {
        modifiedData[i] = {}
      }
    }
    this.setState({ data: modifiedData}, () =>  {
      // console.log(this.state.data);
    });
    this.setState({ y: this.state.y+1 })
    this.updateCells()
  }
  removeRow = () => {
    const modifiedData = Object.assign({}, this.state.data)
    for (var i=this.state.focusOn.y; i<this.state.y; i++){
      if (typeof(modifiedData[i+1]) !== "undefined") {
        modifiedData[i] = modifiedData[i+1]
      }
      else {
        modifiedData[i] = {}
      }
    }
    this.setState({ data: modifiedData}, () =>  {
      // console.log(this.state.data);
    });
    this.setState({ y: this.state.y-1 })
    this.updateCells()
  }
  render() {
    const rows = []
    // console.log(this.state.data);
    for (let y=0; y < this.state.y; y++) {
      const rowData = this.state.data[y] || {}
      // if (this.state.data[y]){
      //   console.log(rowData)
      // }
      rows.push(
        <Row
          handleChangedCell={this.handleChangedCell}
          updateCells={this.updateCells}
          key={y}
          y={y}
          x={this.state.x+1}
          rowData={rowData}
          changeFocus={this.changeFocus}
        />
      )
    }
    return (
      <div style={{width: 'max-content'}}>
          <div className="stickytop">
              <button className="b1style" onClick={() => {this.addColumn()}}>+</button>
              <button className="b1style" onClick={() => {this.removeColumn()}}>-</button>
          </div>
          <div className="flex-container">
              <div className="item1">
                  <button className="b2style" onClick={() => {this.addRow()}}>+</button>
                  <br/>
                  <button className="b2style" onClick={() => {this.removeRow()}}>-</button>
              </div>
              <div className="item2">
                <div>{rows}</div>
              </div>
          </div>
      </div>
    )
  }
}