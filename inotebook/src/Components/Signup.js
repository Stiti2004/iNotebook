import React, {useState} from 'react';
import Navbar3 from './Navbar3';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({name: "", email: "", password: ""});

    const host = "http://localhost:5000";

    const handleChange = (obj) => {
        setUser({...user, [obj.target.name]: obj.target.value});
    }

    const handleSignup = async (obj) => {
        obj.preventDefault();
        const url = `${host}/api/auth/createUser`;
        const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: user.name, email: user.email, password: user.password})
        })
        const json = await response.json();
        if(!json.success) {
            const msg = document.getElementById("msg");
            msg.innerText = "User already exists!";
            setTimeout(() => {
                msg.innerText = "";
            }, 3000);
        }
        else {
            navigate("/login", { replace: true });
        }
    }

    const handleDisable = () => {
        return (user.name.length < 3 || user.email.length === 0 || user.password.length === 0);
    } 

    return (
        <>
        <Navbar3/>
        <div className='my-5'>
            <form className='container ' style={{backgroundColor: "#FFF6F6", borderRadius: "1rem" }} onSubmit={handleSignup}>
                <div class="mb-3">
                    <label htmlFor="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" value={user.name} minLength={3} onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name="email" value={user.email} aria-describedby="emailHelp" onChange={handleChange}/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={user.password} minLength={5} onChange={handleChange}/>
                </div>
                <div id="msg" style={{color: "red", fontSize: "1rem"}}></div>
                <div className='container text-center'>
                <button type="submit" disabled={handleDisable()} className="btn btn-success my-2" >SignUp</button>
                </div>
            </form>
        </div>
        </>
    )
}
