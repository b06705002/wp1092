import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data
  const chStatus = (id) => {
    props.changeC(id)
  }
  return (
    <div className="route-graph-container">
      {
        data.map((obj) => { return (<Station stationData={obj} changec={(id) => chStatus(id)}/>)})
      }
    </div>
  )
}

export default RouteGraph
