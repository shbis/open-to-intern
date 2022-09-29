const express = require('express')
const router = express.Router()
const { createCollege, collegeDetails } = require('../controllers/collageController')
const { createIntern } = require('../controllers/internController')

router.post('/functionup/colleges', createCollege)
router.post('/functionup/interns', createIntern)
router.get('/functionup/collegeDetails', collegeDetails)

module.exports = router 
