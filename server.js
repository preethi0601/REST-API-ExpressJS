const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const app = express()

app.use(express.json())

// POST to add data to DB 
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// GET data from DB
app.get('/products', async(req, res) =>{
    try{
        const Products = await Product.find({})
        res.status(200).json(Products)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})


// GET a specific field 
app.get('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const Products = await Product.findById(id)
        res.status(200).json(Products)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})


// PUT - Edit/update data in the db
app.put('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const Products = await Product.findByIdAndUpdate(id, req.body)
        if(!Products) {
            return res.status(404).json({message: `Product with ID ${id} doesn't exist!`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// DELETE - delete a field
app.delete('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const Products = await Product.findByIdAndDelete(id)
        if(!Products) {
            return res.status(404).json({message: `Cannot perform deletion, product with ID ${id} doesn't exist!`})
        }
        res.status(200).json(Products)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:rootuser@nodeapi.opmdebk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})


//Home route
app.get('/', (request, response) => {
    response.send('Hello Node API')
})
