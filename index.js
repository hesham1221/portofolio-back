const express = require('express')
const app = express()
const login = require('./routes/login')
const uploadWork = require('./routes/uploadWork')
const cors = require('cors')

require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.database_connection)

const db = mongoose.connection
db.on('error' , () => console.log('err on connecting to database'))
db.once('open' , () => console.log('connected to database'))


app.use(cors())
app.use(express.json())

app.use(login)
app.use(uploadWork)

app.listen(process.env.PORT || 5000)