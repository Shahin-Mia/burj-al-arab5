import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [newUser, setNewUser] = useState(false);

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const { displayName, email } = result.user;
            const signInUser = { displayName, email };
            setLoggedInUser(signInUser);
            storeAuthToken();
        }).catch(function (error) {
            // Handle Errors here.
            console.log(error);
            // ...
        });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            })
            .catch(function (error) {
                // Handle error
            });
    }

    return (
        <>
            {newUser ? <SignUp newUser={newUser} setNewUser={setNewUser}></SignUp>
                : <SignIn newUser={newUser} setNewUser={setNewUser}></SignIn>}
            <div style={{ textAlign: 'center', margin: 50 }}>
                <Button
                    onClick={handleGoogleSignIn}
                    type="submit"
                    variant="contained"
                    color="secondary"
                >
                    Login with Google
                    </Button>
            </div>
        </>
    );
};

export default Login;