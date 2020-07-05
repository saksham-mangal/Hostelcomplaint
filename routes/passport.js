var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config')
var mysql = require('mysql')
var sql = require('./sql')

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.secret
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        jwt_payload.data = JSON.parse(JSON.stringify(jwt_payload.data))
        sql.query("SELECT * FROM Complaint WHERE Roll_No = '"+jwt_payload.data[0].Roll_No+"'", (err, result, fields) => {
            result = JSON.parse(JSON.stringify(result))
            if(err){
                return done(err, false)
            }
            if(result){
                return done(null, result)
            }
            else{
                return done(null, false)
            }
        })
    }))
}