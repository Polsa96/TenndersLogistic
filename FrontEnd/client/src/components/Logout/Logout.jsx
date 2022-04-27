import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/context/JwtContext";
import './Logout.scss'


export default function LogOut () {
    const {jwt, setJwt} = useContext(JwtContext);
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('transportcompany');
        localStorage.removeItem('goodscompany');
        setJwt(null);
        navigate("/");
    }

    return (
        
        <p className="logout" onClick={signOut}>Cerrar sesión</p>
    )
}