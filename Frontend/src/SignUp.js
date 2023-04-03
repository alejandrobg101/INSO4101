import React, { Component, useState, useEffect } from 'react'
import {Checkbox, Form, Grid, Header, Segment, Radio, Image, Icon, Button, Message, TextArea} from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom';
import Axios from "axios";

function SignUp(){
    const navigate = useNavigate()
    const url = "http://127.0.0.1:5000/register"
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [status, setStatus] = useState(false)
    const [error, setError] = useState(false)

    const toggleChecked = () => {
        setStatus(current => !current);
    };

    const navigateToUserView = () => {
        navigate('../UserView');
    };

    const navigateToHome = () => {
        navigate('/')
    }

    function submit() {
        let admin;
        if (status) {
            admin = 'true'
        } else {
            admin = 'false'
        }
        const user = JSON.stringify({
            "UserFirstName": firstName,
            "UserLastName": lastName,
            "UserUsername": userName,
            "UserEmailAddress": email,
            "UserPassword": password,
            "UserBio": bio,
            "UserStatus": admin
        });
        const register = {
            method: 'post',
            url: '/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };
        Axios(register)
            .catch(function (error) {
                console.log(error);
                let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                console.warn("That username already exists", message)
                setError(true)
            })
            .then(async () => {
                let data = JSON.stringify({
                    "UserUsername": userName,
                    "UserPassword": password,
                });

                let config = {
                    method: 'POST',
                    url: '/getUserByUserPassword',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                Axios(config)
                    .then(function (response) {
                        if (response.status === 200) {
                            localStorage.setItem("UserID", response.data[0].UserID)
                            console.log(localStorage.getItem("UserID"))
                        }
                        console.log(JSON.stringify(response.data));
                        console.log('success');
                        setError(false)
                        navigateToUserView()
                    })
                    .catch(function (error) {
                        console.log(error);
                        let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                        console.warn("Invalid username", message)
                    })
                })
    }

    return (
        <Segment>
            <Header dividing textAlign="center" size="huge">Sign Up to the UEMT!
                <Image size='mini' src='https://cdn-icons-png.flaticon.com/512/599/599505.png'/>
            </Header>
            <Segment placeholder>
                <Form error onSubmit={()=>{
                    submit()
                    setError(false)
                }}>
                    <Button negative icon floated='left' onClick={navigateToHome}>
                        <Icon name='arrow circle left'/> Back To Login
                    </Button>
                    <Form.Input
                        required={true}
                        label='First Name'
                        placeholder='First Name'
                        id='UserFirstName'
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                    <Form.Input
                        required={true}
                        label='Last Name'
                        placeholder='Last Name'
                        id='UserLastName'
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}

                    />
                    <Form.Input
                        required={true}
                        label='Username'
                        placeholder='Username'
                        id='UserUsername'
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    />
                    <Form.Input
                        required={true}
                        icon='user'
                        iconPosition='left'
                        label='Email'
                        placeholder='Email'
                        id='UserEmailAddress'
                        value={email}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <Form.Input
                        required={true}
                        label='Password'
                        placeholder='Password'
                        type='password'
                        id='UserPassword'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <Form.Field
                        control={TextArea}
                        label='Bio'
                        placeholder='Tell us more about you...'
                        id='UserBio'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}

                    />
                    <Form.Checkbox
                        label='Admin'
                        id='admin'
                        value={'false'}
                        onClick={toggleChecked}
                    />
                    <Form.Button content='Submit' primary/>
                    {error && <Message
                        error
                        header='Not Available'
                        content='Username is not available'
                    />}
                </Form>
            </Segment>
        </Segment>
    )
}

export default SignUp;