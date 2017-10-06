

import React, { Component } from 'react';
import {observer} from 'mobx-react'
import { Button, } from 'semantic-ui-react'
import {inject} from 'mobx-react';


const SnapData = (data) => {
    return (
        <p>
        NumOfPeople: {data.people && data.people.length},
        <br/>
        Selected Person: {data.selectedPerson}
        </p>
    )
}

const Snapshots = observer(({PeopleStore, history}) => {

    return (
        <div className="reverse-button-ctn">
            <Button onClick={() => history.snapshots[0].replay()}>Replay</Button>
            <ul>
                {history.snapshots.map((snapshot, i) => {
                    let {data} = snapshot.data

                    console.log(data)
                    return (
                        <li onClick={() => snapshot.replay()} key={i}>
                            Snapshot {i + 1}:
                                {data && <SnapData data={data} /> }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
})

export default inject('PeopleStore', 'history')(Snapshots)