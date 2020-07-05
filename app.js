var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')

var users = require('./routes/route')

var app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
require('./routes/passport')(passport)

app.use('/lodging', users)

const port = 3000

var server = app.listen(port, () => {
    console.log('Server started on '+ `${port}`)
})