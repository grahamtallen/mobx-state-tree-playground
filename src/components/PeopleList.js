import React, { Component } from 'react';
import PersonItem from './PersonItem';
import {observer} from 'mobx-react';
import {Card} from 'semantic-ui-react'
import {inject} from 'mobx-react';

@inject('PeopleStore') @observer
class PeopleList extends Component {

    render() {
        let {PeopleStore} = this.props
        return (
            <Card.Group doubling className="people_list">
                {PeopleStore.people.map((person) => <PersonItem person={person} key={person.person_id} />)}
            </Card.Group>
        );
    }
}

export default PeopleList;
