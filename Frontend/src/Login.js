import React, {Component, useState} from 'react';
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab, TextArea} from 'semantic-ui-react';
import axios from "axios";
import Dashboard from "./UserVIew";




function Login() {
  const [open, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(true);
  }

  const[openreg,setopenreg]=useState(false)
  const[regerror,setregerror]=useState(false)
  const[open2,setopen2]=useState(false)
  const[lusername,setlusername]= useState("");
  const[lpassword,setlpassword]=useState("");


  const[siname,setsiname]=useState("")
  const[silastname,setsilastname]=useState("")
  const[sibio,setsibio]=useState("")
  const[siemail,setsiemail]=useState("")
  const[siusername,setsiusername]=useState("")
  const[sipassword,setsipassword]=useState("")
  const[admin,setadmin]=useState("")
  const[data,setdata]=useState("");
  const[rdata,setrdata]=useState("")


  const Welcome= () =>{
    window.location.href="/UserView"//this is just a dummy page



  }

  function login(){
    axios.post('http://localhost:5000/login',{"username":lusername,"password":lpassword}).then((response)=>
    {
      setdata(response.data);


    })
    if(data==="User does not exist" || data===""){

      return true
    }
    localStorage.removeItem("login")
    localStorage.setItem("login", JSON.stringify(data.UId))
    localStorage.setItem("admin",JSON.stringify(data.Admin))
    console.log(localStorage.getItem("login"))
    return false


  }



  function registerUser(){
    axios.post("http://127.0.0.1:5000/register",{"ufirstname":siname,"ulastname":silastname,"uusername":siusername,"uemailaddress":siemail,"upassword":sipassword,"ubio": sibio,"ustatus":admin}).then((response)=>{
      setrdata(response.data)
      setopenreg(true)
      regisucces()
    },(error)=>{
      setregerror(true)
    })
  }

  function regisucces(){
    setsiname('')
    setsilastname('')
    setsiusername('')
    setsipassword('')
    setadmin('')
  }


  return (<Segment><Header dividing textAlign="center" size="huge">UEMT Tracker</Header>
        <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
          <Modal.Header>Needs changing!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Wrong Password or Username.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </Modal.Actions>
        </Modal>



        <Segment placeholder>

          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                    value={lusername}
                    onChange={e => setlusername(e.target.value)}
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    value={lpassword}
                    onChange={e => setlpassword(e.target.value)}
                />
                <Button content='Login' primary onClick={login()? handleChange:Welcome}/>
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Modal
                  onClose={() => setopen2(false)}
                  onOpen={() => setopen2(true)}
                  open={open2}
                  trigger={<Button>SignUp</Button>}
              >
                <Modal.Header>SignUp</Modal.Header>
                <Modal.Description>
                  <Header>Enter your Credentials</Header>
                  <Form>
                    <Form.Input

                        Position='center'
                        label='Firstname'
                        placeholder='Firstname'
                        value={siname}
                        onChange={(e) => setsiname(e.target.value)}
                    />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Lastname'
                        placeholder='Lastname'
                        value={silastname}
                        onChange={(e) => setsilastname(e.target.value)}
                    />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Username'
                        placeholder='Username'
                        value={siusername}
                        onChange={(e) => setsiusername(e.target.value)}
                    />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='email'
                        placeholder='email'
                        value={siemail}
                        onChange={(e) => setsiemail(e.target.value)}
                    />

                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        label='Password'
                        type='password'
                        value={sipassword}
                        onChange={(e) => setsipassword(e.target.value)}
                    />
                    <Form.Field
                        control={TextArea}
                        label='Bio'
                        placeholder='Tell us more about you...'
                        value={sibio}
                        onChange={(e) => setsibio(e.target.value)}

                    />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Bio'
                        placeholder='Enter a brief description'
                        value={sibio}
                        onChange={(e) => setsibio(e.target.value)}
                    />

                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Admin'
                        placeholder='If not admin leave in blank'
                        value={admin}
                        onChange= {(e) =>setadmin("false")}
                    />
                  </Form>
                </Modal.Description>
                <Modal.Content>
                  <Modal.Actions>
                    <Button content='Register' primary onClick={()=>{registerUser()}}/>
                  </Modal.Actions>
                </Modal.Content>
              </Modal>
              <Modal
                  centered={true}
                  open={openreg}
                  onClose={() => setopenreg(false)}
                  onOpen={() => setopenreg(true)}
                  size="tiny"
              >
                <Modal.Header>Success!</Modal.Header>
                <Modal.Content>
                  <Modal.Description>You have successfully registered on UEMT Tracker. Please log in now</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => {setopenreg(false);setopen2(false)}}>Continue</Button>
                </Modal.Actions>

              </Modal>

              <Modal
                  centered={true}
                  open={regerror}
                  onClose={() => setregerror(false)}
                  onOpen={() => setregerror(true)}
                  size="tiny"
              >
                <Modal.Header>Error!</Modal.Header>
                <Modal.Content>
                  <Modal.Description>There is an error with the registration. Please check credentials.</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setregerror(false)}>Continue</Button>
                </Modal.Actions>

              </Modal>
            </Grid.Column>
          </Grid>
          <Divider vertical>OR</Divider>


        </Segment>
      </Segment>
  )
}


export default Login;
