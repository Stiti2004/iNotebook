import React, { useContext } from 'react';
import noteContext from '../Context/Notes/NoteContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLink from './CustomLink';

export default function Navbar() {
    let location = useLocation();

    const context = useContext(noteContext);
    const { setUserAuthToken } = context;

    const navigate = useNavigate();

    const handleLogout = () => {
        setUserAuthToken(null);
        localStorage.removeItem('authToken');
        navigate("/", { replace: true });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#F875AA" }}>
                <div className="container-fluid">
                    <h4 className="mx-2" >iNotebook</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === '/home')? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === '/about')? "active" : ""}`} to="/about">About</Link>
                            </li> */}
                            <li className="nav-item">
                                <CustomLink className={`nav-link ${(location.pathname === '/home') ? "active" : ""}`} aria-current="page" to="/home">
                                    Home
                                </CustomLink>
                            </li>
                            <li className="nav-item">
                                <CustomLink className={`nav-link ${(location.pathname === '/about') ? "active" : ""}`} to="/about">
                                    About
                                </CustomLink>
                            </li>
                        </ul>
                        <button type="button" class="btn mx-3" style={{ backgroundColor: "black", color: "white" }} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
