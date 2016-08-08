'use strict';
import {Component}  from 'react'
import {observer}   from 'mobx-react';
import Snackbar         from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import AppStore     from '../stores/AppStore';
import DatePickers  from './DatePickers.jsx';
import NeoTable     from './NeoTable.jsx';

// Start work here!
export default @observer
class AppBody extends Component {

  constructor(props){
    super(props)
  }

  render(){
    let largest = AppStore.getLargest();
    let fastest = AppStore.getFastest();
    let closest = AppStore.getClosest();
    return(
      <div>
        <div>
          <p>Largest NEO: {Math.round(largest)} meters</p>
          <p>Fastest NEO: {Math.round(fastest)} km/h</p>
          <p>Closest NEO: {Math.round(closest)} km</p>
        </div>
        <DatePickers {...this.props} />
        <NeoTable {...this.props} />
        <Snackbar
          open={this.props.settings.loadingNEOS}
          autoHideDuration={3000}
          message={<span>Loading Near Earth Objects <CircularProgress size={.5} style={{float:'right'}}/></span>}
          />
      </div>
    )
  }
}
