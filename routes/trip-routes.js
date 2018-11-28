const express   = require('express');
const router    = express.Router();
const Trip      = require('../models/Trip');
const User      = require('../models/User');

router.get('/trips/create', (req, res, next)=>{
  res.render('/trips/new-trip');
});

router.post('/trips/create', (req, res, next)=>{
const theDestination = req.body.theDestination;
const theDescription = req.body.theDescription;
const theStartDate   = req.body.theStartDate;
const theEndDate     = req.body.theEndDate;
Trip.create(req.body)
  .then(()=>{
    res.redirect('/trip/details');
  })
  .catch((err)=>{
    next(err)
  })
});

router.get('/trips/details/:id', (req, res, next)=>{
  Trip.findById(:id)
  .then((theSingleTrip)=>{
    res.render('/trips/details')
  })
  .catch((err)=>{
    next(err);
  })
})


module.exports = router;
