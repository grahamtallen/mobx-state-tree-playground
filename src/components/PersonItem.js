import React, { Component } from 'react';
import {observer} from 'mobx-react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'


@observer
class PersonItem extends Component {

    onClick = (person) => {
        console.log(person)
    }

    addFollower = (person) => {
        person.addFollower();
    }

    render() {
        let {person} = this.props;
        let {fullName, age, followers} = person
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {fullName}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {age} years old
                        </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content onClick={person.addFollower} extra>
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
