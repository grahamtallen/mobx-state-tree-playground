import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PeopleList from './components/PeopleList';
import MetaData from './components/MetaData';
import GlobalStore from './stores/GlobalStore';
import {Grid} from 'semantic-ui-react';
import {Provider} from 'mobx-react';

class App extends Component {
  render() {
    return (
        <Provider {...GlobalStore}>
            <Grid  centered textAlign="center">
                <Grid.Row className="grid" centered textAlign="center">
                    <MetaData />
                </Grid.Row>
                <Grid.Row className="grid" centered textAlign="center">
                    <PeopleList />
                </Grid.Row>
            </Grid>
        </Provider>
    );
  }
}

export default App;
