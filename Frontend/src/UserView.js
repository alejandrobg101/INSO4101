import React, {Component, useState, useEffect} from 'react';
import {
    Button,
    Card,
    Container,
    Divider,
    Form,
    Grid, GridColumn,
    Header,
    Icon,
    Image, Input,
    Modal,
    Segment,
    Tab, TextArea
} from "semantic-ui-react";

import {useNavigate} from "react-router-dom";
import axios from "axios";
import MediaEntries from "./MediaEntries";


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


    const [profileInfo, setprofileInfo] = useState("")
    const [firstName, setfirstName] = useState()
    const [lastName, setlastName] = useState()
    const [userName, setuserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [bio, setBio] = useState()
    let uid = localStorage.getItem("UserID")
    console.log("Hello", uid)

    function getUserInfoByID() {
        axios.get("http://127.0.0.1:5000/getUserInfoByID"+ uid).then((response) => {
            //const u= JSON.stringify(response.data)
            const p= JSON.parse(JSON.stringify(response.data))

            setfirstName( p[0].UserFirstName)
            setlastName(p[0].UserLastName)
            setuserName(p[0].UserUsername)
            setEmail(p[0].UserEmailAddress)
            setPassword(p[0].UserPassword)
            setBio(p[0].UserBio)

            //user.UserLastName = profileInfo.UserLastName
            //user.UserUsername = profileInfo.UserUsername
            //user.email = profileInfo.UserEmailAddress
            //user.Password = profileInfo.UserPassword
            //user.UserBio = profileInfo.UserBio
        }, (error) => {
            console.log(error)
        });

    }


    // function assignProfileInfo() {
    // }


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
    const handleUpdateProfile = () => {
        navigation ('/login');
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


    function ProfileInfoForm(){
        getUserInfoByID();
        return(
            <Form>
                <Form.Input

                    label='First Name'
                    placeholder={'EnterFirstName'}
                    value={firstName}


                />
                <Form.Input

                    label='Last Name'
                    placeholder='Enter new last name'
                    value={lastName}

                />
                <Form.Input

                    label='User Name'
                    placeholder='Enter new username'
                    value={userName}

                />
                <Form.Input

                    label='User Email'
                    placeholder='Enter new email'
                    value={email}

                />
                <Form.Input

                    label='Password'
                    type='password'
                    placeholder='Enter new password'
                    value={password}

                />
                <Form.Input

                    label='User Bio'
                    placeholder='Enter new bio'
                    value={bio}

                />
                <Divider></Divider>


            </Form>

        )
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
                        <Grid columns={1}>


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
                        <GridColumn><MediaEntries/></GridColumn>
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
                    <Container>
                        <Header size='huge'>YOUR PROFILE </Header>
                        {ProfileInfoForm()}


                        <Button negative onClick={handleUpdateProfile}> Update Profile</Button>
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
