import React from 'react';
import Auth from './use-auth'; 
import { Link } from 'react-router-dom';

const Login = () => {
    const auth = Auth(); 
    const handleSignIn = ()=> {
        auth.signInWithGoogle()
        .then (res => {
           window.location.pathname = '/review'; 
           console.log(res);
        })
       
    }
    const handleSignOut = ()=>{
        auth.signOut()
        .then (res => {
            window.location.pathname = '/'; 
        })
    }
    return (

        <div>
            <h1>Login Area</h1>
            {   auth.user ? <button onClick={handleSignOut}>Sign Out</button> 
            
            : 
                <button onClick={handleSignIn}>Sign In with Google</button>
            
            }
        </div>
    );
};

export default Login;