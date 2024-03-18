const router = require('express').Router()
const {test , callbackHandler} = require('../controllers/ayetController')
router.get('/get' ,test ) 
router.get('/check' , )
router.get('/callback' , callbackHandler)

module.exports = router