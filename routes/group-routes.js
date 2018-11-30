const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const Trip      = require('../models/Trip');
const Group     = require('../models/Group');


router.get('/group/index', (req, res, next)=>{
  res.redirect('/groups/list');
});

router.get('/groups/create', (req, res, next) => {
  res.render('groups/create');
})

router.post('/groups/create', (req, res, next) => {
  Group.create({
    creator: req.user._id,
    name: req.body.groupNameInput,
  })
  .then(theGroupInfo => {
    User.findByIdAndUpdate(req.user._id, {push: {groups: theGroupInfo._id}})
    .then(updatedUser => {
      res.redirect(`/groups/list`)
    })
    .cactch(err => {
      next(err);
    })
  })
  .cactch(err => {
    next(err);
  })
})

router.get('/groups/list', (req, res, next) => {
  if (req.user === undefined ) {
    res.redirect("/login");
    return;
  }
  Group.find({creator: req.user._id})
  .then(theUserGroups => {
    console.log('the group list ----------- ', theUserGroups)
    res.render('groups/groupList', {groups: theUserGroups})
  })
  .cactc(err => {
    next(err);
  })
})


router.get('/groups/:groupID/info', (req, res, next) => {
  Group.findById(req.params.groupID).populate('travelers').populate('trip')
  .then(theGroupInfo => {
    res.render('groups/info', {group: theGroupInfo})
  })
  .cactch(err => {
    next(err);
  })
})

router.get('/groups/add-members/:groupID', (req, res, next)=>{
  User.find()
  .then((theUsers)=>{
    Group.findById(req.params.groupID)
    .then(groupInfo => {
      data = {
        theUsers: theUsers,
        groupInfo: groupInfo
      }
      res.render('groups/membersList', data)
    })
    .catch(err => {
      next(err);
    })
  })
  .catch((err)=>{
    next(err)
  })
})

router.post('/groups/add-members/:groupID/:userID', (req, res, next)=>{
  Group.findByIdAndUpdate(req.params.groupID, {push: {travelers: req.params.userID}})
  .then(updatedGroup => {
    console.log('group updated with new traveler ----')
    res.redirect(`/groups/${req.params.groupID}/info`);
  })
  .catch((err)=>{
    next(err)
  })
})


module.exports = router;
