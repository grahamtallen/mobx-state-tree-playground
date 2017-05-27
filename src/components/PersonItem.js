import React, { Component } from 'react';
import {observer} from 'mobx-react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'

//<div onClick={() => {
//    console.log('clicked')
//    person.setFirstName(person.firstName + ' clicked')
//    console.log("New Name: ", person.firstName)
//
//}} className="person_item">
//    <p>{person.firstName}</p>
//</div>

@observer
class PersonItem extends Component {

    onClick = (person) => {
        console.log(person)
    }

    render() {
        let {person} = this.props
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {person.fullName}
                    </Card.Header>
                    <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                </Card.Content>
            </Card>
        );
    }
}

export default PersonItem;
