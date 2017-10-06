import React, { Component } from 'react';
import {observer} from 'mobx-react'
import { Button, } from 'semantic-ui-react'
import {inject} from 'mobx-react';


const ReverseButton = observer(({PeopleStore, history}) => {
    return (
        <div className="reverse-button-ctn">
            <Button onClick={() => history.patches[3].replay()}>Replay</Button>
            <ul>
                {history.patches.map((patch, i) => {
                    let jsonData = {
                        'op': patch.data &&  JSON.stringify(patch.data.op),
                        'value': patch.data &&  JSON.stringify(patch.data.value)
                    }
                    return (
                        <li onClick={() => patch.replay()} key={i}>
                            Snapshot {i + 1}: {jsonData.op + ", " + jsonData.value + ', ' + 'path: ' + jsonData.path}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
})

export default inject('PeopleStore', 'history')(ReverseButton)