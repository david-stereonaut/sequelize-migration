const pokeData = require('./poke_data.json')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

const types = {}
const towns = {}
const trainers = {}

const checkType = async function (type) {
  if (!types[type]) {
    await sequelize.query(`INSERT INTO pokemon_type VALUES('${type}')`)
    types[type] = true
  }
}

const checkTown = async function (town) {
  if (!towns[town]) {
    let townId = await sequelize.query(`INSERT INTO town VALUES(null, '${town}')`)
    towns[town] = townId[0]
  }
}

const checkTrainer = async function (trainer) {
  if (!trainers[Object.values(trainer).toString()]) {
    let trainerId = await sequelize.query(`INSERT INTO trainer VALUES(null, '${trainer.name}', '${towns[trainer.town]}')`)
    trainers[Object.values(trainer).toString()] = trainerId[0]
  }
}

const migratePokemon = async function (data) {
  for (i=0; i < data.length; i++) {
    await checkType(data[i].type)
    await sequelize.query(`INSERT INTO pokemon VALUES(${data[i].id}, '${data[i].name}', '${data[i].type}', '${data[i].height}', '${data[i].weight}')`)
    for (j=0; j < data[i].ownedBy.length; j++) {
      await checkTown(data[i].ownedBy[j].town)
      await checkTrainer(data[i].ownedBy[j])
      await sequelize.query(`INSERT INTO pokemon_trainer VALUES('${data[i].id}', '${trainers[Object.values(data[i].ownedBy[j]).toString()]}')`)
    }
  }
}

// migratePokemon(pokeData)

// Exercise 2

const findSnorlax = async function () {
  let [snorlax, metadata] = await sequelize.query(`SELECT * FROM pokemon WHERE weight = (SELECT MAX(weight) FROM POKEMON)`)
  console.log(snorlax[0].name)
}

// findSnorlax()

// Exercise 3

const findByType = async function (type) {
  let [results, metadata] = await sequelize.query(`SELECT name FROM pokemon WHERE type = '${type}'`)
  return results.map(r => r.name)
}
// findByType('grass').then(res => console.log(res))

// Exercise 4

const findOwners = async function (pokemon) {
  let [results, metadata] = await sequelize.query(`SELECT t.name 
                                                    FROM trainer AS t
                                                    JOIN pokemon_trainer AS pt ON t.id = pt.t_id
                                                    JOIN pokemon AS p ON p.id = pt.p_id
                                                    WHERE p.name = '${pokemon}'`)
  return results.map(r => r.name)
}

// findOwners("gengar").then(res => console.log(res))

// Exercise 5

const findRoster = async function (trainer) {
  let [results, metadata] = await sequelize.query(`SELECT p.name 
                                                    FROM pokemon AS p
                                                    JOIN pokemon_trainer AS pt ON p.id = pt.p_id
                                                    JOIN trainer AS t ON t.id = pt.t_id
                                                    WHERE t.name = '${trainer}'`)
  return results.map(r => r.name)
}

// findRoster("Loga").then(res => console.log(res))

// Exercise 6  - not done :(

const findMostOwned = async function () {
  let [results, metadata] = await sequelize.query(`SELECT p.name, pt.p_id, COUNT(pt.p_id) AS occurrences
                                                    FROM pokemon_trainer AS pt
                                                    JOIN pokemon AS p ON p.id = pt.p_id
                                                    GROUP BY pt.p_id
                                                    ORDER BY occurrences DESC`)
  console.log(results)
}

findMostOwned()