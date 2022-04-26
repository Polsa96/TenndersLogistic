import React, {useContext, useState} from 'react'
import {NavLink} from 'react-router-dom';
import { JwtContext } from '../../shared/context/JwtContext';
import './Navbar.scss'

const Navbar = () => {

  const { jwt, setJwt } = useContext(JwtContext);

  const [isBurgerCross, setBurgerCross] = useState(false);

  const toggleBurguer = () =>{
    setBurgerCross(!isBurgerCross);
    console.log(isBurgerCross)
  }


  

  return (
    <nav className="navbar">
    <div className="navbar--home"><NavLink to="/"><img src="./images/TenndersNameLogo.png" alt="logo"/></NavLink></div>
    <div className="navbar--sites">
    {jwt===null ?
     <>
      <NavLink className={isBurgerCross ? "" : "change"} to="/about">About us</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/logistics">Logistics</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/contact">Contact us</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/register">Sign up</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/login">Log in</NavLink>
     </>
      : 
      <>
      <NavLink className={isBurgerCross ? "" : "change"} to="/about">About us</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/logistics">Logistics</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/contact">Contact us</NavLink>
      <NavLink className={isBurgerCross ? "" : "change"} to="/main">Main Page</NavLink>
      </>}
    </div>
    <button className={isBurgerCross ? "navbar--button change" : "navbar--button"} onClick={toggleBurguer}>
      <div className="navbar--button--burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
      </div>
    </button>
    </nav>

    
  )
}

export default Navbar