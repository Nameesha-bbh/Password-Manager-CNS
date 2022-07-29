import React, {useState, useEffect} from 'react'
import './ShowAllPassword.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
const cryptoJS = require("crypto-js");

function ShowAllPassword() {
  const id = useSelector(state => state.id)
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [state, setState] = useState(false)



  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:7000/api/getPasswords/${id}`,
    })
        .then(passwordArray =>   {
              setPasswordList(passwordArray.data.data)
        })
        .catch(err => {
          alert(err)
        })
  }, [state])

  function addPassword(e) {
      e.preventDefault();

      const cryptoJS = require("crypto-js");
      const encryptedPassword = cryptoJS.AES.encrypt(password, process.env.REACT_APP_PASSKEY).toString();
      const body = {
          url: url,
          password: encryptedPassword,
          id: id
          
      }

      axios({
        method: 'post',
        url: 'http://localhost:7000/api/addPassword',
        data: body
        
        }).then((res) => {
            alert("Password added successfully")
            setState(!state)
            setPassword("")
            setUrl("")
        })
        .catch((res) => {
          alert("Error. Try again.")
        })

  }

  const decryptPassword = (password) => {
    let decryptedPassword = cryptoJS.AES.decrypt(password, process.env.REACT_APP_PASSKEY).toString(cryptoJS.enc.Utf8);
    navigator.clipboard.writeText(decryptedPassword);
    alert("Password copied to clipboard")
  }

  return (
    <div className="main">
        <div className="AddingPassword">
              <input
                type="text"
                placeholder="Enter the URL of the website"
                required="true"
                onChange={(event) => {
                    setUrl(event.target.value)
                }}
                value={url}
              />

              <input
                type="password"
                placeholder="Enter the password"
                required="true"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                value={password}
              />
              
              <button onClick={addPassword}>Add Password</button>
            
        </div>

        <div className="Passwords">
        {passwordList.map((val) => {
          return (
            <div
              className="password"
              key={val._id}
              onClick={() => decryptPassword(val.password)}
            >
                <h3>{val.url}</h3>
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default ShowAllPassword