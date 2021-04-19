import React from 'react'
import Cell from './Cell'
const Row = props => {
  const cells = []
  const y = props.y
  for (let x=0; x<props.x; x+=1) {
    // if (props.rowData[x]){
    //   console.log(x)
    //   console.log(props.rowData[x])
    // }
    cells.push(
      <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        xlen={props.x.length}
        onChangedValue={props.handleChangedCell}
        updateCells={props.updateCells}
        value={props.rowData[x] || ''}
        changeFocus={props.changeFocus}
      />
    )
  }
  return <div>{cells}</div>
}
export default Row