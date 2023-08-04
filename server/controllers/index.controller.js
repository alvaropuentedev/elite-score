const path = require('path')

const controller = {}

controller.index = (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../public/index.html'))
}

module.exports = controller
