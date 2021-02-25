import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import 'antd/dist/antd.css';
import Home from "./views/Home";
import firebase from "firebase/app";
import "firebase/auth";

require('dotenv').config()

firebase.auth().signInAnonymously()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Home />
      </React.StrictMode>,
      document.getElementById('root')
    );
  })
  .catch((error) => {
    console.log(error)
    // ReactDOM.render(
    //   <React.StrictMode>
    //     <Home />
    //   </React.StrictMode>,
    //   document.getElementById('root')
    // );
  })