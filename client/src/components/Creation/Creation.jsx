import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions/index";
import { form, btn1, all, inpVal, img, inpName, flex, inpCheck, btnCancel } from "./Creation.module.css"
import Loader from "../Loader/Loader"; 


//---------- VALIDACION DEL FORMULARIO ---------- 
function validateForm(input) {
    let errors = {};
    // Name
    if (!input.name) {
        errors.name = "*You must type a name";
    } else if (input.name.length > 25) {
        errors.name = "*25 characters max";
    } else {
        errors.name = "";
    }
    //Height
    if (!(parseInt(input.height) <= 100 && parseInt(input.height) > 1)) {
        errors.height = "*Height must be between 0 and 10 meters";
    } else {
        errors.height = "";
    }
    //HP
    if (!(parseInt(input.hp) >= 1 && parseInt(input.hp) < 100)) {
        errors.hp ="Poner hp correcto";

    }else{
        errors.hp="";
    }

    return errors;
}
//----------------------------------------------


export default function Creation() {

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const type = useSelector((state) => state.types)

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        img: "",
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        type: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validateForm({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleSelect(e) {
        setInput({
            ...input,
            type: [...input.type, e.target.value],
        });
    }

    // function handleDelete(el) {
    //     setInput({
    //         ...input,
    //         type: input.type.filter((type) => type !== el),
    //     });
    // }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !errors.name &&
            !errors.hp 
            // !errors.height 
        ) {
            alert("Your pokemon has been created successfully");
            dispatch(postPokemon(input));
            setInput({
                name: "",
                img: "",
                hp: null,
                attack: null,
                defense: null,
                speed: null,
                height: null,
                weight: null,
                type: [],
            });
        } else {
            return alert("Something went wrong. Please try again.");
        }
        navigate("/home");
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <>

            {!type.length ? <Loader /> :
                <div className={all} >
                    <h1>Create your Pokemon</h1>

                    <div className={form}>
                        <form onSubmit={(e) => handleSubmit(e)}>

                            <div className={inpName} >
                                <input
                                    type="text"
                                    value={input.name}
                                    name="name"
                                    placeholder="Pokemon name"
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                                <div>
                                    <p>{errors.name}</p>
                                </div>
                            </div>


                            <div className={inpName}>
                                <input
                                    type="url"
                                    value={input.img}
                                    name="img"
                                    placeholder="Image"
                                    onChange={(e) => handleChange(e)}
                                />
                                <div>
                                    {/* <p>{errors.img}</p> */}
                                    {input.img ?
                                        <img src={input.img} alt="pokemon" className={img} /> :
                                        null
                                    }
                                </div>
                            </div>


                            <div className={inpVal}>
                                <h3>Hp {input.hp}</h3>

                                <input
                                    type="range"
                                    value={input.hp}
                                    min="1"
                                    max="100"
                                    name="hp"
                                    onChange={(e) => handleChange(e)}

                                />
                                <div>
                                    <p>{errors.hp}</p>
                                </div>
                            </div>
                            <div className={inpVal}>
                                <h3>Attack {input.attack}</h3>
                                <input
                                    type="range"
                                    value={input.attack}
                                    min="1"
                                    max="100"
                                    name="attack"
                                    onChange={(e) => handleChange(e)}

                                />
                            </div>
                            <div className={inpVal}>
                                <h3>Defense {input.defense}</h3>
                                <input
                                    type="range"
                                    value={input.defense}
                                    min="1"
                                    max="100"
                                    name="defense"
                                    onChange={(e) => handleChange(e)}

                                />
                            </div>







                            <div className={inpVal}>
                                <h3>Speed {input.speed}</h3>
                                <input
                                    type="range"
                                    value={input.speed}
                                    min="1"
                                    max="100"
                                    name="speed"
                                    onChange={(e) => handleChange(e)}

                                />
                            </div>

                            <div className={inpVal}>
                                <h3>Height {input.height / 10} m</h3>
                                <input
                                    type="range"
                                    value={input.height}
                                    min="1"
                                    max="100"
                                    name="height"
                                    step="1"
                                    onChange={(e) => handleChange(e)}

                                />
                            </div>

                            <div className={inpVal}>
                                <h3>Weight {input.weight / 10} kg</h3>
                                <input
                                    type="range"
                                    value={input.weight}
                                    min="1"
                                    max="5000"
                                    step="10"
                                    name="weight"
                                    onChange={(e) => handleChange(e)}

                                />
                            </div>


                            <div className={inpCheck}>
                                <h3>Type</h3>
                                {type.length > 0 ? type.map((t) => {
                                    return (
                                        <div style={{ "width": "200px", "display": "inline-block" }} >
                                            <div className={flex} >
                                                <input type="checkbox" value={t} name={t} onChange={(e) => handleSelect(e)} />
                                                <p for={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</p>
                                            </div>
                                        </div>
                                    );
                                }) : null
                                }
                                {/* <div>
                            <h4>You have selected that:</h4>
                            {input.type.map((el) => (
                                <div key={el}>
                                    <p>{el}</p>
                                    <button onClick={() => handleDelete(el)}>x</button>
                                </div>
                            ))}
                        </div> */}
                            </div>



                            <div className={flex} style={{ "marginTop": "80px", "marginBottom": "100px" }}>
                                <div>
                                    <button type="submit" className={btn1} >
                                        CREATE
                                    </button>
                                </div>
                                <Link to="/home">
                                    <button className={btnCancel} >CANCEL</button>
                                </Link >
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}
