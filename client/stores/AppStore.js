'use strict';
/*
 Here we've set up a state store for you so all of your time isn't wasted on the endless wasteland of blog posts
 related to why one flux implementation is better than another. In fact, we're not even really using a 100% flux
 type setup here. There's some minor magic going on here, the important thing to know is that we're using a mobx
 based store to implement some reactive programming into our data structure. Feel free to move the observables
 around in this store and control how they're populated into the app if you have a deeper understanding of mobx
 otherwise just add additional properties on to the state object below and it'll already be spread onto the top
 level of the app in a semi flux fashion. Modify pieces of your magical state with functions like someAction below.
 */
import {observable, computed} from 'mobx';
import request      from 'superagent';

class AppState {
  @observable state = {
    // props go here
    settings:{
      startDate: '',
      endDate: '',
      sizeDesc: false,
      speedDesc: false,
      nameDesc: false,
      distDesc: false,
      dateDesc: false,
      sortBy: 'date',
      loadingNEOS: true,
    },
    neos:[],
    rawApi:{}
  };

  someAction = () => {
    // modify a prop?
    this.state.randomKey = 'Hello Squirrel';
  };

  /*API FETCH*/
  fetchNeos(startDate, endDate){
    let state = this.state;
    let settings = state.settings;
    let query ={};
    let url = `api/neo`;

    if(typeof startDate !== 'undefined') query.start_date = startDate;
    if(typeof endDate !== 'undefined') query.end_date = endDate;

    settings.loadingNEOS = true;

    request
      .get(url)
      .query(query)
      .end((err, res)=> {
        let response = JSON.parse(res.text);
        let neos = response.near_earth_objects;
        let neoKeys = Object.keys(neos);
        let neoArr = [];

        settings.loadingNEOS = false;

        //console.log('NEO KEYS', neoKeys);
        neoKeys.forEach((key)=>{
          neos[key].forEach((neo)=>{
            //console.log("NEW NEO:", neo);
            neoArr.push(neo);
          });
        });

        state.neos = neoArr.reverse();
        //reset sort settings
        settings.sizeDesc = false;
        settings.speedDesc = false;
        settings.nameDesc = false;
        settings.distDesc = false;
        settings.dateDesc = false;
        settings.sortBy = 'date';
        state.rawApi = JSON.parse(res.text)
      });
  };

  /*GETTERS*/
  getLargest(){
    let sorted = this.constructor.sortNEO(this.state.neos, 'estimated_diameter.estimated_diameter_max', true)[0];
    return typeof sorted !== 'undefined' ? sorted.estimated_diameter.meters.estimated_diameter_max : '';
  }

  getFastest(){
    let sorted = this.constructor.sortNEO(this.state.neos, 'close_approach_data[0].relative_velocity.kilometers_per_hour', true).reverse()[0];
    return typeof sorted !== 'undefined' ? sorted.close_approach_data[0].relative_velocity.kilometers_per_hour : '';
  }

  getClosest(){
    let sorted = this.constructor.sortNEO(this.state.neos, 'close_approach_data[0].miss_distance.kilometers', true)[0];
    return typeof sorted !== 'undefined' ? sorted.close_approach_data[0].miss_distance.kilometers : '';
  }

  /*SORT CONTROLLERS*/
  sortLargest(){
    let settings = this.state.settings;
    let sortBy = 'size';
    let sorted = this.constructor.sortNEO(this.state.neos, 'estimated_diameter.estimated_diameter_max', true);
    let desc = settings.sortBy == sortBy ? !settings.sizeDesc : settings.sizeDesc;

    if(desc) sorted = sorted.reverse();
    settings.sizeDesc = !settings.sizeDesc;
    settings.sortBy = sortBy;
    this.state.neos = sorted;
  }

  sortVelocity(){
    let settings = this.state.settings;
    let sortBy = 'speed';
    let sorted = this.constructor.sortNEO(this.state.neos, 'close_approach_data[0].relative_velocity.kilometers_per_hour', true);
    let desc = settings.sortBy == sortBy ? !settings.speedDesc : settings.speedDesc;

    if(desc) sorted = sorted.reverse();
    settings.speedDesc = !settings.speedDesc;
    settings.sortBy = sortBy;
    this.state.neos = sorted;
  }

  sortName(){
    let settings = this.state.settings;
    let sortBy = 'name';
    let sorted = this.constructor.sortNEO(this.state.neos, 'name');
    let desc = settings.sortBy == sortBy ? !settings.nameDesc : settings.nameDesc;

    if(desc) sorted = sorted.reverse();
    settings.nameDesc = !settings.nameDesc;
    settings.sortBy = sortBy;
    this.state.neos = sorted;
  }

  sortDistance(){
    let settings = this.state.settings;
    let sortBy = 'dist';
    let sorted = this.constructor.sortNEO(this.state.neos, 'close_approach_data[0].miss_distance.kilometers', true);
    let desc = settings.sortBy == sortBy ? !settings.distDesc : settings.distDesc;

    if(desc) sorted = sorted.reverse();
    settings.distDesc = !settings.distDesc;
    settings.sortBy = sortBy;
    this.state.neos = sorted;
  }

  sortDate(){
    let settings = this.state.settings;
    let sortBy = 'date';
    let sorted = this.constructor.sortNEO(this.state.neos, 'close_approach_data[0].close_approach_date');
    let desc = settings.sortBy == sortBy ? !settings.dateDesc : settings.dateDesc;

    if(desc) sorted = sorted.reverse();
    settings.dateDesc = !settings.dateDesc;
    settings.sortBy = sortBy;
    this.state.neos = sorted;
  }


  /*STATIC SORT FUNCTION*/
  static sortNEO(obj, path, round=false){
    let neos = obj;
    let valByString = (o, s) => {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, '');           // strip a leading dot
      var a = s.split('.');
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
          o = o[k];
        } else {
          return;
        }
      }
      return o;
    };
    //estimated_diameter.estimated_diameter_max

    return neos.sort((a, b)=>{
      let aVal = round ? Math.round(valByString(a, path)) : valByString(a, path);
      let bVal = round ?  Math.round(valByString(b, path)) : valByString(b, path);

      if (aVal > bVal) {
        return 1;
      }
      if (aVal < bVal) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
}

let store = new AppState();
module.exports = store;
