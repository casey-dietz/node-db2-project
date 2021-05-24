const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const id = Cars.getById(req.params.id)
  if(!id) {
    res.status(404).json({
      message: `car with id ${id} is not found`
    })
  } else {
    req.id = id
  }
  next()
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    res.status(400).json({
      message: `${vin} is missing`
    })
  } else if(!make) {
    res.status(400).json({
      message: `${make} is missing`
    })
  } else if(!model) {
    res.status(400).json({
      message: `${model} is missing`
    })
  } else if(!mileage) {
    res.status(400).json({
      message: `${mileage} is missing`
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
    const isValid = vinValidator.validate(req.body.vin)
    if(!isValid){
      res.status(400).json({
        message: `vin ${req.body.vin} is invalid`
      })
    }
    next()
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vinExists = await db('cars').where('vin', req.body.vin.trim().first())
    if(vinExists){
      res.status(400).json({
        message: `vin ${vinExists} already exists`
      })
    }
  } catch(err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}
