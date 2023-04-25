const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()

app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/scss', express.static(path.join(__dirname, 'scss')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/baseball', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'baseball.html'))
})
app.get('/hockey', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'hockey.html'))
})
app.get('/soccer', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'soccer.html'))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
