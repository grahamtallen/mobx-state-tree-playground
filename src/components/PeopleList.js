import React, { Component } from 'react';
import PersonItem from './PersonItem';
import {observer} from 'mobx-react';
import PeopleStore from '../stores/PeopleStore'



@observer
class PeopleList extends Component {

    render() {
        return (
            <div className="people_list">
                {PeopleStore.people.map((person) => <PersonItem person={person} key={person.firstName} />)}
            </div>
        );
    }
}

export default PeopleList;
