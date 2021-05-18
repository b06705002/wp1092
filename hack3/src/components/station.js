import React from 'react'

function Station(props) {
  const data = props.stationData
  const chStatus = (id) => {
    props.changec(id)
  }
  const color = (col) => {
    if (col === 'R') return 'red'
    else if (col === 'G') return 'green'
    else if (col === 'O') return 'orange'
    else return 'blue'
  }
  const endOrStart = (data) => {
    if (data.station_order === 1 || data.distance_to_next === -1) {
      return ' end'
    } else return ''
  }
  if (data.distance_to_next === -1) {
    return (
      <div className="station-line-container">
        <div id={'s-'+data.station_id} className="station-and-name" onClick={() => chStatus(data.station_id)}> {/* you should add both id and onClick to attributes */}
          <div className={"station-rectangle "+color(data.station_type)+endOrStart(data)}>{data.station_id}</div>
          <div className={"station-name "+color(data.station_type)}>{data.station_name}</div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="station-line-container">
        <div id={'s-'+data.station_id} className="station-and-name" onClick={() => chStatus(data.station_id)}> {/* you should add both id and onClick to attributes */}
          <div className={"station-rectangle "+color(data.station_type)+endOrStart(data)}>{data.station_id}</div>
          <div className={"station-name "+color(data.station_type)}>{data.station_name}</div>
        </div>
        <div id={'l-'+data.station_id} className="line"></div> {/* you should add both id to attributes */}
      </div>
    )
  }
}

export default Station
