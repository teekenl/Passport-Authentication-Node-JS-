var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../model/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/signup', function(req, res) {
  res.render('register',{});
});

router.post('/signup', function(req, res) {
  Account.register(new Account({username: req.body.username}),req.body.password, function(err, account) {
    if(err) {
      return res.render('register', {info: "Sorry. The username is already in use"});
    }

    passport.authenticate('local')(req, res, function(){
      res.redirect('/');
    });
  });
});

router.get('/signin', function(req, res){
  res.render('login',{user: req.user});
});

router.post('/signin', passport.authenticate('local'),function(req, res){
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
