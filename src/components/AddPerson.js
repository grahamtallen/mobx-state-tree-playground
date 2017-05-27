import React, { Component } from 'react';
import {observer} from 'mobx-react'
import { Form } from 'semantic-ui-react'
import {inject} from 'mobx-react';



const AddPerson = ({NewPersonStore}) => {
    return (
        <Form>
            <Form.Field>
                <label>First Name</label>
                <input onChange={NewPersonStore.setFirstName} placeholder='First Name' />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default inject('NewPersonStore')(AddPerson)