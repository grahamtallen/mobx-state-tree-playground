import React, { Component } from 'react';
import {observer} from 'mobx-react'
import { Button, Card, Image, Icon, Header } from 'semantic-ui-react'
import {inject} from 'mobx-react';


const MetaData = ({PeopleStore}) => {
    return (
        <Header as='h2'>
            People
            <Header.Subheader>
                {PeopleStore.lastNames.join(', ')}
            </Header.Subheader>
            <Header.Subheader>
                {PeopleStore.numOfPeople}
            </Header.Subheader>
        </Header>
    )
}

export default inject('PeopleStore')(MetaData)