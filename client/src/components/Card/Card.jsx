import React from "react";
import { card, image, title, contType, ind } from "./Card.module.css"
import { Link } from 'react-router-dom';

export default function Card({ name, img, id, types }) {
    
    return (
        <Link to={'/pokemons/' + id}>
            <div className={card} >
                <img src={img} alt="comida" className={image} />
                <div className={title}>
                    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                </div>
                <div >
                    <h4 style={{ "color": "#eb5e28" }}>Types:</h4>
                    <div className={contType}>
                        {types.map((e) => {
                            return <div className={ind}  >{e.charAt(0).toUpperCase() + e.slice(1)}</div>
                        })}
                    </div>
                </div>
            </div>
        </Link>
    )
}

