const { Router } = require('express')
const { Type, Pokemon } = require('../db')
const { getAllPokemons, getTypes, getDbInfo, getApiPoke,getApiInfo } = require('./controlers')

const router = Router();


router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    let allPokemons = await getAllPokemons()
    if (name) {
        let namePokemon = await allPokemons?.filter((e) => e?.name?.toLowerCase() === name?.toLowerCase())
        namePokemon?.length ?
            res.status(200).send(namePokemon) :
            res.status(404).send("Pokemon not found")

    } else {
        res.status(200).send(allPokemons)
    }
})

router.get('/pokemons/:id', async (req, res) => {

    const id = req.params.id

    if (id) {
        if (id?.length > 10) {
            let dbPokemons = await getDbInfo()
            if (id) {
                let pokemonId = await dbPokemons?.filter(e => e.id == id)
                pokemonId?.length ?
                    res.status(200).send(pokemonId) :
                    res.status(404).send("Pokemon not found")
            }
        }
        let pokemon = await getApiPoke(id)
        res.status(200).send(pokemon)
    }
    let allPokes = await getAllPokemons()
    let allP = allPokes.data
    res.status(200).send(allP)
    
})

router.get('/types', async (req, res) => {
    let types = await getTypes()
    res.status(200).send(types)
})

router.post('/pokemons', async (req, res) => {
    let {
        name,
        img,
        height,
        weight,
        attack,
        defense,
        hp,
        speed,
        type,
        createdInDb
    } = req.body
    const createPokemon = await Pokemon.create({
        name: name,
        img: img,
        height: height,
        weight: weight,
        attack: attack,
        defense: defense,
        hp: hp,
        speed: speed,
        createdInDb
    })
    let typeDb = await Type.findAll({
        where: { name: type }
    })
    createPokemon.addType(typeDb)
    res.send("Pokemon created")
})

router.get('/db', async (req, res) => {
    let types = await getDbInfo()
    res.status(200).send(types)
})

router.get('/api', async (req, res) => {
    let types = await getApiInfo()
    res.status(200).send(types)
})

module.exports = router;
