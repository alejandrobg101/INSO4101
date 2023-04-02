

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import Login from "./Login";
import Dashboard from "./UserVIew";


const root = ReactDOM.createRoot( document.getElementById('root') );


root.render(
    <BrowserRouter>
        <Routes>

            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Login/>} />
            <Route exact path="/UserView" element={<Dashboard/>} />





        </Routes>
    </BrowserRouter>
);

