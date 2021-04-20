import react, { Component } from 'react'
import Grid from '../components/Grid'
class Row extends Component {
  // console.log(key)  
  
  render(){
    // console.log(this.props.rowID)  
    return (
      <tr>
        <Grid content={this.props.content} RowID={this.props.rowID} />
      </tr>
    );
  }
};

export default Row;