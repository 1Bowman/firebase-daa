import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DaaTracker from './DaaTracker'
import './index.css';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDK9MI2xyLYEFZ9rjeZqyeTvbkmdHh5vxg",
    authDomain: "daa-tracker-8f9a1.firebaseapp.com",
    databaseURL: "https://daa-tracker-8f9a1.firebaseio.com",
    projectId: "daa-tracker-8f9a1",
    storageBucket: "daa-tracker-8f9a1.appspot.com",
    messagingSenderId: "1034183920768"
  };
firebase.initializeApp(config)

// fb.on('value', snapshot => {
//     const store = snapshot.val();
//     ReactDOM.render(
//       <App {...store} />,
//       document.getElementById('root')
//     );
//   });

ReactDOM.render(
  <DaaTracker />,
  document.getElementById('root')
);
