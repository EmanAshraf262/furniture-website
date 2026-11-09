import { useState } from "react";
import "./Register.css";


function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");


  const sendData=async (e)=>{
    e.preventDefault();
// console.log(email);
// console.log(address);
// console.log(phone);
// console.log(gender);
// console.log(password);

const user={
  email:email,
 name:name,
  passward:password,
   phone:phone,
   gender:gender,
   address:address
}

const response= await fetch('http://localhost:3000/api/v1/user/register',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'


  },
  body:JSON.stringify(user)
});

const result = await response.json();
console.log(result);



  };
  return (
    <div className="page-bg">
      <div className="reg-container">
        <h3>Registration Form</h3>
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name"
            onChange={(e)=>(setName(e.target.value))}
            value={name}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" 
            onChange={(e)=>(setEmail(e.target.value))}
            value={email}
            />

          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" placeholder="Enter phone number" 
            onChange={(e)=>(setPhone(e.target.value))}
            value={phone}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-control"
             onChange={(e)=>(setGender(e.target.value))}
            value={gender}
            
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter your address"
            
             onChange={(e)=>(setAddress(e.target.value))}
            value={address}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;