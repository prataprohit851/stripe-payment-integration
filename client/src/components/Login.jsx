import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import {useNavigate} from "react-router-dom"

function Login(){
    const navigate = useNavigate();

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const submitLogin = async(e) =>{
            e.preventDefault();
            let data = {
                "email": email,
                "password": password
            }
            var result = await fetch('/login', {
                method:'post',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            
            const returnData = await result.json();
            
            if(returnData.message === "Login Successful"){
                if(returnData.plan === 'no-plan'){
                    navigate("/plan")
                }
                else{
                    navigate('/');
                }
            }
            else{
                alert("Login failed, Please try again");
            }
             
        }

    return (
        <main className="form-signin w-100 m-auto">
            <form method="POST">
                <h1 className="h3 mb-3 fw-normal">Login to your account</h1>

                <div className="form-floating">
                <label htmlFor="floatingInput">Email address</label>
                <input required value={email} name="email" type="email" className="form-control" id="floatingInput" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-floating">
                <label htmlFor="floatingPassword">Password</label>
                <input required value={password} name="password" type="password" className="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit" onClick={submitLogin}>Sign in</button>
            </form>
            <span>New to MyApp? <Link to="/">Register</Link></span>
        </main>
    );
}


export default Login;