import React, {Component, useState, useEffect} from 'react';
import {
    Button,
    Card,
    Container,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Image, Input,
    Modal,
    Segment,
    Tab, TextArea
} from "semantic-ui-react";

import {useNavigate} from "react-router-dom";


function UserView(){
    const navigation = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("UserID"));
    const [isAuth, setIsAuth] = useState(!!(token && token !== "undefined"));
    const [search, setSearch] = useState('')
    //const [notShow, setNotShow] = useState(false)
    function handleLogout () {
        setIsAuth(false)
        localStorage.removeItem("UserId");
        localStorage.removeItem("UserEmailAddress");
        localStorage.removeItem("UserPassword");
        localStorage.removeItem("UserStatus");
        navigation('/UserView');
        console.log('Logged out');
    }

    useEffect(()=>{
        localStorage.setItem("search", '')
        if(!isAuth){
            navigation('/');
        }
    })

    const [receiver, setReceiver] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [friend, setFriend] = useState('');

    const url = "http://127.0.0.1:5000/createEmail/"
    async function submit() {
        await fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                UserID: localStorage.getItem("UserID"),
                ReceiverEmail: receiver,
                esubject: subject,
                ebody: body
            }),
            headers: {"Content-Type": "application/json"},
        })
        setIsShown(false);
    }

    const urlFriend = "http://127.0.0.1:5000/addfriend"
    async function submitFriend() {
        await fetch(urlFriend, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                OwnerUserID: localStorage.getItem("uid"),
                FriendEmail: friend
            }),
            headers: {"Content-Type": "application/json"},
        })
        setIsFriendShown(false);
    }

    const [isShown, setIsShown] = useState(false);
    const [isLogoutShown, setIsLogoutShown] = useState(false);
    const [isFriendShown, setIsFriendShown] = useState(false);

    const handleClickShow = event => {
        // 👇️ toggle shown state
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsShown(true);
    };

    const handleClickLogoutShow = event => {
        // 👇️ toggle shown state
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsLogoutShown(true);
    };

    const handleClickHide = event => {
        // 👇️ toggle shown state
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsShown(false);
    };

    const handleClickLogoutHide = event => {
        // 👇️ toggle shown state
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsLogoutShown(false);
    };

    const handleClickFriendShow = event => {
        // 👇️ toggle shown state
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsFriendShown(true);
    };

    const handleClickFriendHide = event => {
        // 👇️ toggle shown state
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsFriendShown(false);
    };

    function Box() {
        return (
            <Form onSubmit={submit}>
                <h2>New Message<Button negative icon='times circle' size='compact' floated='right' onClick={handleClickHide}/></h2>
                <Form.Input required={true}
                            placeholder='To:' value={receiver}
                            onChange={(e) => {
                                setReceiver(e.target.value)
                            }}/>

                <Form.Input required={true}
                            placeholder='Subject:' value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                            }}/>

                <Form.Input required={true}
                            placeholder='Body:' value={body}
                            onChange={(e) => {
                                setBody(e.target.value)
                            }}/>

                {isShown && <Form.Button content='Send' primary/>}
            </Form>
        );
    }

    function LogoutBox() {
        return (
            <Segment raised compact floated='right' size='mini'>
                <h2 align='right'>Sign Out?</h2>
                <Button color='blue' type='submit' size='tiny' onClick={handleLogout}>Yes</Button>
                <Button negative type='submit' size='tiny' onClick={handleClickLogoutHide}>No</Button>
            </Segment>
        );
    }

    function FriendBox(){
        return(
            <Form onSubmit={submitFriend}>
                <h2 align='left'>Add Friend
                    <Button negative icon='times circle' size='compact' floated='right' onClick={handleClickFriendHide}></Button>
                </h2>
                <Form.Input
                    required={true}
                    label='Friend Email'
                    placeholder='Friend Email'
                    value={friend}
                    onChange={(e) => {
                        setFriend(e.target.value)
                    }}
                />
                {isFriendShown && <Form.Button color='green' type='submit' size='tiny'>Add</Form.Button>}
            </Form>
        );
    }

    const panes = [
        {
            menuItem: 'Dashboard',
            render: () =>
                <Tab.Pane active={isAuth}>
                    <Container>
                        <Grid columns={1}>
                            <Grid.Column>

                                {isFriendShown && <Segment>{FriendBox()}</Segment>}
                            </Grid.Column>
                            <Grid.Column>
                                <Header textAlign={"right"}>
                                    <Button negative onClick={handleClickLogoutShow}>Sign Out</Button>
                                </Header>

                                {/* 👇️ show component on click */}
                                {isLogoutShown && <LogoutBox />}

                            </Grid.Column>
                        </Grid>
                        <Header textAlign={"center"} size='huge'>Dashboard
                        </Header>

                        {/* 👇️ show component on click */}
                        {isShown && <Segment>{Box()}</Segment>}

                        <Divider/>
                    </Container>
                </Tab.Pane>
        },
        {
            menuItem: 'MediaList',
            render: () =>
                <Tab.Pane active={isAuth}>
                    <Container>
                        <Grid columns={3}>
                            <Grid.Column>
                                <Header textAlign={"left"}>
                                    <Button color='blue' onClick={handleClickShow}>
                                        Filter
                                    </Button>
                                </Header>
                                {isFriendShown && <Segment>{FriendBox()}</Segment>}

                            </Grid.Column>
                                <Grid.Column textAlign={"center"}>
                                <Form onSubmit={()=> {
                                    localStorage.setItem("search", search)
                                    window.location.reload(false)
                                }}>
                                    <Input
                                        action={{icon:'search'}}
                                        placeholder='search'
                                        onChange={(e)=> {
                                            setSearch(e.target.value)
                                        }}
                                    />
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <Header textAlign={"right"}>
                                    <Button negative onClick={handleClickLogoutShow}>Sign Out</Button>
                                </Header>


                                {/* 👇️ show component on click */}
                                {isLogoutShown && <LogoutBox />}
                            </Grid.Column>
                        </Grid>
                        <Header textAlign={"center"} size='huge'>MediaList
                        </Header>


                        {/* 👇️ show component on click */}
                        {isShown && <Segment>{Box()}</Segment>}

                        <Divider/>
                    </Container>
                </Tab.Pane>
        },
        {
            menuItem: 'Profile',
            render: () =>
                <Tab.Pane active={isAuth}>
                    <Container>
                        <Grid columns={2}>
                            <Grid.Column>
                                {isFriendShown && <Segment>{FriendBox()}</Segment>}
                            </Grid.Column>
                            <Grid.Column>
                                <Header textAlign={"right"}>
                                    <Button negative onClick={handleClickLogoutShow}>Sign Out</Button>
                                </Header>

                                {/* 👇️ show component on click */}
                                {isLogoutShown && <LogoutBox />}

                            </Grid.Column>
                        </Grid>
                        <Header textAlign={"center"} size='huge'>Profile
                        </Header>

                        {/* 👇️ show component on click */}
                        {isShown && <Segment>{Box()}</Segment>}

                        <Divider/>
                    </Container>
                </Tab.Pane>
        },
        {
            menuItem: 'Friend List',
            render: () =>
                <Tab.Pane active={isAuth}>
                    <Container>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Header textAlign={"left"}>
                                    <Button color='green' onClick={handleClickFriendShow}>Add Friend</Button>
                                </Header>
                                {isFriendShown && <Segment>{FriendBox()}</Segment>}
                            </Grid.Column>
                            <Grid.Column>
                                <Header textAlign={"right"}>
                                    <Button negative onClick={handleClickLogoutShow}>Sign Out</Button>
                                </Header>

                                {/* 👇️ show component on click */}
                                {isLogoutShown && <LogoutBox />}

                            </Grid.Column>
                        </Grid>
                        <Header textAlign={"center"} size='huge'>Friend List
                        </Header>

                        {/* 👇️ show component on click */}
                        {isShown && <Segment>{Box()}</Segment>}

                        <Divider/>
                    </Container>
                </Tab.Pane>
        },
        {
            menuItem: 'Settings',
            render: () =>
                <Tab.Pane active={isAuth}>
                    <Container>
                        <Grid columns={1}>
                            <Grid.Column>
                                <Header textAlign={"right"}>
                                    <Button negative onClick={handleClickLogoutShow}>Sign Out</Button>
                                </Header>

                                {/* 👇️ show component on click */}
                                {isLogoutShown && <LogoutBox />}

                            </Grid.Column>
                        </Grid>
                        <Header textAlign={"center"} size='huge'>Settings
                        </Header>
                    </Container>
                </Tab.Pane>
        },
    ]

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='left'
            panes={panes}
        />
    )

}
export default UserView;
