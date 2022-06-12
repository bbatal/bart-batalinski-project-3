// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAxguh4WlzdLrvpm0-kp3We0kZ9a-gP6VE",

  authDomain: "favbooks-2a8d8.firebaseapp.com",

  projectId: "favbooks-2a8d8",

  storageBucket: "favbooks-2a8d8.appspot.com",

  messagingSenderId: "346683281670",

  appId: "1:346683281670:web:b1bc58f8189e46f19d0e87"

};


// Initialize Firebase

const firebaseProject = initializeApp(firebaseConfig);

const auth = getAuth(firebaseProject);

export { firebaseProject, auth };