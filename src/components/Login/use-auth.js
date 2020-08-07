import React from 'react'; 
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config'
import { useState, createContext, useContext, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig); 

//private Route 
export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth(); 
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
//context 
const AuthContext = createContext();
export const AuthContextProvider = (props)=>{
    const auth = Auth(); 
    return <AuthContext.Provider value = {auth}>{props.children}</AuthContext.Provider>
} 

export const useAuth = ()=> useContext(AuthContext);

const getUser = user => {
    const {displayName, email, photoUrl} = user; 
    return {name: displayName, email, photo: photoUrl}
}   

//Sign In with Google
const Auth = ()=> {
    const [user, setUser] = useState(null); 
    const signInWithGoogle = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
         return firebase.auth().signInWithPopup(provider)
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
        return firebase.auth().signOut().then(function(){
            setUser(null); 
            return true; 
        })
        .catch(function(error) {
          return false;
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