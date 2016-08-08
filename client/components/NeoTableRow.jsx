"use strict";
import {Component}      from 'react'
import {observer}   from 'mobx-react';
import {TableRow,
        TableRowColumn} from 'material-ui/Table';
import DatePicker       from 'material-ui/DatePicker';

export default @observer
class NeoTableRow extends Component {
  constructor(props){
    super(props)
  }

  render(){
//console.log("TABLE ROW PROPS", this.props);
    let neo = this.props.neo;
    return(
      <TableRow key={neo.name} >
        <TableRowColumn>{neo.name}</TableRowColumn>
        <TableRowColumn>{neo.close_approach_data[0].close_approach_date}</TableRowColumn>
        <TableRowColumn>{Math.round(neo.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h</TableRowColumn>
        <TableRowColumn>{Math.round(neo.close_approach_data[0].miss_distance.kilometers)} km</TableRowColumn>
        <TableRowColumn><a href={neo.nasa_jpl_url} target="_blank">More Info</a></TableRowColumn>
      </TableRow>
    )
  }
}