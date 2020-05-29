import React from 'react';
import Auth from './use-auth'; 

const Login = () => {
    const auth = Auth(); 
    return (
        <div>
            <h1>Login Area</h1>
            {   auth.user ? <button onClick={auth.signOut}>Sign Out</button> : 
                <button onClick={auth.signInWithGoogle}>Sign In with Google</button>
            }
        </div>
    );
};

export default Login;