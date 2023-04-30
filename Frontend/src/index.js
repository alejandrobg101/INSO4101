import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import Login from "./Login";
import Dashboard from "./UserView";
import SignUp from "./SignUp";
import MediaEntries from "./MediaEntries";



const root = ReactDOM.createRoot( document.getElementById('root') );


root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<SignUp/>} />
            <Route exact path="/SignUp" element={<SignUp/>} />
            <Route exact path="/UserView" element={<Dashboard/>} />
            <Route exact path="/Entries" element={<MediaEntries/>} />

        </Routes>
    </BrowserRouter>
);

