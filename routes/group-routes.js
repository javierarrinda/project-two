const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const Trip      = require('../models/Trip');
const Group     = require('../models/Group');


router.get('group/index', (req, res, next)=>{
  res.render('group/info');
});



module.exports = router;
