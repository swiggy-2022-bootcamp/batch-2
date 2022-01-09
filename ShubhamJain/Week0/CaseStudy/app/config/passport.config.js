const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require("../models");
const logger = require('./winston');
const User = db.users;

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    console.log(`Authenticating user with Email ${email}`);
    const user = await User.findOne({email:email});
    console.log("user is:", user);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) => {
    return done(null, User.findById(id))
  })
}

module.exports = initialize