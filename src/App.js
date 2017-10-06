import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PeopleList from './components/PeopleList';
import AddPerson from './components/AddPerson'
import MetaData from './components/MetaData';
import ReverseButton from './components/ReverseButton';
import PeopleStore from './stores/GlobalStore';
import Snapshots from './components/Snapshots';
import {Grid} from 'semantic-ui-react';
import {Provider, observer} from 'mobx-react';
import {observable} from 'mobx'

import {
    types,
    onSnapshot,
    applySnapshot,
    onPatch,
    onAction,
    applyAction,
    applyPatch,
    getSnapshot
} from 'mobx-state-tree';

window.PeopleStore = PeopleStore // for playing around with the console

const history = {
    snapshots: observable.shallowArray(),
    actions: observable.shallowArray(),
    patches: observable.shallowArray()
}

let recording = true // supress recording history when replaying



onSnapshot(PeopleStore, s => {
    if (recording) {
        history.snapshots.unshift({
            data: s,
            replay() {
                applySnapshot(PeopleStore, this.data)
                console.log('this.data', this.data)
                recording = true
            }
        })
    }
    //console.log('Snapshot: ', s)
})
onPatch(PeopleStore, s => {
    history.patches.unshift({
        data: s,
        replay() {
            recording = false
            applyPatch(PeopleStore, this.data)
            recording = true
        }
    })

    console.log('Recording? ', recording, s)
})
onAction(PeopleStore, s => recording && history.actions.unshift({
    data: s,
    replay() {
        recording = false
        applyAction(PeopleStore, this.data)
        recording = true
    }
}))


// add initial snapshot
history.snapshots.push({
    data: getSnapshot(PeopleStore),
    replay() {
        // TODO: DRY
        recording = false
        applySnapshot(PeopleStore, this.data)
        recording = true
    }
})


@observer
class App extends Component {
  render() {
      console.log('Rerendered: ', PeopleStore.selectedPerson)
      return (
        <Provider history={history} PeopleStore={PeopleStore}>
            <Grid  centered textAlign="center">
                <Grid.Row className="grid" centered textAlign="center">
                    <MetaData />
                    <Snapshots />
                </Grid.Row>
                <Grid.Row className="grid" centered textAlign="center">
                    <PeopleList />
                </Grid.Row>
                <Grid.Row className="grid" centered textAlign="center">
                    <AddPerson newPerson={PeopleStore.newPerson} />
                </Grid.Row>
                <ReverseButton />
            </Grid>
        </Provider>
    );
  }
}

export default App;
