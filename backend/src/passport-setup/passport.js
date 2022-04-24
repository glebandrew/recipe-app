const passport = require('passport')
const GoogleStartegy = require('passport-google-oauth2').Strategy
const GOOGLE_USER_PASSWORD = process.env.GOOGLE_USER_PASSWORD
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
 const GOOGLE_CLIENT_SRCRET = process.env.GOOGLE_CLIENT_SRCRET
 const User = require('../models/user')
 const bcrypt = require('bcrypt')

passport.serializeUser(function (user, done) {
	done(null, user._id)
})

passport.deserializeUser( async function (id, done) {
	await User.findById(id, async function (err, user) {
		done(err, user)
	})
})

passport.use(new GoogleStartegy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SRCRET,
	callbackURL: 'http://localhost:3000/user/google/callback',
	passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
	const password = await bcrypt.hash(GOOGLE_USER_PASSWORD, 8)
	const newUser = await new User({
		name: profile.displayName,
		login: profile.name.givenName,
		email: profile.emails[0].value,
		password,
	})
	await newUser.generateAuthToken()
	return done(null, newUser)
}))