const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const Trip      = require('../models/Trip');

// rendering the creation page
router.get('/', (req, res, next)=>{
  res.render('trips/new-trip');
  console.log('create')
});


// after the trip is created, this route redirects to the trip with all the information on it
router.post('/', (req, res, next)=>{
// const theDestination = req.body.theDestination;
// const theDescription = req.body.theDescription;
// const theStartDate   = req.body.theStartDate;
// const theEndDate     = req.body.theEndDate;
Trip.create(req.body)
  .then(()=>{
    res.redirect('trips/details');
  })
  .catch((err)=>{
    next(err)
  })
});

// 
// // this route gets a single trip by its id, then renders a page that shows information about the trip
// //takes a url param for id
// router.get('/trips/details/:id', (req, res, next)=>{
//   Trip.findById(theID)
//   .then((theSingleTrip)=>{
//     res.render('trips/details')
//   })
//   .catch((err)=>{
//     next(err);
//   })
// });
//
// // get route that to edit trips, renders and edit hbs page
// // pass this trip in as the variable
// router.get('trips/edit/:id', (req, res, next)=>{
//   Trip.findById(theId)
//   .then((theSingleTrip)=>{
//     res.render('trips/edit')
//   })
//   .catch((err)=>{
//     next(err)
//   })
// });
//
// // this route finds the trip that needs to be update it by its ID and updates interval
// router.post('trips/edit', (req, res, next)=>{
//   Trip.findByIdAndUpdate(req.params.id)
//   .then(()=>{
//     res.redirect('trips/details')
//   })
//   .catch((err)=>{
//     next(err)
//   })
// });



module.exports = router;
