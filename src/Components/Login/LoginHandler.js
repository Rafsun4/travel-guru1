import React, { useContext, useState } from "react";
import LoginFbGoogle from "../LoginFbGoogle/LoginFbGoogle";
import "./Login.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import logo from '../../images/Logo.png';

const LoginHandler = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const [signOutUser, setSignOutUser] = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState({
        isSignedIn: false,
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleFormToggle = () => {
        setNewUser(!newUser);
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    /* GOOGLE Sign in */
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                const { displayName, email } = result.user;
                const newUser = {
                    isSignedIn: true,
                    email: email,
                    name: displayName,
                };
                setCurrentUser(newUser);

                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch(function (error) {
                const newUser = { ...currentUser };
                newUser.error = error.message;
                newUser.success = false;
                setLoggedInUser(newUser);
            });
    };

    /* FACEBOOK Sign in */
    const handleFacebookSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                const { displayName, email } = result.user;
                const newUser = {
                    isSignedIn: true,
                    email: email,
                    name: displayName,
                };
                setCurrentUser(newUser);

                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch(function (error) {
                const newUser = { ...currentUser };
                newUser.error = error.message;
                newUser.success = false;
                setLoggedInUser(newUser);
            });
    };

    /* Form validation and give error */
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    let pass1, pass2;
    const handleFormValidation = (e) => {
        let isFieldValid = true;
        const newError = { ...errors };

        if (e.target.name === "name") {
            isFieldValid = e.target.value.length > 2;
            if (!isFieldValid) {
                newError[e.target.name] = "Name is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+/.test(e.target.value);
            if (!isFieldValid) {
                newError[e.target.name] = "Email is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            const isPasswordLengthValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            isFieldValid = isPasswordLengthValid && passwordHasNumber;

            if (e.target.name === "password") {
                pass1 = e.target.value;
                if (!isFieldValid) {
                    newError[e.target.name] = "Password is not valid";
                    setErrors(newError);
                } else {
                    newError[e.target.name] = "";
                    setErrors(newError);
                }
            }
            if (e.target.name === "confirmPassword") {
                pass2 = e.target.value;
                if (!isFieldValid && pass1 !== pass2) {
                    newError[e.target.name] = "Password is not matched";
                    setErrors(newError);
                } else {
                    newError[e.target.name] = "";
                    setErrors(newError);
                }
            }
        }

        if (isFieldValid) {
            const newUser = { ...currentUser };
            newUser[e.target.name] = e.target.value;
            setCurrentUser(newUser);
            // console.log("is valid -> ", isFieldValid, currentUser);
        }
    };

    /* CREATE NEW USER */
    const handleCreateNewUser = (e) => {
        e.preventDefault();
        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.name = "Please use valid name!";
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            newError.confirmPassword = "Password does not matched!";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUser = {
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);
                    setLoggedInUser(newUser);
                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                });
        }
    };

    /* SIGN IN with email and password */
    const handleSignIn = (e) => {
        e.preventDefault();
        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUser = {
                        isSignedIn: true,
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);

                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                });
        }
    };

    const handleLoginRoute = () => {
        history.push("/user");
    };

    return (
        <section>
        <Container>
            <Navbar className="pr-5">
                <Link to="/home"><Navbar.Brand className="px-5">
                    <img src={logo} style={{height: '60px'}} alt="logo" />
                </Navbar.Brand></Link>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                <Nav className="ml-auto nav">
                    <Link className="mr-5 text-muted font-weight-bold " to="/news">News</Link>
                    <Link className="mr-5 text-muted font-weight-bold" to="/destination">Destination</Link>
                    <Link className="mr-5 text-muted font-weight-bold" to="/blog">Blog</Link>
                    <Link className="mr-5 text-muted font-weight-bold" to="/Contact">Contact</Link>
                    <Button onClick={handleLoginRoute} className="btn btn-sm btn-warning px-4 py-2 font-weight-bold">Login</Button>
                </Nav>
            </Navbar>
        </Container>
            <div className="container tg-signup-login text-center">
                {currentUser.success && (
                    <div className="alert alert-success" role="alert">
                        User {!newUser ? "logged in" : "registered"} successfully
                    </div>
                )}
                {loggedInUser.error && (
                    <div className="alert alert-danger" role="alert">
                        {loggedInUser.error}
                    </div>
                )}
                {
                    newUser ? 
                (
                    <SignupForm
                        toggleUser={handleFormToggle}
                        validation={handleFormValidation}
                        submit={handleCreateNewUser}
                        errors={errors}
                    ></SignupForm>
                ) 
                : 
                (
                    <LoginForm
                        toggleUser={handleFormToggle}
                        validation={handleFormValidation}
                        submit={handleSignIn}
                        errors={errors}
                    ></LoginForm>
                )}
                <LoginFbGoogle google={handleGoogleSignIn} facebook={handleFacebookSignIn}></LoginFbGoogle>
            </div>
        </section>
    );
};

export default LoginHandler;