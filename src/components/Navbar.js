import '../css/Navbar.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import faceIO from '@faceio/fiojs';

export default function Navbar(){

  let faceio;
  useEffect(() => {
    // eslint-disable-next-line
    faceio = new faceIO("fioa49e3");
}, []);

  const [isLoggedIn, setisLoggedIn] = useState(null);
  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });
      console.log(`${response.user}`)
      setisLoggedIn(true)
      
    } catch (error) {
      console.log(error);
    }
  };

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

 const handleLogOut = () => {
   setisLoggedIn(false);
 };

 useEffect(() => {
  localStorage.setItem('state', JSON.stringify(isLoggedIn));
}, [isLoggedIn]);

    return(
      <nav className="flex align-center">
        <p>
        <span>FaceLogin</span>
        </p>
      <ul className='main-nav'> 
        <li className="big-screens">
          <Link to='/' style={{ padding: "10px" }}>Home</Link>
          <Link to='/about' style={{ padding: "10px" }}>About</Link>
          <Link to='/blog' style={{ padding: "10px" }}>Blog</Link>
          {isLoggedIn ? (
       <button className='btn signout' onClick={handleLogOut}>SignOut</button>
     ) : (<>
      <button className="btn login" onClick={handleLogIn}>Login</button>        
      <button className='btn signin' onClick={handleSignIn}>Signin</button>
      </>
     )} 
        </li>    
      </ul>
    </nav>
    )
  }
