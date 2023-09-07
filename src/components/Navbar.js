import React ,{ useEffect, useState } from "react";
import faceIO from '@faceio/fiojs';
import {setUserSession,removeUserSession} from '../utils/common';

export default function Navbar(){
let faceio;
const [authState,setAuthState]=useState(false);

useEffect(() => {
    faceio = new faceIO("fioa49e3");
}, []);

const handleSignIn = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          
        },
      });
  
      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });
      console.log(`${response.user}`)
      setUserSession(response.data.token, response.data.user);
      setAuthState(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () =>{
    removeUserSession();
    setAuthState(false);
  }

  return(
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            FaceLogin
            <i className="fas fa-code"></i>
          </a>

          <ul className="nav-menu">
          <li className="nav-item">
              <a
                href="/"
                className="nav-links"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="*"
                className="nav-links"
              >
                About
              </a>
            </li>
                {authState?
                (<li className="nav-item">
                <a
                  href="*"
                  className="nav-links"
                  onClick={handleLogOut}
                >
                  LogOut
                </a>
                </li>)
                :
                (<><li className="nav-item">
                <a
                    href="*"
                    className="nav-links"
                    onClick={handleLogIn}
                >
                    LogIn
                </a>
                </li>
                <li className="nav-item">
                <a
                    href="*"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleSignIn}
                >
                    SignIn
                </a>
                </li></>)}               
          </ul>
        </div>
      </nav>
    </>
  )
}