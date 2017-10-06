import React, { Component } from 'react';
import { Form, Checkbox, Button, Header } from 'semantic-ui-react'
import {inject, observer} from 'mobx-react';



const AddPerson = observer(({newPerson, PeopleStore}) => {
    return (
        <div>
            <Form centered>
                <Form.Field>
                    <Header>
                        New person
                    </Header>
                </Form.Field>
                <Form.Field>
                    <label>First Name</label>
                    <input value={newPerson.firstName} onChange={(e)=> newPerson.setField('firstName', e.target.value)} placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input value={newPerson.lastName} onChange={(e)=> newPerson.setField('lastName', e.target.value)} placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <label>Age</label>
                    <input type="number" value={newPerson.age} onChange={(e)=> newPerson.setField('age', Number(e.target.value))} placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
            </Form>
            <Button onClick={() => PeopleStore.submitUser()}>Add Person</Button>
        </div>
    )
})

export default inject('PeopleStore')(AddPerson)