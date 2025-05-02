import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomLink = ({ to, children, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e) => {
        e.preventDefault();
        if (location.pathname !== to) {
            navigate(to, { replace: true });
        }
    };

    return (
        <a href={to} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};

export default CustomLink;
