const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const CutiController = require('../controllers/cuti')

router.get('/',  checkAuth, CutiController.cuti_get_all)

router.post('/', checkAuth, CutiController.cuti_create)

router.get('/:cutiId', checkAuth, CutiController.cuti_get_one)

router.delete('/:cutiId', checkAuth, CutiController.cuti_delete)

module.exports = router