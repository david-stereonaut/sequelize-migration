const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })

    sequelize
    .query("SELECT * FROM company")
    .then(function ([results, metadata]) {
        console.log(results)
    })

    sequelize
  .query("SELECT * FROM company")
  .then(function ([results, metadata]) {
    results.forEach(c => console.log(c.name))
  })

  // sequelize
  //   .query("INSERT INTO company VALUES(null, 'Google', 'Tech', 10000)")
  //   .then(function ([result]) {
  //       console.log(result)
  //   })

const addStudent = async function (name, isBriliant)  {
  let result = await sequelize.query(`INSERT INTO student VALUES(null, '${name}', ${isBriliant})`)
  return result[0]
}

const addTeacher = async function (name, isTenured) {
  let result = await sequelize.query(`INSERT INTO teacher VALUES(null, '${name}', ${isTenured})`)
  return result[0]
}

// let sResult = addStudent("Killua", 1).then(resolve => console.log(resolve))
// let tResult = addTeacher("Zeno", 1).then(resolve => console.log(resolve))

// sequelize
// .query("SELECT * FROM teacher")
// .then(function ([results, metadata]) {
//   results.forEach(c => console.log(c.t_name))
// })

// sequelize
// .query("SELECT * FROM student")
// .then(function ([results, metadata]) {
//   results.forEach(c => console.log(c.s_name))
// })

const enrollStudent = async function (sName, tName) {
  let [students, sMetadata] = await sequelize.query(`SELECT * FROM student WHERE s_name = '${sName}'`)
  let [teachers, tMetadata] = await sequelize.query(`SELECT * FROM teacher WHERE t_name = '${tName}'`)
  await sequelize.query(`INSERT INTO student_teacher VALUES(${students[0].S_id}, ${teachers[0].t_id})`)
}

// enrollStudent("Leonidis", "Yoda")

sequelize
.query("SELECT * FROM student_teacher")
.then(function ([results, metadata]) {
  console.log(results)
})

sequelize.query(`
                UPDATE company 
                SET name='Twitter'WHERE name='Apple'`, 
                function (result) {
                        console.log(result)
                })