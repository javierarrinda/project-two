const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const Trip      = require('../models/Trip');



// rendering the creation page
router.get('/trips', (req, res, next)=>{
  if (req.user === undefined ) {
    res.redirect("/login");
    return;
  }
  Trip.find({_id: req.user.trips})
  .then(usertrips => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", usertrips)
    res.render('trips/index', {usertrips});
  })
  .catch(err => {
    next(err);
  })
});


router.get('/trips/new-trip', (req, res, next) =>{
  if (req.user === undefined ) {
    res.redirect("/login");
    return;
  }
  res.render('trips/new-trip')
})



// after the trip is created, this route redirects to the trip with all the information on it
router.post('/trips/new-trip', (req, res, next)=>{
const theDestination = req.body.theDestination;
const theDescription = req.body.theDescription;
const theStartDate   = req.body.theStartDate;
const theEndDate     = req.body.theEndDate;
//creating the trip while requiring everything that has been inputted on the new-trip hbs ^^^^^
Trip.create({
  //creating with all the consts that i have above ^^
  destination: theDestination,
  description: theDescription,
  startDate: theStartDate,
  endDate: theEndDate
})
  .then((theNewTrip)=>{
    User.findByIdAndUpdate(req.user._id, {$push: {trips: theNewTrip._id}})
    .then(updatedUser => {
      console.log("----------------------- ", theNewTrip);
      res.redirect(`/trips/details/${theNewTrip._id}`);
    })
    .catch(err => {
      next(err);
    })
  })
  .catch((err)=>{
    next(err)
  })
});


// this route gets the redirect from the .then ^ above and renders the trips/details page
router.get('/trips/details/:id', (req, res, next)=>{
  Trip.findById(req.params.id)
  .then((theTripId)=>{
    console.log('log the trip id', theTripId)
    res.render('trips/details', {theTripId});
  })
  .catch((err)=>{
    next(err)
  })
})




// get route that to edit trips, renders and edit hbs page
// pass this trip in as the variable
router.get('trips/edit/:id', (req, res, next)=>{
  Trip.findById(theId)
  .then((theSingleTrip)=>{
    res.render('trips/edit')
  })
  .catch((err)=>{
    next(err)
  })
});

// this route finds the trip that needs to be update it by its ID and updates interval
router.post('trips/edit', (req, res, next)=>{
  Trip.findByIdAndUpdate(req.params.id)
  .then(()=>{
    res.redirect('trips/trips')
  })
  .catch((err)=>{
    next(err)
  })
});

router.post('/trips/delete/:id', (req, res , next)=>{
  Trip.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.render('trips/new-trip')
    })
    .catch(err=>{
      next(err);
    })
})



module.exports = router;
