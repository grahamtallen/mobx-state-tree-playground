import React, { Component } from 'react';
import PersonItem from './PersonItem';
import {observer} from 'mobx-react';
import PeopleStore from '../stores/PeopleStore'
import {Card} from 'semantic-ui-react'


@observer
class PeopleList extends Component {

    render() {
        return (
            <Card.Group className="people_list">
                {PeopleStore.people.map((person) => <PersonItem person={person} key={person.firstName} />)}
            </Card.Group>
        );
    }
}

export default PeopleList;
