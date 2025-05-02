import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Navbar2() {

  const Navigate = useNavigate();

  const handleLog = () => {
    Navigate("/login",{ replace: true });
  }

  const handleSign = () => {
    Navigate("/signup",{ replace: true });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{backgroundColor: "#F875AA"}}>
                <div className="container-fluid">
                    <h4 className="mx-2" >iNotebook</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <button type="button" class="btn mx-3" style={{backgroundColor: "black", color: "white"}} onClick={handleLog}>Login</button>
                    <button type="button" class="btn mx-1" style={{backgroundColor: "black", color: "white"}} onClick={handleSign}>SignUp</button>
                </div>
            </nav>
    </div>
  )
}
