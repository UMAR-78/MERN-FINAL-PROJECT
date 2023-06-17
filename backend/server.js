const express = require('express')
const colors = require('colors')



const app= express()
const dotenv = require('dotenv').config()
const connectDatabase = require('./config/db')

const PORT = process.env.PORT || 5000
const products = require('./routes/productRoute')

connectDatabase();


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// app.use(express().urlencoded.{extenden:true})
 
app.use('/api/v1' , products)





app.listen(PORT , ()=>
{
        console.log(`Server is working on http://localhost:${PORT}` )
})


