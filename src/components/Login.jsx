import React, { useState } from 'react';
import axios from 'axios'; 
import './Login.css';
import { Navigate } from 'react-router';

const Login = () => {
  const [loguser, setLoguser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoggedin,setisLoggedin]=useState(false);
  const [issignup,setsignup]=useState(false);

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/login', loguser);
      const { token,user} = response.data; 
      if (token) {
        localStorage.setItem("token", token); 
        localStorage.setItem("userId",user)
        console.log(user,token)
        alert("Login successful!");
      } else {
        alert("Login failed: Token not received");
      }
      setisLoggedin(true)
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  const Changehandler = (e) => {
    const { name, value } = e.target;
    setLoguser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  if(isLoggedin){
    return <Navigate to='/'/>
  }


  return (
    <div className='login'>
      <form onSubmit={submithandler} className='formdiv'>
        <div className="logid">Username:</div>
        <div>
          <input 
            type="text" 
            className='idinput' 
            name='username' 
            value={loguser.username} 
            onChange={Changehandler} 
            placeholder="Enter your username"
          />
        </div>
        <div className="logname">Email:</div>
        <div>
          <input 
            type="email" 
            name="email" 
            className='nameinput' 
            value={loguser.email} 
            onChange={Changehandler} 
            placeholder="Enter your email"
          />
        </div>
        <div className="logpassword">Password:</div>
        <div>
          <input 
            type="password" 
            name="password" 
            className='passwordinput' 
            value={loguser.password} 
            onChange={Changehandler} 
            placeholder="Enter your password"
          />
        </div>
        <button className='btn' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Login;
