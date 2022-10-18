const axios = require("axios")
const { Type, Pokemon } = require('../db');

const getApiInfo = async () => {
    let arrayApi = []
    for (let i = 1; i < 41; i++) {
        let apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        let pokemon = await apiPokemon.data
        let finalPokemon =
        {
            name: pokemon.name,
            id: pokemon.id,
            height: pokemon.height,
            weight: pokemon.weight,
            img: pokemon.sprites.other.home.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            types: pokemon.types.map(e => e.type.name)
        }
        arrayApi.push(finalPokemon)
    }
    return arrayApi
}

const getApiPoke = async (id) => {
    let apiP = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokemon = apiP.data
    let finalPoke = {
        name: pokemon.name,
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        img: pokemon.sprites.other.home.front_default,
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        types: pokemon.types.map(e => e.type.name)
    }
    return finalPoke
}

const getDbInfo = async () => {
    let pokemonsDb
    let resutlDb
    resutlDb = await Pokemon.findAll({ include: Type })

    if (resutlDb.length > 0) {
        pokemonsDb = resutlDb.map((e) => {
            return e.dataValues;
        })

        pokemonsDb = pokemonsDb.map((i) => {
            return {
                ...i,
                types: i.types?.map(s => {
                    return s.name
                })
            }
        });
    }
    return pokemonsDb
}


const getAllPokemons = async () => {
    let infoApi = await getApiInfo()
    let infoDb = await getDbInfo()
    if (infoDb !== null) {
        const totalInfo = infoApi.concat(infoDb)
        return totalInfo
    }
    return infoApi
}

const getTypes1 = async () => {
    let typesArray = []
    const typesAxios = await axios.get("https://pokeapi.co/api/v2/type")
    const typesInfo = await typesAxios.data.results
    typesInfo.map((e) => {
        let axiosType = e.url
        typesArray.push(axiosType)
    })
    return typesArray
}

const getTypes = async () => {
    let arr = []
    const array = await getTypes1()
    for (let i = 0; i < array.length; i++) {
        let a = await axios.get(array[i])
        let b = a.data
        let obj = {
            name: b.name,
            id: b.id
        }
        arr.push(obj)
    }
    //--------- Types A DB ---------------
    for (let i = 0; i < arr.length; i++) {
        let [type, created] = await Type.findOrCreate({
            where: {
                name: arr[i].name,
                id: arr[i].id
            }
        }
        );
    }
    //------------------------------------
    const allTypes = await Type.findAll()
    let typesDb = []
    allTypes.map((e) => {
        typesDb.push(e.name)
    })
    //OBJETIVO, combinar las 2 funciones de getTypes en una 
    return typesDb
}


module.exports = {
    getAllPokemons,
    getTypes,
    getDbInfo,
    getApiPoke,
    getApiInfo
}
