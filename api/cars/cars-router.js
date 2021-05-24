const express = require('express')
const cars = require('./cars-model')
const mw = require('./cars-middleware')

const router = express.Router()

router.get('/', (req, res) => {
    cars.getAll()
        .then(cars => {
            res.json(cars)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
})

router.get('/:id', mw.checkCarId, (req, res) => {
    cars.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

router.post('/', mw.checkCarPayload, mw.checkVinNumberUnique, mw.checkVinNumberValid, (req, res) => {
    cars.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

module.exports = router;
