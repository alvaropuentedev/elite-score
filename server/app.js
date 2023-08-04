const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())

app.use('/src/styles', express.static(path.join(__dirname, '..', 'src', 'styles')))
app.use('/src/scss', express.static(path.join(__dirname, '..', 'src', 'scss')))
app.use('/src/modules', express.static(path.join(__dirname, '..', 'src', 'modules')))
app.use('/src/utils', express.static(path.join(__dirname, '..', 'src', 'utils')))
app.use('/src/assets', express.static(path.join(__dirname, '..', 'src', 'assets')))

// ROUTES
app.use(require('./routes/index.routes'))
app.use(require('./routes/baseball.routes'))

app.get('/hockey', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'hockey.html'))
})
app.get('/soccer', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'soccer.html'))
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
