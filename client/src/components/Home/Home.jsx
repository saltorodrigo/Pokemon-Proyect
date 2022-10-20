import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterCreated, getNamePokemon, orderAlphabetic, getTypes, filterByTypes, orderAttack } from "../../redux/actions";
import { nav, pokeLogo, search, select, btn, all, container, filters, typesF } from "./Home.module.css"
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import Loader from "../Loader/Loader";
import logo from "../../assets/logoPokemon2.png"
import NotFound from "../NotFound/NotFound";


export default function Home() {

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types)
    const allErrors = useSelector((state) => state.error)

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    //Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const iOfLastPokemon = currentPage * pokemonsPerPage
    const iOfFirstPokemon = iOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(iOfFirstPokemon, iOfLastPokemon)
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    console.log(setPokemonsPerPage)

    //Filtrado por Db 
    function handleFilterDb(e) {
        e.preventDefault()
        dispatch(getPokemons())
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    //Filtrado por tipo
    const [ftypes, setFtypes] = useState([])

    function handleFilterByTypes(e) {
        e.preventDefault()
        setFtypes([...ftypes, e.target.value])
        dispatch(filterByTypes(e.target.value))
    }


    //SearchBar
    const [name, setName] = useState("")
    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(getNamePokemon(name))
    }

    //Orden alfabetico
    const [order, setOrder] = useState("")
    function handleAlphaSort(e) {
        e.preventDefault()
        dispatch(orderAlphabetic(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
        console.log(order)
    }

    //Orden attack
    function handleAttackSort(e) {
        console.log(e.target.value)
        e.preventDefault()
        dispatch(orderAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    function handleClick(e) {
        e.preventDefault()
        document.location.reload()
    }



    let variable = <Loader />
    if (!allErrors === "") {
        variable = <NotFound />
    } else {
        variable = <Loader />
    }



    return (
        <div className={all}>
            <div className={nav}>

                <input type="image" src={logo} className={pokeLogo} alt="pokemon" onClick={(e) => { handleClick(e) }} />

                <form className={search} >
                    <input type="text" placeholder="Pokemon" onChange={(e) => { handleInputChange(e) }} />
                    <button type="submit" onClick={(e) => { handleSubmit(e) }} >Search</button>
                </form>

                <select name="Alpha" className={select} onChange={(e) => { handleAlphaSort(e) }}>
                    <option hidden selected>Alphabetic</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
                <select name="attack" className={select} onChange={(e) => { handleAttackSort(e) }} >
                    <option hidden selected>Attack</option>
                    <option value="100-1">Stronger</option>
                    <option value="1-100">Weaker</option>
                </select>
                <Link to="/creation">
                    <button className={btn}>Create Pokemon</button>
                </Link>
            </div>




            <div className={filters}>
                <h2>Filters</h2>
                <select name="CreatedDb" className={select} onChange={(e) => { handleFilterDb(e) }}>
                    <option hidden selected>From</option>
                    <option value="Db">From Db</option>
                    <option value="Api">From Api</option>
                    <option value="All">All</option>
                </select>
                <select name="Type" className={select} onChange={(e) => { handleFilterByTypes(e) }}>
                    <option hidden selected>Type</option>
                    {allTypes.map((e) => {
                        return (<option>{e}</option>)
                    })}
                </select>
            </div>

            <h3 style={{ "color": "#ccc5b9", "textAlign": "center", "marginBottom": "20px" }}>Selected</h3>
            <div className={typesF}>
                {
                    ftypes?.length > 0 && ftypes?.length < 3 && ftypes?.map((e) => {
                        return (
                            <>
                                <p>{e.charAt(0).toUpperCase() + e.slice(1)}</p>
                            </>
                        )
                    })
                }
            </div>







            {!allPokemons.length ? variable :
                <>
                    <Paginated
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons?.length}
                        paginated={paginated}
                        currentPage={currentPage}
                    />
                    <div className={container}>
                        {currentPokemons && currentPokemons?.map((e) => {

                            if (e != null) {
                                return (
                                    <Card
                                        name={e?.name}
                                        img={e?.img}
                                        id={e?.id}
                                        types={e?.types}
                                    />
                                )
                            }
                            return null
                        })
                        }
                    </div>
                </>}
        </div>
    )
}

// puedo usar un estado que sea por default 