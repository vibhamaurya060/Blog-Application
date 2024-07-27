import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (onLogout) onLogout(); 
        navigate('/login'); 
    };

    return (
        <button onClick={handleLogout} className="btn btn-logout">
            Logout
        </button>
    );
};

export default Logout;
