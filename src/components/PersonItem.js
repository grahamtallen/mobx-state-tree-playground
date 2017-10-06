import React, { Component } from 'react';
import {observer, inject} from 'mobx-react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'


@inject('PeopleStore') @observer
class PersonItem extends Component {

    onClick = (person) => {
        console.log(person)
    }

    addFollower = (person) => {
        person.addFollower();
    }

    render() {
        let {person, PeopleStore} = this.props;
        let {fullName, age, followers, person_id} = person
        return (
            <Card>
                <Card.Content>
                    <Card.Header onClick={() => PeopleStore.selectPerson(person)}>
                        {fullName}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {age} years old
                        </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content onClick={() => person.addFollower()} extra>
                    <a>
                        <Icon name='user' />
                        {followers} Followers
                    </a>
                </Card.Content>
            </Card>
        );
    }
}

export default PersonItem;
