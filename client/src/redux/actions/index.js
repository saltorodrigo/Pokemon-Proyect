import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        let info = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: info.data
        })
    }
}

export function getPokemon(id){
    return async function(dispatch){
        let info = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type:'GET_POKEMON',
            payload: info.data
        })
    }
}

export function getNamePokemon(name) {
    return async function (dispatch) {
        try {
            let info = await axios.get('http://localhost:3001/pokemons?name=' + name)
            return dispatch({
                type: 'GET_NAME_POKEMON',
                payload: info.data
            })
        } catch (error) {
            return dispatch({
                type: 'ERROR_SEARCH',
                payload:"Pokemon not found"
            })
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        let info = await axios.get('http://localhost:3001/types',{})
        return dispatch({
            type: 'GET_TYPES',
            payload: info.data
        })
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const res = await axios.post('http://localhost:3001/pokemons', payload);
        return res;
    }
}

export function filterByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderAlphabetic(payload) {
    return {
        type: 'ORDER_ALPHABETIC',
        payload
    }
}

export function orderAttack(payload) {
    return {
        type: 'ORDER_ATTACK',
        payload
    }
}
