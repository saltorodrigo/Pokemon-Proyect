const initialState = {
    pokemons: [],
    pokemon: {},
    allPokemons: [],
    types: [],
    error: ""
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action?.payload,
                allPokemons: action?.payload
            }
        case 'GET_POKEMON':
            return {
                ...state,
                pokemon: action?.payload
            }
        case 'FILTER_BY_TYPES': {
            const type = action?.payload;
            let pokemonsFiltered = state?.pokemons?.filter((pokemon) => {
                if (pokemon?.types) {
                    return pokemon?.types?.includes(type);
                }
                return null
            });
            return {
                ...state,
                pokemons: pokemonsFiltered,
            };
        }
        case 'FILTER_CREATED':
            const pokemonsAll = state?.pokemons
            let createdFilter
                if (action?.payload === 'Db') {
                    createdFilter = pokemonsAll?.filter(e => e?.createdInDb)
                } else if (action?.payload === 'Api') {
                    createdFilter = pokemonsAll?.filter(e => !e?.createdInDb)
                } else if (action?.payload === 'All') {
                    createdFilter = state?.allPokemons
                }
            return {
                ...state,
                pokemons: createdFilter
            }
        case 'GET_NAME_POKEMON':
            return {
                ...state,
                pokemons: action?.payload
            }
        case 'ERROR_SEARCH':
            return {
                ...state,
                error: action?.payload
            }
        case 'POST_POKEMON':
            return {
                ...state
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action?.payload
            }
        // case 'CLEAN_STATE':
        //     return {
        //         ...state,
        //         pokemons: [],
        //         pokemon: {},
        //         error: ""
        //     }

        case 'ORDER_ALPHABETIC':
            let sorted = action?.payload === 'a-z' ?
                state?.pokemons?.sort(function (a, b) {
                    if (a?.name > b?.name) {
                        return 1
                    }
                    if (b?.name > a?.name) {
                        return -1
                    }
                    return 0
                }) :
                state?.pokemons?.sort(function (a, b) {
                    if (a?.name > b?.name) {
                        return -1
                    }
                    if (b?.name > a?.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: sorted
            }
        case 'ORDER_ATTACK':
            let sortedAttack = action?.payload === '1-100' ?
                state?.pokemons?.sort(function (a, b) {
                    if (a?.attack > b?.attack) {
                        return 1
                    }
                    if (b?.attack > a?.attack) {
                        return -1
                    }
                    return 0
                }) :
                state?.pokemons?.sort(function (a, b) {
                    if (a?.attack > b?.attack) {
                        return -1
                    }
                    if (b?.attack > a?.attack) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: sortedAttack
            }
        default:
            return state
    }
}