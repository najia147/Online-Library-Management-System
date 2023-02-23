const express = require('express')
const clientController = require('../controllers/client')

const router = express.Router()
router.get('/', clientController.getHomepage)


exports.route = router