const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user.model')

const localLogin = new LocalStrategy(
  {
  	usernameField: 'email'
  },
  async (email, password, done) => {
  	console.log('aaa')
  	// console.log(user)
  	console.log(email)
  	console.log(password)
  	console.log('aaa')
  	const user = await Users.findOne({ email: email })
  	

  	if (!user || user.password !== password)
  	  return done(null, false, { message: 'Invalid login credentials' })

  	const token = jwt.sign({ user }, 'TOP_SECRET')
  	done(null, token)
  }
)

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken()
    ]),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload, done) => {
  	const user = payload
  	if (!user) {
  	  return done(null, false);
  	}
  	done(null, user)
  }
)

passport.use('jwt', jwtLogin)
passport.use('local', localLogin)

module.exports = passport