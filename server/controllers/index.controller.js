const path = require('path')

const controller = {}

controller.index = (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../src/index.html'))
}

module.exports = controller
