'use strict';
import {Component}      from 'react';
import {observer}       from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppStore         from '../stores/AppStore';
import AppBody          from './AppBody';


// <-- That's store based magic, for now just think about it as making the following component watch when our state store changes
export default @observer
class App extends Component{
  constructor(props){
    super(props);

    AppStore.fetchNeos();
  }

  render(){

    return (
      <MuiThemeProvider>
        <main>
          <header>
            The Doomsday Watcher
          </header>
          <AppBody {...AppStore.state} />
        </main>
      </MuiThemeProvider>
    );
  }
}
