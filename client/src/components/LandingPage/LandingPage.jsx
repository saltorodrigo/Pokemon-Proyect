import React from "react";
import { useNavigate} from 'react-router-dom';
import {style} from "./LandingPage.module.css"
import logo from "../../assets/logoPokemon.png"

function LandingPage(){

    const navigate = useNavigate()

    return(
        <div className={style}>
            <img src={logo} alt="logo" ></img>
            <button onClick={()=>navigate("/home")}>ENTER</button>
        </div>
    )
}

export default LandingPage  