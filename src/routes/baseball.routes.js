const express = require('express')
const router = express.Router()
const controller = require('../controllers/baseball.controller')

router.get('/baseball', controller.baseball)
router.get('/news', controller.news)
router.get('/schedule', controller.schedule)
router.get('/lineups', controller.lineups)
router.get('/highlights', controller.hightlights)

module.exports = router
