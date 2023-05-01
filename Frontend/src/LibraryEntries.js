import React, {Component, useState, useEffect} from 'react';
import {
    Button, Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta, Container,
    Divider, Dropdown, Header, Image, Label, List, Modal, Segment, SegmentGroup, Tab, Table
} from "semantic-ui-react";
import axios from "axios";
import userView from "./UserView";
import {useNavigate} from "react-router-dom";

function LibraryEntries() {
    //const [entries, setentries] = useState([])
    const [entradas, setentradas] = useState([])
    //const [entryCompany, setEntryCompany] = useState()
    let uid= localStorage.getItem("UserID")

    function getEntries() {

        axios.get("http://127.0.0.1:5000/getAllEntriesByUser/"+ uid).then((response) => {


            setentradas(response.data)

            //setentries(JSON.parse(JSON.stringify(response.data)))
            //setEntryCompany(entries[0].MediaCompany)
            console.log(entradas)

        }, (error) => {
            console.log(error)
        });

    }
    // let eid= entradas[0].MediaID
    // let uid= localStorage.getItem("UserID")
    // function AddtoLibrary(uid,eid) {
    //     axios.post("https://onlineshopjys.herokuapp.com/JYS/WishList/add_delete/product-" + productid + "/user-" + uid)
    //         .then((res) => {
    //
    //             if(res.status===200){
    //                 setwishlist("Product added succesfully")
    //             }
    //
    //         }).catch(error=>{
    //         setwishlist("")
    //         if(error.response.status===409) {
    //             setwishlist("Product already in Wish List")
    //         }
    //         else{
    //
    //             setwishlist("Product Not Found")
    //         }
    //     })
    // }


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
                                <Label>Type: {value.MediaType}</Label>
                            </Card.Meta>
                            <Label>
                                Category: {value.MediaGenre}
                            </Label>
                            <CardDescription>

                            </CardDescription>
                        </Card.Content>

                    </Card>
                })}

            </List>


        </Container>


    )


}

export default LibraryEntries;