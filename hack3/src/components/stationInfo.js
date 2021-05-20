import React from 'react'

function StationInfo(props) {
  console.log(props.info)
  if (props.info !== null) {
    const labels = [
      { label: '車站名稱', value: props.info.station_name },
      { label: '車站位址', value: props.info.address },
      { label: '詢問處位置', value: props.info.service_counter },
      { label: '自行車進出', value: props.info.enable_bicycle }
    ]
    return (
      <div className="station-info-container">
        <table className="station-info-table">
          <thead>
            <tr>
              <th colSpan="2">車站資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id='table-station_name-label'>{labels[0].label}</td>
              <td id='table-station_name-value'>{labels[0].value}</td>
            </tr>
            <tr>
              <td id='table-address-label'>{labels[1].label}</td>
              <td id='table-address-value'>{labels[1].value}</td>
            </tr>
            <tr>
              <td id='table-service_counter-label'>{labels[2].label}</td>
              <td id='table-service_counter-value'>{labels[2].value}</td>
            </tr>
            <tr>
              <td id='table-enable_bicycle-label'>{labels[3].label}</td>
              <td id='table-enable_bicycle-value'>{labels[3].value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return(<div className="station-info-container">
    <table className="station-info-table">
      <thead>
        <tr>
          <th colSpan="2">車站資訊</th>
        </tr>
      </thead>
      <tbody>
        {
        }
      </tbody>
    </table>
  </div>)
  }
}

export default StationInfo
