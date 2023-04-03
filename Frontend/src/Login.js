import React, {Component, useState, useEffect} from 'react';
import {Button, Divider, Form, Grid, Header, Image, Message, Modal, Segment, Tab} from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


function Login() {
    const [error, setError] = useState(null)
    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const navigateToSignUp = () => {
        navigation('/SignUp');
    };

    const [token, setToken] = useState(localStorage.getItem("uid"));
    const [isAuth, setIsAuth] = useState(!!(token && token !== "undefined"));

    useEffect(()=>{
        if(isAuth){
            navigation('/UserView');
        }
    })
    const [input, setInput] = useState({
        UserUsername: "",
        UserPassword: "",
    })

    function handleChange(e) {
        const newData = {...input}
        newData[e.target.name] = e.target.value
        setInput(newData)
        console.log(newData)
    }


    function handleSubmit(e) {
        e.preventDefault();
        let data = JSON.stringify({
            "UserUsername": input.UserUsername,
            "UserPassword": input.UserPassword
        });

        let config = {
            method: 'post',
            url: '/getUserByUserPassword',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        Axios(config)
            .then(function (response ) {
                if(response.status === 200){
                    localStorage.setItem("UserID", response.data[0].UserID) //set user for current session
                    localStorage.setItem("UserUsername", response.data[0].UserUsername)
                    localStorage.setItem("UserPassword", response.data[0].UserPassword)
                    localStorage.setItem("UserStatus", response.data[0].UserStatus)
                    //use localStorage.getItem("uid") to get the user from the current session
                    console.log(localStorage.getItem("uid"))
                    //use localStorage.deleteItem("uid") to logout user from current session
                }
                console.log(JSON.stringify(response.data));
                console.log('success');
                navigation('/UserView');
                setError(null)
            })
            .catch(function (error) {
                console.log(error);
                let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                console.warn("Such a username does not exist", message);
                setError(error)
            });
    }

    return (
        <Segment>
            <Header dividing textAlign="center" size="huge">This is the UEMT, have fun tracking!
            </Header>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form error onSubmit={(e)=> {
                            handleSubmit(e)
                            setError(null)
                        }}>
                            {error != null && <Message
                                error
                                header='Invalid Credentials'
                                content='Incorrect Username or Password'
                            />
                            }
                            <Form.Input
                                required={true}
                                icon='user'
                                iconPosition='left'
                                label='Username'
                                type= "User"
                                name = "UserUsername"
                                placeholder='Username'
                                value={input.UserUsername}
                                onChange={(e)=>handleChange(e)}
                            />
                            <Form.Input
                                required={true}
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type="Password"
                                name="UserPassword"
                                placeholder='Password'
                                value={input.UserPassword}
                                onChange={(e)=>handleChange(e)}
                            />
                            <Button primary type="submit">Login</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={navigateToSignUp}/>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        </Segment>
    )
}


export default Login;
