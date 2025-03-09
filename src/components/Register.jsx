import React,{useState} from 'react';
import './Register.css';
import axios from 'axios';
import { Navigate } from 'react-router';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSign,setIsSign]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1000/signup', user);
      setUser({
        usernamee: '',
        email: '',
        password: '',
      });
      setIsSign(true)
    } catch (err) {
      console.log(err);
    }
  };

  if(isSign){
    return <Navigate to='/'/>
  }

  return (
    <div>
    <div className='register'>
    <form className="form" onSubmit={submitHandler}>
      <div className='name'>NAME:</div>
      <div>
        <input className='nameinput' type='text' name='username' value={user.username} onChange={handleChange} />
      </div>
      <div className='branch'>EMAIL:</div>
      <div>
        <input className='branchinput' type='text' name='email' value={user.email} onChange={handleChange} />
      </div>
      <div className='age'>PASSWORD:</div>
      <div>
        <input className='ageinput' type='text' name='password' value={user.password} onChange={handleChange} />
      </div>
      <button className='btnf' type='submit'>Submit</button>
    </form>
    </div>
  </div>
  )
}

export default Register;
