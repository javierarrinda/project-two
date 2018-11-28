const express   = require('express');
const router    = express.Router();
const Trip      = require('../models/Trip');

router.get('/login', (req, res, next)=>{
  res.render('/trips/new-trip');
})


module.exports = router;
