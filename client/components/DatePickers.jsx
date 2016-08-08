"use strict";
import {Component}  from 'react'
import {observer}   from 'mobx-react';
import DatePicker   from 'material-ui/DatePicker';
import RaisedButton   from 'material-ui/RaisedButton';

import AppStore     from '../stores/AppStore.js';

export default @observer
class DatePickers extends Component {
  constructor(props){
    super(props);


    this.restrictStartDates = this.restrictStartDates.bind(this);
    this.restrictEndDates = this.restrictEndDates.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  render(){
    var settings = this.props.settings;

    return(
      <div>
        <p style={{textAlign: 'center'}}>Pick a start and End date</p>
        <div style={{display: 'flex', justifyContent: 'center'}} >
          <DatePicker
            onChange={(e, date)=> settings.startDate = date}
            autoOk={true}
            floatingLabelText="Start Date"
            shouldDisableDate={this.restrictStartDates}
            style={{margin:'0px 5px'}}
            />
          <DatePicker
            onChange={(e, date)=> settings.endDate = date}
            autoOk={true}
            floatingLabelText="End Date"
            shouldDisableDate={this.restrictEndDates}
            style={{margin:'0px 5px'}}
            />

          <span style={{alignSelf:'flex-end', margin: '0px 5px'}} >
            <RaisedButton label="Find NEOs" primary={true} onClick={this.handleFetch} />
          </span>
        </div>
      </div>
    )
  }//render

  restrictStartDates(date){
    if(this.props.settings.endDate instanceof Date){
      let endDate = this.props.settings.endDate.getTime();
      let currentDate = date.getTime();

      return (currentDate > endDate || currentDate < (endDate - (7 * 24 * 60 * 60 * 1000)))
    }
    else return false;
  }

  restrictEndDates(date){
    if(this.props.settings.startDate instanceof Date){
      let startDate = this.props.settings.startDate.getTime();
      let currentDate = date.getTime();

      return (currentDate < startDate || currentDate > (startDate + (7 * 24 * 60 * 60 * 1000)))
    }
    else return false;
  }

  handleFetch(){
    var settings = this.props.settings;
    var formatDate = this.constructor.formatDate;

    if(!(settings.startDate instanceof Date) || !(settings.endDate instanceof Date)){
      return alert("Please select a date range.");
    }
    else{
      console.log("PEW PEW")
      AppStore.fetchNeos(formatDate(settings.startDate), formatDate(settings.endDate))
    }
  }

  static formatDate(date){

      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

}