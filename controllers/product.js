const Product = require('../models/product')

function getProduct (req, res) {
  console.log(`el req es: ${req.params.productId}`)
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petizión : ${err}`})
    if (!product) return res.status(404).send({message: `El producto no existe`})
    res.status(200).send({prouct: product})
  })
}

function saveProduct (req, res) {
  console.log('POST /api/product')
  console.log(req.body)
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description
  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `Error al savar en la base de datos ${err}`})
    res.status(200).send({product: productStored})
  })
}

function getProducts (req, res) {
  // res.send(200,{products:products})
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición : ${err}`})
    if (!products) return res.status(404).send({message: `No existen porductos`})
    res.status(200).send({products})
  })
}

function updateProduct (req, res) {
  let productId = req.params.productId
  let update = req.body
  console.log('put11')
  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) return res.status(500).send({message: `Error al actualizar el producto: ${err}`})
    res.status(200).send({ product: productUpdated })
  })
  console.log('put2')
}

function deleteProduct (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
    // console.log('Intentado');
    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: `El producto ha sido eliminado`})
    })
    // console.log('Intentado_2');
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
