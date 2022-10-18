import React from "react";
import { bar } from "./Paginated.module.css"

export default function Paginated({ pokemonsPerPage, allPokemons, paginated, currentPage }) {

    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className={bar}>
            <ul>
                {pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <a href={() => false} onClick={() => paginated(number)}>{number}</a>
                            </li>)
                    })}
            </ul>
            <h3>Page {currentPage}</h3>
        </nav>
    )
}