import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
  


function Register(){
    const navigate = useNavigate();

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const submitRegister = async(e) =>{
            e.preventDefault();
            let data = {
                "name": name,
                "email": email,
                "password": password
            }
            var result = await fetch('/register', {
                method:'post',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            
            const returnData = await result.json();
            
            if(returnData.message === "User Created Successfully"){
                navigate("/plan")
            }
            else{
                alert("Registration failed, Please try again");
            }
             
        }

    return (
        <main className="form-signin w-100 m-auto">
            <form className="form" method="POST">
                <h1 className="h3 mb-3 fw-normal">Create account</h1>

                <div className="form-floating">
                <label className="labels" htmlFor="floatingInput">Name</label>
                <input required className="inputs" value={name} name="name" type="name" className="form-control" id="floatingName" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-floating">
                <label className="labels" htmlFor="floatingInput">Email address</label>
                <input required className="inputs" value={email} name="email" type="email" className="form-control" id="floatingInput" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-floating">
                <label className="labels" htmlFor="floatingPassword">Password</label>
                <input required className="inputs" value={password} name="password" type="password" className="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit" onClick={submitRegister}>Sign in</button>
            <span>Already register?  <Link to="/login"> Login</Link></span>
            </form>
        </main>
    );
}

export default Register;