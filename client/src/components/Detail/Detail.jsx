import React from "react";
import { useParams} from 'react-router-dom';
import { contCards, contImg, contInfo, contStats, contBtn } from "./Detail.module.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemon } from "../../redux/actions"; 
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom"; 



export default function Detail() {

    let { id } = useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let idPokemon = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(getPokemon(id));
    }, [dispatch,id]);

    let pok = idPokemon && idPokemon?.name?.charAt(0).toUpperCase() + idPokemon?.name?.slice(1)
    let idNum = idPokemon && idPokemon?.id
    let hei = idPokemon && idPokemon?.height / 10
    let wei = idPokemon && idPokemon?.weight / 10

    return (
        <>

            {!idPokemon?.name ? <Loader /> :


                <div>
                    <div className={contCards}>
                        <div className={contImg} >
                            <img src={idPokemon && idPokemon.img} alt="pokemon" />
                            <h1>{`${pok} n° ${idNum}`}</h1>
                        </div>

                        <div className={contInfo}>

                            <h2>Stats</h2>
                            <div className={contStats}>
                                <div >
                                    <h3>HP</h3>
                                    <p> {idPokemon && idPokemon?.hp}</p>
                                </div>
                                <div>
                                    <h3>ATT</h3>
                                    <p> {idPokemon && idPokemon?.attack}</p>
                                </div>
                                <div>
                                    <h3>DEF</h3>
                                    <p> {idPokemon && idPokemon?.defense}</p>
                                </div>
                                <div>
                                    <h3>SPD</h3>
                                    <p> {idPokemon && idPokemon?.speed}</p>
                                </div>
                            </div>

                            <h2>Type</h2>
                            <div>
                                {idPokemon && idPokemon?.types?.map((e) => { 
                                    return <p>{e.charAt(0).toUpperCase() + e.slice(1)}</p>
                                })}
                            </div>

                            <h2 style={{ "marginTop": "40px" }}>Height</h2>
                            <p>{`${hei} m`}</p>

                            <h2>Weight</h2>
                            <p>{`${wei} kg`}</p>
                        </div>
                    </div>


                    <div className={contBtn}>
                        <div >
                            <button style={{ "marginLeft": "350px" }} onClick={() => navigate("/home")} >Home</button>
                        </div>
                        <div >
                            <button onClick={() => navigate("/creation")}>Create pokemon</button >
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
