// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
export const auth = getAuth(app);
const storage = getStorage(app);

//function to upload a file
export async function uploadFile(file) {
  try{
    //ref pide 2 parametros, storage es la variable que donde se guarda la instancia de firebase y el segundo parametro es el nombre de la ruta donde se va a guardar el archivo
    const storageRef = ref(storage, `images/${file.name}`);
    //uploadBytes es para subir el archivo a firebase
    const snapshot = await uploadBytes(storageRef, file);
    //getDownloadURL es para obtener la url del archivo que se subio
    const url= await getDownloadURL(snapshot.ref);

    return url;

  }catch(error){
    console.log(error.code)
    console.log(error.message)
    return null;
  }
}