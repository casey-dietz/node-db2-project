// DO YOUR MAGIC
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('cars_id')
        table.string('vin', 17).unique().notNullable()
        table.string('make').notNullable
        table.string('model').notNullable
        table.integer('mileage').notNullable
        table.string('title')
        table.string('transmission')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
}