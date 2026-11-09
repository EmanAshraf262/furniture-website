
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
const [email,setEmail]=useState("");
const[password,setPassword]=useState("");

const [message,setMessage]=useState('');
const [messageType,setMessageType]=useState('');
const navigate =useNavigate();

 const sendData=async (e)=>{
    e.preventDefault();
const user={
 email:email,
  pass:password,
}
  
const response= await fetch('http://localhost:3000/api/v1/user/login',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(user)
});

const result = await response.json();
// console.log(result);

if(result.status){
  setMessage("user logged in!!");
  setMessageType('success')

  sessionStorage.setItem('loginData',"true");
   sessionStorage.setItem('userID',result.user.id);
  //  is session storage ma token save krwana ha 
sessionStorage.setItem('token',result.token);  

  // navigate("/product");
  window.location.href='/product';

}else{
  setMessage(result.message);
  setMessageType('error')
}

  };
  return (
    <div className="page-bg">
      <div className="log-container">
        <h3>Login Form</h3>
<div className= {messageType=="success" ? "text-success":"text-danger"}>{message}</div>

        <form onSubmit={sendData}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" 
              onChange={(e)=>(setEmail(e.target.value))}
            value={email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password"
          onChange={(e)=>(setPassword(e.target.value))}
            value={password}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;





