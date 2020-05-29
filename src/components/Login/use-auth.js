import React from 'react'; 
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config'
import { useState, createContext, useContext, useEffect } from "react";


firebase.initializeApp(firebaseConfig); 


//context 

const authContext = createContext();
export const authContextProvider = (props)=>{
    const auth = Auth(); 
    return <authContextProvider value = {auth}>{props.children}</authContextProvider>
} 

export const useAuth = ()=> useContext(authContext);

const getUser = user => {
    const {displayName, email, photoUrl} = user; 
    return {name: displayName, email, photo: photoUrl}
}   

//Sign In with Google
const Auth = ()=> {
    const [user, setUser] = useState(null); 
    const signInWithGoogle = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then (res => {
            const signInUser = getUser(res.user); 
            setUser(signInUser); 
            return res.user; 
        })
        .catch (err=>{
            setUser(null);
            return err.message; 
        })
    }
    //Sign Out
    const signOut = ()=>{
        firebase.auth().signOut().then(function(){
            setUser(null); 
        })
        .catch(function(error) {
          });
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(usr){
            if(usr){
                const currentUser = getUser(usr); 
                setUser(currentUser); 
            }
        })
    }, [])
    return {
        user, 
        signInWithGoogle, 
        signOut
    }
}

export default Auth; 