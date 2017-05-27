import React, { Component } from 'react';
import {observer} from 'mobx-react'

@observer
class PersonItem extends Component {
    render() {
        let {person} = this.props
        return (
            <div onClick={() => {
                console.log('clicked')
                person.setFirstName(person.firstName + ' clicked')
                console.log("New Name: ", person.firstName)

            }} className="person_item">
                <p>{person.firstName}</p>
            </div>
        );
    }
}

export default PersonItem;
