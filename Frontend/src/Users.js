import React, {Component, useState, useEffect} from 'react';
import {
    Button, Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta, Container,
    Divider, Dropdown, Header, Image, Label, List, Modal, Segment, SegmentGroup, Tab, Table
} from "semantic-ui-react";
import axios from "axios";

function Users() {
    //const [users, setUsers] = useState([])
    const [entradas, setentradas] = useState([])
    const [token, setToken] = useState(localStorage.getItem("UserID"));
    //const [entryCompany, setEntryCompany] = useState()

    function getUser() {
        axios.get("http://127.0.0.1:5000/getUserInfoByID"+token).then((response) => {
            setentradas(response.data)
            //setentries(JSON.parse(JSON.stringify(response.data)))
            //setEntryCompany(entries[0].MediaCompany)
        }, (error) => {
            console.log(error)
        });

    }
    /*const map = entradas.map(value => {
        let username =
        return(
            username = value.UserUsername,
                userfirstname = value,
                userlastname,
                useremailadress)
    }
    */

    getUser()
    return (
        <Container>
            <List items={1}>
                {entradas.map(value => {
                    return <Card>
                        <Card.Content>
                            <Card.Header>{value.UserUsername}</Card.Header>
                            <Card.Meta>
                                <Image icon={"avatar icon"} className="visible content" size={"large"}></Image>
                                <Label>Type: {value.UserFirstName}</Label>
                            </Card.Meta>
                            <Label>
                                Category: {value.UserEmailAddress}
                            </Label>
                        </Card.Content>
                    </Card>})}
            </List>
        </Container>
    )
}

export default Users;