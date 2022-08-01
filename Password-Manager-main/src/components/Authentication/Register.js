import React, {useState} from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom'
import dotenv from 'dotenv'
import axios from 'axios';

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(password != confirmPassword){
      alert("The passwords didn't match. Try again.")
    }
    else if(!password.match(passw)){
        alert("The password's length must be between 7-15 characters and it must contain characters, numbers, special characters")
    }
    else{

    
    const cryptoJS = require("crypto-js");
    const encryptedPassword = cryptoJS.AES.encrypt(password, process.env.REACT_APP_KEY).toString();

    const body = {
      email: email,
      password: encryptedPassword
    }
    axios({
        method: 'post',
        url: 'http://localhost:7000/api/register',
        data: body
        
    }).then(() => {
      navigate('/login');
    })
    .catch(() => {
      alert("Something went wrong. Try again later")
    })
  }
  }

  return (
    <div>
          <div className="login-form">

              <form onSubmit={register}>

                <h1>Register</h1>
                <div className="content">
                  <div className="input-field">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required="true"
                        onChange={(event) =>{
                          setEmail(event.target.value)
                        }}
                    />
                  </div>
                  <div className="input-field">
                    <input 
                        type="password" 
                        placeholder="Password"
                        required="true"
                        onChange={(event) =>{
                          setPassword(event.target.value)
                        }} 
                    />
                  </div>
                  <div className="input-field">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        required="true"
                        onChange={(event) =>{
                          setConfirmPassword(event.target.value)
                        }}
                    />
                  </div>
                </div>
                <div className="action">
                  <button>Register</button>
                  <button onClick={() => navigate('/login')}>Sign in</button>
                </div>

              </form>

        </div>
    </div>
  )
}

export default Register