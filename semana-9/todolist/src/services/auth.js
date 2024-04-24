import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

//function to create a user
export const createUser = async (email, password) => {
  try {
    //funcion de firebase para crear un usuario que es asincronica
    const authentication = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return authentication.user;
  } catch (error) {
    return null;
  }
};

//function to login a user
export const loginUser = async (email, password) => {
  try {
    //esta function se encarga de loguear al usuario si es que existe retorna el usuario
    const signin = await signInWithEmailAndPassword(auth, email, password);
    return signin.user;
  } catch (error) {
    return null;
  }
};

export function getCurrentUser() {
  //la promise sirve para que la funcion sea asincrona, se guarda la respuesta en una variable y se retorna, se utiliza ya que si no no se podria 
  //utilizar el awqit para esperar el user
  return new Promise((resolver, reject) => {
    const observer = onAuthStateChanged(auth, (user) => {
      if (user) {
        //el resolver es para retornar el usuario
        resolver(user);
      } else {
        //el reject es para retornar un null
        reject("User not found");
      }
    });

    return observer;
  });
}

//function to update the profile of the user
export async function updateProfileUser(name, photoURL) {
  try {
    const currentUser = auth.currentUser;
    //updateProfile es una funcion de firebase que actualiza el perfil del usuario
    const user = await updateProfile(currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    return null;
  }
}


//function to logout the user
export async function logoutUser() {
  try {
    //signOut es una funcion de firebase que se encarga de cerrar la sesion del usuario
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
}