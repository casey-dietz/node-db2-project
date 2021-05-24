const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = id => {
  return db('cars').where({ id }).first()
}

const create = cars => {
  return db('cars').insert(cars, ['id'])
}

module.exports = {
  getAll,
  getById,
  create,
}