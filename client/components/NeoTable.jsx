"use strict";
import {Component}  from 'react'
import {observer}   from 'mobx-react';
import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn} from 'material-ui/Table';

import NeoTableRow  from './NeoTableRow.jsx';
import AppStore     from '../stores/AppStore.js';

export default class NeoTable extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <p>Tip: click the column headers to sort in both ascending and descending order</p>
        <Table selectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableHeaderColumn onClick={()=> AppStore.sortName()}> <span>Name                </span></TableHeaderColumn>
            <TableHeaderColumn onClick={()=> AppStore.sortDate()}> <span>Close Approach Date </span></TableHeaderColumn>
            <TableHeaderColumn onClick={()=> AppStore.sortVelocity()}> <span>Relative Velocity   </span></TableHeaderColumn>
            <TableHeaderColumn onClick={()=> AppStore.sortDistance()}> <span>Miss Distance       </span></TableHeaderColumn>
            <TableHeaderColumn >NASA Link           </TableHeaderColumn>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.neos.map((neo, index)=>{
              return <NeoTableRow neo={neo} index={index} key={neo.name} />
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}