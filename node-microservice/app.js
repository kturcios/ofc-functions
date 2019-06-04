"use strict"

const fs = require('fs')
const express = require('express')
const app = express()

// HTTP contract 
const port = 8080

// Fix the base path to the name of the service for OpenFaaS
app.use('/node-microservice', (req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.send('Hello, world!');
})

app.listen(port, () => {
    // OpenFaaS health-check
    fs.writeFile('/tmp/.lock', '', 'utf-8', () => {
        console.log(`Example app listening on port ${port}`)
    })
})
