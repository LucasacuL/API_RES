'use strict'
console.log('########################## START ###############################');
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
//const Product = require('./models/product')

const port = process.env.PORT || 3001
const productCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.get('/hola/:name',(req,res)=>{
//   res.send({message:`Hola ${req.params.name}! `})
// })

app.get('/api/product', productCtrl.getProducts)

app.get('/api/product/:productId', productCtrl.getProduct)

app.post('/api/product', productCtrl.saveProduct)

app.put('/api/product/:productId', productCtrl.updateProduct)

app.delete('/api/product/:productId', productCtrl.deleteProduct)

mongoose.connect('mongodb://localhost:27017/shop', (err, res)=> {
  if (err) {
    console.log(`Error al conectar a la base de datos:  + ${err}`);
  }
  console.log('Conexion a la base de datos establecida...')
  app.listen(port,()=> {

    console.log(`API REST corriendo http://localhost:${port}`)
  })
})
