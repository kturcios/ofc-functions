const fs = require('fs')
const express = require('express')
const app = express()
const port = 8080

fs.openSync('/tmp/.lock', 'a')

// Fix the base path to the name of the service for OpenFaaS
app.use('/node-microservice', (req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.send('Hello, world!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})