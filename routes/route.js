var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var config = require('./config')
var passport = require('passport')
var sql = require('./sql')

// var sql = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: "",
//     database: 'mydb'
// })

// sql.connect()

router.post('/authenticate', (req, res)=> {
    console.log('Post request for login')
    var Roll_No = req.body.Roll_No
    var Password = req.body.Password
    var pass = sql.query("SELECT * FROM Student WHERE Roll_No = '"+req.body.Roll_No+"'", (err, result, fields) => {
        if(err) throw err
        result = JSON.stringify(result)
        result = JSON.parse(result)
        bcrypt.compare(Password, result[0].Password, (err, isMatch)=> {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: result}, config.secret, {
                    expiresIn: 604800
                })

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    data: {
                        Roll_No: result[0].Roll_No,
                        Name: result[0].Name,
                        Email: result[0].Email_Id,
                        Contact_No: result[0].Contact_No
                    }
                })
            }
            else{
                console.log("Login failed")
                res.send({msg: 'Incorrect Password or Roll_No'})
            }
        })
    })
})

router.post('/register', (req, res)=> {
    res.json({msg: 'Post request for Register'})
    console.log("Post request for Register")
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.Password, salt, (err, hash) => {
            if(err) throw err;
            var mysql = "INSERT INTO Student (Roll_No, Name, Email_Id, Contact_No, Password) VALUES ("
            mysql += "'"+req.body.Roll_No+"',"
            mysql += "'"+req.body.Name+"',"
            mysql += "'"+req.body.Email_Id+"',"
            mysql += "'"+req.body.Contact_No+"',"
            mysql += "'"+hash+"')"

            sql.query(mysql, (err, result) => {
                if(err) throw err;
                console.log("1 Record inserted.")
            })
        })
    })
})

router.post('/lodge', (req, res)=> {
    res.json({msg: 'Post request for lodging a complaint'})
    console.log("Post request for lodging a complaint")
    var mysql = "INSERT INTO Complaint (Roll_No, Room_No, Complaint_Type, Complaint_Details) VALUES ("
    mysql += "'"+req.body.Roll_No+"',"
    mysql += "'"+req.body.Room_No+"',"
    mysql += "'"+req.body.Complaint_Type+"',"
    mysql += "'"+req.body.Complaint_Details+"')"

    sql.query(mysql, (err, result) => {
        if(err) throw err
        console.log("1 Record inserted.")
    })
})

router.get('/complaint', passport.authenticate('jwt', {session: false}), (req, res)=> {
    console.log('Getting request for a particular complaint')
    res.send({msg: "Getting request for a particular complaint", Details: req.user})  
})

router.get('/allcomplaints', (req, res)=> {
    console.log('Getting request for all complaints')
    sql.query("SELECT * FROM Complaint", (err, result, fields) => {
        if(err) throw err
        res.send({msg: "Getting request for all complaints", Details: result})
    })
})


module.exports = router