const User = require('./models/User');


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = 'SECRET';


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        User.findOne({ email: payload.email })
            .then(user => {
                if (!user) {
                    return done(null, false)
                } else {
                    return done(null, user)
                }
            })
            .catch(err => {
                console.log(err, "inside passport")
                done(err, false)
            })
    }))

}

