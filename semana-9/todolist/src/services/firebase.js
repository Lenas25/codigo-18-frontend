// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZP4KM65TmnKQ1fBlWRY-IE5JUKjtcaGE",
  authDomain: "todolist-react-6ae70.firebaseapp.com",
  projectId: "todolist-react-6ae70",
  storageBucket: "todolist-react-6ae70.appspot.com",
  messagingSenderId: "860644537350",
  appId: "1:860644537350:web:ed2d24e6fcc48f689a7f87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//function to create a user
export const createUser = async (email, password) => {
  try {
    //funcion de firebase para crear un usuario que es asincronica
    const authentication = await createUserWithEmailAndPassword(auth, email, password); 
    return authentication.user;
  } catch (error) {
    return null;
  }
};

//function to login a user
export const loginUser = async (email, password) => {
  try {
    const signin = await signInWithEmailAndPassword(auth, email, password);
    return signin.user;
  } catch (error) {
    return null;
  }
};