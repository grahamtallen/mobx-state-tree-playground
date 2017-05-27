import React, { Component } from 'react';
import PersonItem from './PersonItem';
import {observer} from 'mobx-react';
import {Card} from 'semantic-ui-react'
import {inject} from 'mobx-react';

@observer @inject('PeopleStore')
class PeopleList extends Component {

    render() {
        let {PeopleStore} = this.props
        return (
            <Card.Group  className="people_list">
                {PeopleStore.people.map((person) => <PersonItem person={person} key={person.firstName} />)}
            </Card.Group>
        );
    }
}

export default PeopleList;
