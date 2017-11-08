const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./rutes')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)
// app.get('/hola/:name',(req,res)=>{
//   res.send({message:`Hola ${req.params.name}! `})
// })
module.exports = app
