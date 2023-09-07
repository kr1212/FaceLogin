import React ,{ useEffect, useState } from "react";
import faceIO from '@faceio/fiojs';
import '../css/Navbar.css';

export default function Navbar(){
let faceio;
const [authState, setAuthState] = useState(true);


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
      Enrollment Date: ${response.timestamp}}`);
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
      setAuthState(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    setAuthState(false)
  }
  if(authState){
    return(
      <nav className="flex align-center">
        <p>
        <span>FaceLogin</span>
        </p>
      <ul className='main-nav'> 
        <li className="big-screens">
          <p>
            Blog
          </p>
        
          <button className="btn login" onClick={handleLogIn}>
          Login
        </button>
        
          <button className='btn signin' onClick={handleSignIn}>Signin</button>  
        </li>    
      </ul>
    </nav>
    )
  }
  else{
    return(
      <nav className="flex align-center">
        <p>
        <span>FaceLogin</span>
        </p>
      <ul className='main-nav'> 
        <li className="big-screens">
          <p>
            Blog
          </p>        
          <button className='btn signout' onClick={handleSignOut}>SignOut</button>  
        </li>    
      </ul>
    </nav>    
    )
  }
}