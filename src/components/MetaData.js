import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {  Header } from 'semantic-ui-react'
import {inject} from 'mobx-react';


const MetaData = observer(({PeopleStore}) => {
    let {selectedPerson} = PeopleStore
    return (
        <Header as='h2'>
            People
            <Header.Subheader>
                {selectedPerson ? selectedPerson.fullName : "Select Someone"}
            </Header.Subheader>
            <Header.Subheader>
                {PeopleStore.numOfPeople}
            </Header.Subheader>
        </Header>
    )
})

export default inject('PeopleStore')(MetaData)