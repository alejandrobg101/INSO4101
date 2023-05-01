import React, {Component, useState, useEffect} from 'react';
import {
    Button, Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta, Container,
    Divider, Dropdown, Header, Image, Label, List, Modal, Segment, SegmentGroup, Tab, Table
} from "semantic-ui-react";
import axios from "axios";
import userView from "./UserView";

function MediaEntries() {

    const [token, setToken] = useState(localStorage.getItem("UserID"));
    const [entradas, setentradas] = useState([])
    const[library, setLibrary] = useState([])

    //const [entryCompany, setEntryCompany] = useState()
    //const [entries, setentries] = useState([])

    function getEntries() {
        axios.get("http://127.0.0.1:5000/getAllMediaEntries").then((response) => {
            setentradas(response.data)
            //setentries(JSON.parse(JSON.stringify(response.data)))
            //setEntryCompany(entries[0].MediaCompany)

        }, (error) => {
            console.log(error)
        });

    }

    function addMediaToLibrary(mid){
        axios.put("http://127.0.0.1:5000/addMediaToLibrary/media-" + mid + "/user-" + token).then((response) =>{
            setLibrary(response.data)

        }, (error)=>{
            console.log(error)
        });
    }




    getEntries()

    return (
        <Container>
            <List items={50}>
                {entradas.map(value => {
                    return <Card>
                        <Card.Content>
                            <Card.Header>{value.MediaName}</Card.Header>
                            <Card.Meta>
                                <Image icon={"avatar icon"} className="visible content" size={"large"}></Image>
                                <Label>
                                    Type: {value.MediaType}

                                </Label>
                            </Card.Meta>
                            <Label>
                                Category: {value.MediaGenre}
                            </Label>
                            <div className="ui divider"></div>

                            <Button content='Add to Library' size='big' color='green' size= 'small'
                                    onClick={() => {addMediaToLibrary(value.MediaID)}}/>
                        </Card.Content>
                    </Card>})}
            </List>
        </Container>
    )
}
export default MediaEntries;