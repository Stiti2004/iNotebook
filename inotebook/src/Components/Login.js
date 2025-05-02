import React, {useState, useContext} from 'react'
import Navbar3 from './Navbar3';
import noteContext from '../Context/Notes/NoteContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const context = useContext(noteContext);
    const {setUserAuthToken} = context;

    const navigate = useNavigate();

    const [user, setUser] = useState({name: "", email: "", password: ""});

    const host = "http://localhost:5000";

    const handleChange = (obj) => {
        setUser({...user, [obj.target.name]: obj.target.value});
    }

    const handleLogin = async (obj) => {
        obj.preventDefault();
        const url = `${host}/api/auth/login`;
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
            msg.innerText = "Incorrect credentials!";
            setTimeout(() => {
                msg.innerText = "";
            }, 3000);
        }
        else {
            setUserAuthToken(json.token);
            localStorage.setItem('authToken', json.token);
            navigate("/home",{ replace: true });
        }
    }

    return (
        <>
        <Navbar3/>
        <div className='my-5' >
            <form className='container ' style={{ backgroundColor: "#FFF6F6", borderRadius: "1rem" }} onSubmit={handleLogin}>
                <div class="mb-3">
                    <label htmlFor="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" value={user.name} onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleChange}/>
                </div>
                <div id="msg" style={{color: "red", fontSize: "1rem"}}></div>
                <div className='container text-center'>
                    <button type="submit" className="btn btn-success my-2" >Login</button>
                </div>
            </form>
        </div>
        </>
    )
}
