import React from "react";
import gif from "../../assets/gifLoad2.gif"
import {load} from "./Loader.module.css"



export default function Loader() {
    return (
        <div className={load}>
            <h1 >Loading...</h1>
            <img src={gif} alt="pokebola" />
        </div>
    )
}

