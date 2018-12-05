const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');

// render signup page
router.get('/signup', (req, res, next)=>{
  res.render('users/signup');
})

router.post('/signup', (req, res, next)=>{
  const theUsername = req.body.theUsername;
  const thePassword = req.body.thePassword;

  // console.log("the username input ------- ", req.body.username);
  // console.log("the password input ======= ", req.body.thePassword);
  if(theUsername === "" || thePassword === ""){
    res.redirect('/');
    return;
  }
  User.findOne({username: theUsername})
    .then((user)=>{
      if (user != null){
        console.log("the user is not null", user);
        res.render("users/signup",{
            errormessage: "This email address has already created an account. Please log in."
        });
        return;
      }

      console.log("=-=========== ", thePassword);
      //hash set to 10 salt
      const bcryptSalt = 10;
      const salt       = bcrypt.genSaltSync(bcryptSalt);
      console.log("the salt -------------- ", salt);
      const hashPass   = bcrypt.hashSync(thePassword, salt);

      User.create({
        username: theUsername,
        password: hashPass,
      })
      .then(()=>{
        res.redirect('/');
      })
      .catch((err)=>{
        next(err);
      })
    });
});

// render login page
router.get ('/login', (req, res, next)=>{
  res.render('users/login');
});

//passport authentication route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  passReqToCallback: true
}));


// logout rout
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
})



module.exports = router;
