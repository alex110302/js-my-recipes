const router = require('express').Router()
const { response } = require('express')
const recipes = require('../../../data/recipes.json')


router.get('', (request, response) => {
    response.send(recipes.map( recipe => {
        const {id, title, image, prepTime, difficulty} = recipe
        return { id, title, image, prepTime, difficulty } 
    }))
})

router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    if (recipes.find(r => r.id.toString() === id.toString())) response.send(recipes.find(r => r.id.toString() === id.toString()))
        else response.send({ error: { message: `could not find recipe with id:${id}` } })
})

router.post('/recipe/add', (request, response) => {
    request.body.id = recipes.length + 1
    recipes.push(request.body)
    response.send(request.body)
})

module.exports = router


