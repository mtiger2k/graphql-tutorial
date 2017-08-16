const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.me = function(req, res, next) {
  res.json({id: req.user._id, username: req.user.username, dispName: req.user.dispName});
}

exports.signin = function (req, res, next) {
  // User has already had their username and password auth'd
  // We just need to give them a token
  res.send({token: tokenForUser(req.user)})
}

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  // See if a user with the given username exists


  if (!username || !password) {
    return res.status(422).send({error: 'You must provide username and password'})
  }

  User.findOne({username}, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with a given username does exist, return an error

    if (existingUser) {
      return res.status(422).send({error: 'username is in use'});
    }

    const user = new User({
      username,
      password
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      res.json({token: tokenForUser(user)});
    });

  });


  // If a user with username does not exist, create and save a user record

  // Respond to request indicating that the user was created
}