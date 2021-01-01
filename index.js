const express = require('express')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(cors())
app.use(express.json())