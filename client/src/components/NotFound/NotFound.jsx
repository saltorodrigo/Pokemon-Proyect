import React from "react";
import pika from "../../assets/pikachu404.png"
import {found} from "./NotFound.module.css"



export default function NotFound() {
    return (
        <div className={found}>
            <img src={pika} alt="404notfound" />
            <h1 >404, Pokemon not found</h1>
        </div>
    )
}
