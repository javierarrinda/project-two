const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');


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


router.get ('/login', (req, res, next)=>{
  res.render('users/login');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  passReqToCallback: true
}));


// check with Marcos to see what the code below does. Pretty sure that nothing from there works.

// router.post("/login", (req,res, next) => {
//   // find a user document in the database with that email
//   User.findOne({ username: req.body.theUsername })
//   .then((userFromDb) => {
//     if (userFromDb === null) {
//       // if we didn't find a user
//       res.locals.errorMessage = "Email incorrect.";
//       res.render("users/login");
//
//       // early return to stop the function since there's an error
//       // (prevents the rest of the code from running)
//       return;
//     }
//     // if email is correct now we check the password
//     const isPasswordGood =
//      bcrypt.compareSync(req.body.thePassword, userFromDb.password);
//
//      if (isPasswordGood === false) {
//        res.locals.errorMessage = "Password incorrect.";
//        res.render("users/login");
//
//        // early return to stop the function since there's an error
//        // (prevents the rest of the code from running)
//        return;
//      }
//
//      // CREDENTIALS ARE GOOD! We need to log the users in
//
//
//       // Passport defines the "req.login()"
//       // for us to specify when to log in a user into the session
//       req.login(userFromDb, (err) => {
//         if (err) {
//           // if it didn't work show the error page
//           next(err);
//         }
//         else {
//
//               console.log("user------ ", userFromDb);
//
//                 //redirect to the home page on successful log in
//                 res.redirect("/");
//         }
//       }); //req.login()
//   })// then()
//   .catch((err) => {
//     next(err);
//   });
// });


router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
})

router.post('/delete/user/:id', (req, res, next)=>{
  User.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.render('/')
  })
  .catch(err=>{
    next(err);
  })
})


module.exports = router;
