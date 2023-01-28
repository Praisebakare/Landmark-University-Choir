const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")
const Member = require("./models/members")
const Att = require("./models/att")
const Executive = require("./models/executive")
const memberauth = require("./models/memberauth")
const Choice = require("./models/servicechoice")
const Announcement = require("./models/announcement")
const Suggestion = require("./models/suggestion")
const Applicants = require("./models/applicants")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const session = require('express-session')
const bcrypt = require("bcrypt")
const  { MailtrapClient } = require("mailtrap")
const nodemailer = require("nodemailer")


const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

const port = process.env.port || 5000
const JWT_SECRET_KEY = '#%@^&*#i#jhftrsresxcvghcgfcbnBHS5Q7893$%yv%Yg^*(bJhj)'

mongoose.connect(process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } 
  );
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully")
    app.listen(port, () => {
        console.log(`server up at port ${port}`)
    })
}); 

const app = express()

/* app.use(session({secret: 'bakarepraise3',saveUninitialized: true,resave: true})) */

app.set('trust proxy', 1);

app.use(session({
    secret: 'bakarepraise3',
    saveUninitialized: true,
    resave: false
}));

app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname, 'public')))

var sess;

//ADMIN PAGE
app.get('/Admin', async(req, res) => {
    sess = req.session;
    if(sess.user) {
        res.render('admin', {title: "Admin"})
    } else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/100', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const level = "100"
        const topp = await Member.find({subunit: "Singer" , level }).lean()
        const hodd = await Member.find({subunit: "Instrumentalist" , level }).lean()

        res.render("admin1", {
            top: topp,
            hod: hodd
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/200', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const level = "200"
        const topp = await Member.find({subunit: "Singer" , level }).lean()
        const hodd = await Member.find({subunit: "Instrumentalist" , level }).lean()

        res.render("admin1", {
            top: topp,
            hod: hodd
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/300', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const level = "300"
        const topp = await Member.find({subunit: "Singer" , level }).lean()
        const hodd = await Member.find({subunit: "Instrumentalist" , level }).lean()

        res.render("admin1", {
            top: topp,
            hod: hodd
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/400', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const level = "400"
        const topp = await Member.find({subunit: "Singer" , level }).lean()
        const hodd = await Member.find({subunit: "Instrumentalist" , level }).lean()

        res.render("admin1", {
            top: topp,
            hod: hodd
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/500', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const level = "500"
        const topp = await Member.find({subunit: "Singer" , level }).lean()
        const hodd = await Member.find({subunit: "Instrumentalist" , level }).lean()

        res.render("admin1", {
            top: topp,
            hod: hodd
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/Choir', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const topp = await Member.find({subunit: "Singer"}).lean()

        res.render("admin2", {
            top: topp,
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/Applicants', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const topp = await Applicants.find({}).lean()

        res.render("admin2", {
            top: topp,
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/HOD', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const hodd = await Member.find({subunit: "Instrumentalist"}).lean()

        res.render("admin2", {
            top: hodd
        })
    }else {
        res.redirect('/au/login')
    }
})

app.get('/au/login', (req, res) => {
    res.render('logadmin', {title: "Login"})
})

app.post('/au/login', (req, res) => {
   try {
        const {username, password} = req.body

        const user = process.env.Admin
        const key = process.env.Password

        if( user == username && key == password ){
            jwt.sign(
                {
                    user: username,
                },
                JWT_SECRET_KEY
            )/* 
            localstorage.setItem('admin', user); */
            sess = req.session
            sess.user = req.body.username
            res.redirect('/Admin')
        } else {
            return res.render('logadmin' , {message: "Invalid Username or Password"})
        }
   } catch (error) {
        console.log(error)
   }
})


app.get('/', (req, res) => {
    res.render('home', {title: "HOME"})
})

app.get('/welcome', (req, res) => {
    res.render('welcome', {title: "Welcome"})
})


//REGISTRATION ROUTE
app.get('/Register', (req, res) => {
    res.render('register', {title: "Registration"})
})

app.post('/Register', async (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        college,
        department,
        instagramID,
        email,
        phonenumber,
        roomno,
        dob,
        subunit,
        part,
        level
    } = req.body

    if(req.body.level != "100") {
        try {
            await Member.create ({
                firstname,
                middlename,
                lastname,
                regno: req.body.regno,
                matricno: req.body.matricno,
                college,
                department,
                instagramID,
                email,
                phonenumber,
                roomno,
                dob,
                subunit,
                part,
                level
            })
            res.redirect('/welcome')
        } catch (error) {
            if(error.code === 11000){
                return res.render('register', {message: "Thank you"})
            } else {
                res.render('register', {message: "Try Again Later"})
                console.log(error)
            }
        }
    } else {
        try {
            await Applicants.create ({
                firstname,
                middlename,
                lastname,
                regno: req.body.regno,
                matricno: req.body.matricno,
                college,
                department,
                instagramID,
                email,
                phonenumber,
                roomno,
                dob,
                subunit,
                part,
                level
            })
            res.redirect('/welcome')
        } catch (error) {
            if(error.code === 11000){
                return res.render('register', {message: "Thank you"})
            } else {
                res.render('register', {message: "Try Again Later"})
                console.log(error)
            }
        }
    }  
})

app.get('/Member/Add', async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        res.render("applicants")
    }else {
        res.redirect('/au/login')
    }
})

app.post('/Member/Add', async (req, res) => {
    const matricno =  req.body.matricno
    const applicant = await Applicants.findOne({$or: [
        {matricno: matricno},
        {regno: matricno}
    ]})

    var string = 'ZabW1c2X4dY5e7T8f90VgU@hSR!hiPQOjNkMLlKmnAoBpCqDrEsFtGuHvIxJyz'
    var stringLength = 7
    var randomstring = "";

    for (var i=0; i<stringLength; i++) {  
        var rnum = Math.floor(Math.random() * string.length);  
        randomstring += string.substring(rnum, rnum+1);
    }

    const lastname = applicant.lastname
    const firstname = applicant.firstname
    
    const username = lastname.toLowerCase() + "." + firstname.toLowerCase()
    const password = await bcrypt.hash(randomstring,10)

    

    const user = await memberauth.findOne({})

    if(!user) {
        try {
            await Member.create ({
                firstname: applicant.firstname,
                middlename: applicant.middlename,
                lastname: applicant.lastname,
                regno: applicant.regno,
                matricno: applicant.matricno,
                college: applicant.college,
                department: applicant.department,
                instagramID: applicant.instagramID,
                email: applicant.email,
                phonenumber: applicant.phonenumber,
                roomno: applicant.roomno,
                dob: applicant.dob,
                subunit: applicant.subunit,
                part: applicant.part,
                level: applicant.level
            })
            await memberauth.create({
                username,
                matricno,
                password
            })
            let mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: applicant.email,
                subject: "Choir Application Update",
                html: "You have been accepted to the landmark university choir. This is your username and password to access the choir portal(username, password) Login here to change your password and get updated"
            };
        
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {  
                    return res.render('applicants', {message: 'Try Again'})
                } else {
                    return res.render('applicants', {message: 'Added successfully'})
                }
            });
        } catch (error) {
            if(error.code === 11000) {
                res.render('applicants', {message: "Member exists"})
            } else {
                res.render('applicants', {message: "Try Again Later"})
                console.log(error)
            }
        }
    } else {
        

        try {
            const username = firstname.toLowerCase() + "." +  lastname.toLowerCase()
        await Member.create ({
            firstname: applicant.firstname,
            middlename: applicant.middlename,
            lastname: applicant.lastname,
            regno: applicant.regno,
            matricno: applicant.matricno,
            college: applicant.college,
            department: applicant.department,
            instagramID: applicant.instagramID,
            email: applicant.email,
            phonenumber: applicant.phonenumber,
            roomno: applicant.roomno,
            dob: applicant.dob,
            subunit: applicant.subunit,
            part: applicant.part,
            level: applicant.level
        })
        await memberauth.create({
            username,
            matricno,
            password
        })
            let mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: applicant.email,
                subject: "Choir Application Update",
                html: "You have been accepted to the landmark university choir. This is your username and password to access the choir portal(username, password) Login here to change your password and get updated"
            };
        
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {  
                    return res.render('applicants', {message: 'Try Again'})
                } else {
                    return res.render('applicants', {message: 'Added successfully'})
                }
            });
        } catch (error) {
            if(error.code === 11000) {
                res.render('applicants', {message: "Member exists"})
            } else {
                res.render('applicants', {message: "Try Again Later"})
                console.log(error)
            }
        }
    }
})

app.get('/au/logout', (req ,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.render('logadmin', { title: "Log out", message : "logout Successfully...!"})
    });
})

//Attendance Portal
app.get('/Admin/Att', async(req, res) => {
    sess = req.session
    sess.user = "attendances"
    const today = new Date();
    const d = today.getDate().toString();
    const mmm = today.getMonth() + 1;
    const m = mmm.toString();
    
    if (m.length == 2 && d.length == 1) {
        const dd = '0'+ d
        const mm =  m
        const yyyy = today.getFullYear()
        const date = dd + "-" + mm + "-" + yyyy
        const clocked = date
        const amount = await Att.find({clocked}).count()
        if(amount == 0) {
            return res.render('attendance', {message: "0"})
        } else {
            return res.render('attendance', {message: amount})
        }
    } else if (m.length == 1 && d.length == 2) {
        const dd = d
        const mm = '0' + m
        const yyyy = today.getFullYear()
        const date = dd + "-" + mm + "-" + yyyy
        const clocked = date
        const amount = await Att.find({clocked}).count()
        if(amount == 0) {
            return res.render('attendance', {message: "0"})
        } else {
            return res.render('attendance', {message: amount})
        }
    } else if (m.length == 2 && d.length == 2) {
        const dd =  d
        const mm = m
        const yyyy = today.getFullYear()
        const date = dd + "-" + mm + "-" + yyyy
        const clocked = date
        const amount = await Att.find({clocked}).count()
        if(amount == 0) {
            return res.render('attendance', {message: "0"})
        } else {
            return res.render('attendance', {message: amount})
        }
    } else {
        const dd = '0'+ d
        const mm = '0' + m
        const yyyy = today.getFullYear()
        const date = dd + "-" + mm + "-" + yyyy
        const clocked = date
        const amount = await Att.find({clocked}).count()
        if(amount == 0) {
            return res.render('attendance', {message: "0"})
        } else {
            return res.render('attendance', {message: amount})
        }
    }
})

app.post('/Admin/Att/Done', async (req, res) => {
    let sess = req.session;
    if(sess.user) {
        const today = new Date();
        const d = today.getDate().toString();
        const mmm = today.getMonth() + 2;
        const m = mmm.toString();
        const hours = today.getHours()
        const minutes = today.getMinutes()
        const seconds = today.getSeconds()
        const time = hours + ":" + minutes + ":" + seconds 
        const week = 1
        const members = await Member.find()
        members.forEach(async element => {
            const matricno = element.matricno

            const member =  await Member.findOne({$or: [
                {regno: matricno},
                {matricno: matricno}
            ]})
            const firstname = member.firstname
            const lastname = member.lastname

            if (m.length == 2 && d.length == 1) {
                const dd = '0'+ d
                const mm =  m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = "0"
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })
                    return res.render('attendance', {Status: "Done"})
                } catch (error) {
                    if(error.code === 11000) {
                        return res.render('attendance', {Status: "Done"})
                    } else {
                        return res.render('attendance', {Status: "Done"})
                    }
                }
            } else if (m.length == 1 && d.length == 2) {
                const dd = d
                const mm = '0' + m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = "0"
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })
                    return res.render('attendance', {Status: "Done"})
                } catch (error) {
                    if(error.code === 11000) {
                        return res.render('attendance', {Status: "Done"})
                    } else {
                        return res.render('attendance', {Status: "Done"})
                    }
                }
            } else if (m.length == 2 && d.length == 2) {
                const dd =  d
                const mm = m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = "0"
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })
                    return res.render('attendance', {Status: "Done"})
                } catch (error) {
                    if(error.code === 11000) {
                        return res.render('attendance', {Status: "Done"})
                    } else {
                        return res.render('attendance', {Status: "Done"})
                    }
                }
            } else {
                const dd = '0'+ d
                const mm = '0' + m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = "0"
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })
                    return res.render('attendance', {Status: "Done"})
                } catch (error) {
                    if(error.code === 11000) {
                        return res.render('attendance', {Status: "Done"})
                    } else {
                        return res.render('attendance', {Status: "Done"})
                    }
                }
            }
        })
    } else {
        res.redirect('/au/login')
    }
})

app.post('/Admin/Att', async (req, res) => {
    let sess = req.session;
    if(sess.user) {
        try {
            const matricno = req.body.matricno
            const member =  await Member.findOne({$or: [
                {regno: matricno},
                {matricno: matricno}
            ]})
            const firstname = member.firstname
            const lastname = member.lastname


            const today = new Date();
            const d = today.getDate().toString();
            const mmm = today.getMonth() + 2;
            const m = mmm.toString();

            const hours = today.getHours()
            const minutes = today.getMinutes()
            const seconds = today.getSeconds()
            const time = hours + ":" + minutes + ":" + seconds 

            const week = 1

            //m.length is 2 and d.length is 1, m.length is 1 and d.length is 2, m.length is 2 and d.length is 2
            
            if (m.length == 2 && d.length == 1) {
                const dd = '0'+ d
                const mm =  m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })

                    const amount = await Att.find({clocked}).count()
                    res.render('attendance', {message: amount})
                } catch (error) {
                    if(error.code === 11000) {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "You have clocked in", message: amount})
                    } else {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                    }
                }
            } else if (m.length == 1 && d.length == 2) {
                const dd = d
                const mm = '0' + m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })

                    const amount = await Att.find({clocked}).count()
                    res.render('attendance', {message: amount})
                } catch (error) {
                    if(error.code === 11000) {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "You have clocked in", message: amount})
                    } else {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                    }
                }
            } else if (m.length == 2 && d.length == 2) {
                const dd =  d
                const mm = m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })

                    const amount = await Att.find({clocked}).count()
                    res.render('attendance', {message: amount})
                } catch (error) {
                    if(error.code === 11000) {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "You have clocked in", message: amount})
                    } else {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                    }
                }
            } else {
                const dd = '0'+ d
                const mm = '0' + m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const data = firstname + date +'2111'
                try {
                    await Att.create({
                        data,
                        matricno,
                        clocked,
                        time,
                        week,
                        date,
                        firstname,
                        lastname
                    })

                    const amount = await Att.find({clocked}).count()
                    res.render('attendance', {message: amount})
                } catch (error) {
                    if(error.code === 11000) {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "You have clocked in", message: amount})
                    } else {
                        const amount = await Att.find({clocked}).count()
                        return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                    }
                }
            }
        } catch (error) {
            const today = new Date();
            const d = today.getDate().toString();
            const mmm = today.getMonth() + 1;
            const m = mmm.toString();
 
            //m.length is 2 and d.length is 1, m.length is 1 and d.length is 2, m.length is 2 and d.length is 2
            
            if (m.length == 2 && d.length == 1) {
                const dd = '0'+ d
                const mm =  m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const amount = await Att.find({clocked}).count()
                if(amount == 0) {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: '0'})
                } else {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                }
            } else if (m.length == 1 && d.length == 2) {
                const dd = d
                const mm = '0' + m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const amount = await Att.find({clocked}).count()
                if(amount == 0) {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: '0'})
                } else {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                }
            } else if (m.length == 2 && d.length == 2) {
                const dd =  d
                const mm = m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const amount = await Att.find({clocked}).count()
                if(amount == 0) {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: '0'})
                } else {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                }
            } else {
                const dd = '0'+ d
                const mm = '0' + m
                const yyyy = today.getFullYear()
                const date = dd + "-" + mm + "-" + yyyy
                const clocked = date
                const amount = await Att.find({clocked}).count()
                if(amount == 0) {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: '0'})
                } else {
                    return res.render('attendance', {messag: "Your bio data does not exist", message: amount})
                }
            }
        }
    }else {
        res.redirect('/au/login')
    }
})

app.get("/Admin/Suggestion", async (req, res) => {
    let sess = req.session 
    if(sess.user) {
        const suggestion = await Suggestion.find()

        res.render('suggestion', {suggestion: suggestion})
    } else {
        res.redirect('/au/login')
    }
})

app.get("/Admin/Announcement", async (req, res) => {
    let sess = req.session 
    if(sess.user) {

        const Dresscode = await Announcement.find({type: "Announcement"})
        const announcement = await Announcement.find({type: "Announcement"})
        const Sundaysong = await Announcement.find({type: "Sunday song"})
        const Tuesdaysong = await Announcement.find({type: "Tuesday song"})
        const Thursdaysong = await Announcement.find({type: "Thursday song"})

        res.render('announcement', {dresscode: Dresscode, announcement: announcement, sunday: Sundaysong, tuesday: Tuesdaysong, thursday: Thursdaysong})
    } else {
        res.redirect('/au/login')
    }
})

app.post("/Admin/Announcement", async (req, res) => {
    let sess = req.session 
    if(sess.user) {
        const Dresscode = await Announcement.find({type: "Announcement"})
        const announcement = await Announcement.find({type: "Announcement"})
        const Sundaysong = await Announcement.find({type: "Sunday song"})
        const Tuesdaysong = await Announcement.find({type: "Tuesday song"})
        const Thursdaysong = await Announcement.find({type: "Thursday song"})

        try {
            await Announcement.create({
                type: req.body.type,
                date: req.body.date,
                announcement: req.body.announcement
            })

            res.render('announcement', {message: "Posted Successfully", dresscode: Dresscode, announcement: announcement, sunday: Sundaysong, tuesday: Tuesdaysong, thursday: Thursdaysong})
        } catch (error) {
            console.log(error)
            res.render('announcement', {message: "Try again.....", dresscode: Dresscode, announcement: announcement, sunday: Sundaysong, tuesday: Tuesdaysong, thursday: Thursdaysong})
        }
    } else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/Att/View', async (req, res) => {
    let sess = req.session;
    if(sess.user) {
        const attendance = await Att.find({}).lean()
        res.render('attendanceview',{
            att: attendance
        })
    } else {
        res.redirect("/au/login")
    }
})

app.post('/Admin/Send', async (req, res) => {
    let sess = req.session;
    if(sess.user) {

        const level = req.body.level

        try {
            if(level == "all") {
                const member = await Member.find({})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "100") {
                const level = 100
                const member = await Member.find({level})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "200") {
                const level = 200
                const member = await Member.find({level})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            }if(level == "300") {
                const level = 300
                const member = await Member.find({level})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "400") {
                const level = 400
                const member = await Member.find({level})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            }else if(level == "500") {
                const level = 500
                const member = await Member.find({level})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level.includes("100") && level.includes("200")) {
                const member1 = await Member.find({level: "100"})
                const member2 = await Member.find({level: "200"})
    
                member1.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
    
                member2.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level.includes("300") && level.includes("400") && level.includes("500")) {
                const member1 = await Member.find({level: "300"})
                const member2 = await Member.find({level: "400"})
                const member3 = await Member.find({level: "500"})
    
                member1.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
    
                member2.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
                member3.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "excos"){
                const member = await Executive.find({})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "top"){
                const member = await Member.find({subunit: "Singer"})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "hod"){
                const member = await Member.find({subunit: "Instrumentalist"})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            } else if(level == "applicants") {
                const member = await Applicants.find({})
    
                member.forEach(element => {
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: element.email,
                        subject: req.body.subject,
                        html: req.body.message
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('admin', {message: 'Try Again'})
                        } else {
                        return res.render('admin', {message: 'Email has been delivered'})
                        }
                    });
                })
            }
        } catch (error) {
            console.log(error)
            res.render('admin', {message: "Contact the administrator"})
        }
    }  
})

app.get("/Admin/Executive", async(req, res) => {
    let sess = req.session;
    if(sess.user) {
        const executive = await Executive.find({})
        res.render("executive", {
            excos: executive
        })
    }
    
})

app.post("/Admin/Executive/Add", async(req, res) => {
    let sess = req.session;
    const {matricno, post} = req.body
    if(sess.user) {
        try {  
            const member = await Member.findOne({matricno})

            const firstname = member.firstname
            const lastname = member.lastname
            const email = member.email
            const level = member.level
            await Executive.create({
                firstname,
                lastname,
                matricno,
                email, 
                post,
                level
            })

            const executiveE = await Executive.find({})
            return res.render('executive', {
                excos: executiveE
            })
        } catch (error) {
            if(error.code === 11000){
                const executiveE = await Executive.find({})
                return res.render('executive', {message: "You have added this person to the list", excos: executiveE})
            } else {
                const executiveE = await Executive.find({})
                res.render('executive', {message: `The person with ${matricno} does not have bio data`, excos: executiveE})
                console.log(error)
            }
        }
    }else {
        res.redirect('/au/login')
    }
    
})

app.get('/Updatelevel', async(req, res) => {
    let sess = req.session
    if (sess.user) {
        try {
            const member = await Member.find({})
            if (member == null) {
                res.render('admin', {message: "Empty DATABASE"})
            } else {
                member.forEach(async mem => {
                    const college = mem.college
                    const level = mem.level
        
                    if (college == "COE" || college == "CAS") {
                        if(level == "500") {
                            await Member.deleteMany({level: "500"})
                            if (level == "400") {
                                await Member.updateMany(
                                    {level: "400"},
                                    {
                                        $set: {level: "500"}
                                    }
                                )
                                if (level == "300") {
                                    await Member.updateMany(
                                        {level: "300"},
                                        {
                                            $set: {level: "400"}
                                        }
                                    )
                                    if (level == "200") {
                                        await Member.updateMany(
                                            {level: "200"},
                                            {
                                                $set: {level: "300"}
                                            }
                                        )
                                        if (level == "100") {
                                            await Member.updateMany(
                                                {level: "100"},
                                                {
                                                    $set: {level: "200"}
                                                }
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    if (college == "CPAS" || college == "CBS") {
                        if(level == "400") {
                            await Member.deleteMany({level: "400"})
                            if (level == "300") {
                                await Member.updateMany(
                                    {level: "300"},
                                    {
                                        $set: {level: "400"}
                                    }
                                )
                                if (level == "200") {
                                    await Member.updateMany(
                                        {level: "200"},
                                        {
                                            $set: {level: "300"}
                                        }
                                    )
                                    if (level == "100") {
                                        await Member.updateMany(
                                            {level: "100"},
                                            {
                                                $set: {level: "200"}
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    }
                })

                await Executive.deleteMany()
                await Att.deleteMany()
                await Choice.deleteMany()
                await Announcement.deleteMany()
                await Suggestion.deleteMany()
                
                res.render('admin', {message: "Update Completed"})   
            }
        } catch (error) {
            res.render('admin', {message: "Contact the Adminstrator"})
            console.log(error)
        }   
    }else {
        res.redirect('/au/login')
    }
})

app.post('/Delete', async(req, res) => {
    let sess = req.session
    if (sess.user) {
        try {
            const member = req.body.regno
            await Member.deleteOne({matricno: member})
            res.render('admin', {message: "Deleted Successfully"})
        } catch(error) {    
            res.render('admin', {message: "Contact the Adminstrator"})
            console.log(error)
        }
    }else {
        res.redirect('/au/login')
    }
})

app.get('/Admin/Member/Generate', (req, res)=> {
    let sess = req.session
    if (sess.user) {
        res.render('generate')
    }else {
        res.redirect('/au/login')
    }
})

app.post('/Admin/Member/Generate', async(req, res) => {
    let sess = req.session
    if (sess.user) {
        try {
            const matricno = req.body.matricno
            const member = await Member.findOne({$or:[ 
                {matricno: matricno }, 
                {regno: matricno}
            ]})

            var string = 'ZabW1c2X4dY5e7T8f90VgU@hSR!hiPQOjNkMLlKmnAoBpCqDrEsFtGuHvIxJyz'
            var stringLength = 7
            var randomstring = "";

            for (var i=0; i<stringLength; i++) {  
                var rnum = Math.floor(Math.random() * string.length);  
                randomstring += string.substring(rnum, rnum+1);
            }

            try {
                const lastname = member.lastname
                const firstname = member.firstname
                const username = lastname.toLowerCase() + "." + firstname.toLowerCase()
                const password = await bcrypt.hash(randomstring,10)

                const user = await memberauth.findOne({username: username})

                if (!user) {
                    await memberauth.create({
                        username,
                        matricno,
                        password
                    })
    
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: member.email,
                        subject: "Tabarnacle of Psalms",
                        html: "This is your username and password to access the choir portal(username, password) Login here to change your password, view your attendance, announcements, team leaders, and provide suggestions"
                    };
                    
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('generate', {message: 'Try Again'})
                        } else {
                            return res.render('generate', {message: 'Done...'})
                        }
                    });
                } else {
                    const username = firstname.toLowerCase() + "." +  lastname.toLowerCase() 
                    await memberauth.create({
                        username,
                        matricno,
                        password
                    })
    
                    let mailOptions = {
                        from: process.env.EMAIL_USERNAME,
                        to: member.email,
                        subject: "Tabarnacle of Psalms",
                        html: "This is your username and password to access the choir portal(username, password) Login here to change your password, view your attendance, announcements, team leaders, and provide suggestions"
                    };
                
                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {  
                            return res.render('generate', {message: 'Try Again'})
                        } else {
                            return res.render('generate', {message: 'Done...'})
                        }
                    });    
                }
            } catch (error) {
                if(error.code === 11000) {
                    res.render('generate', {message: 'Account generated already'})
                } else {
                    res.render('generate', {message: "Contact the Administrator"})
                    console.log(error)
                }
            }
        } catch (error) {
            res.render('generate', {message: "Contact the Adminstrator"})
            console.log(error)
        }
    }else {
        res.redirect('/au/login')
    }
})

app.post('/Admin/Member/All', async(req, res) => {
    let sess = req.session
    if (sess.user) {
        try {
            const member = await Member.find({})

            var string = 'ZabW1c2X4dY5e7T8f90VgU@hSR!hiPQOjNkMLlKmnAoBpCqDrEsFtGuHvIxJyz'
            var stringLength = 7
            var randomstring = "";

            for (var i=0; i<stringLength; i++) {  
                var rnum = Math.floor(Math.random() * string.length);  
                randomstring += string.substring(rnum, rnum+1);
            }

            try {
                member.forEach(async element => {
                    const matricno =  element.matricno
                    const lastname = element.lastname
                    const firstname = element.firstname
                    const username = lastname.toLowerCase() + "." + firstname.toLowerCase()
                    const password = await bcrypt.hash(randomstring,10)

                    const user = await memberauth.findOne({username: username})

                    if (!user) {
                        try {
                            await memberauth.create({
                                username,
                                matricno,
                                password
                            })
                        } catch (error) {
                            if(error.code === 11000) {
                                res.render('generate', {message: "Done"})
                                console.log(error)
                            } else {
                                res.render('generate', {message: "Contact the Administrator"})
                                console.log(error)
                            }   
                        }
                        let mailOptions = {
                            from: process.env.EMAIL_USERNAME,
                            to: element.email,
                            subject: "Tabarnacle of Psalms",
                            html: "This is your username and password to access the choir portal(username, password) Login here to change your password, view your attendance, announcements, team leaders, and provide suggestions"
                        };
                    
                        transporter.sendMail(mailOptions, function(err, data) {
                            if (err) {  
                                return res.render('generate', {message: 'Try Again'})
                            } else {
                                return res.render('generate', {message: 'Done...'})
                            }
                        });
                    } else {
                        const username = firstname.toLowerCase() + "." +  lastname.toLowerCase() 
                        try {
                            await memberauth.create({
                                username,
                                matricno,
                                password
                            })
                        } catch (error) {
                            if(error.code === 11000) {
                                res.render('generate', {message: "Done"})
                                console.log(error)
                            } else {
                                res.render('generate', {message: "Contact the Administrator"})
                                console.log(error)
                            }   
                        }
                        
    
                        let mailOptions = {
                            from: process.env.EMAIL_USERNAME,
                            to: element.email,
                            subject: "Tabarnacle of Psalms",
                            html: "This is your username and password to access the choir portal(username, password) Login here to change your password, view your attendance, announcements, team leaders, and provide suggestions"
                        };
                    
                        transporter.sendMail(mailOptions, function(err, data) {
                            if (err) {  
                                return res.render('generate', {message: 'Try Again'})
                            } else {
                                return res.render('generate', {message: 'Done...'})
                            }
                        });
                    }
                })
            } catch (error) {
                res.render('generate', {message: "Contact the Administrator"})
                console.log(error)
            }
        } catch (error) {
            res.render('generate', {message: "Contact the Adminstrator"})
            console.log(error)
        }
    }else {
        res.redirect('/au/login')
    }
})


/* //Service Selection
var x = 100
var y = 70
app.post('/Member/Service/choice', async(req, res) => {
    let sess = req.session
    if(sess.user) {
        const serviceChoice = req.body.pudate
        const timeoutScheduled = 5
        const dated = new Date()

        const dd = dated.getDay()
        const mm = dated.getMonth()
        const yyyy = dated.getFullYear()

        const date = dd + "-" + mm + "-" + yyyy
        
        const member = await memberauth.findOne({username: sess.user})
        const matricno = member.matricno

        if(date.getDay() == timeoutScheduled) {
            await Choice.create({
                matricno,
                date,
                serviceChoice
            })

            if(serviceChoice == '1st Service') {
                var amount1 = x--
            } else {  
                var amount2 = y--
            }

            const table = await Choice.find({matricno: matricno}).lean()
            res.render('servicechoice', {firstoption: amount1, secondoption: amount2, message: 'You have selected For the week', tab: table})
        }
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.get('/Member/Service/choice', async(req, res) => {
    let sess = req.session
    if(sess.user) {
        const timeoutScheduled = 5
        const date = new Date()
        const member = await memberauth.findOne({username: sess.user})
        const matricno = member.matricno

        const table = await Choice.find({matricno: matricno}).lean()

        if(date.getDay() !== timeoutScheduled) {
            res.render('servicechoice', {message: 'Selection Closed For the Week', tab: table})
        } else {
            table.forEach(element => {
                const dateDone = element.date
                const dateTest = new Date()
                console.log(dateDone)
                console.log(dateTest)
                if (date == dateDone) {
                    res.render('servicechoice', {message: 'You have selected your service', tab: table})
                }
            });
            
            var amount1 = x
            var amount2 = y
            res.render('servicechoice', {firstoption: amount1, secondoption: amount2, tab: table})
        }
    } else {
        res.redirect('/Member/au/Login')
    }
}) */

app.post('/Member/au/Login', async(req, res) => {
   try {
        const username = req.body.username
        const password = req.body.password
        const user = await memberauth.findOne({username: username})

        if(!user) {
            res.render('memberauth', {link: "/Member/Generate"})
        } else {
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username
                    },
                    JWT_SECRET_KEY
                )
                sess = req.session
                sess.user = req.body.username
                sess.token = token
                res.redirect('/Member')
            } else {
                return res.render('memberauth' , {message: "Invalid Username or Password"})
            }
        }
    } catch (error) {
        console.log(error)
        return res.render('memberauth' , {message: "There was an issue logging you in"})
    }
})

app.get('/Member/au/Login', async(req, res) => {
    res.render('memberauth')
})

app.get('/Member/au/logout', (req ,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.render('memberauth', { title: "Log out", message : "logout Successfully...!"})
    });
})

app.get('/Member', async(req, res) => {
    let sess = req.session 
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno})
        const att = await Att.find({matricno: member.matricno})

        var miss = att.filter(function (el)
            {
                return el.clocked == "0"
            }
        );

        const missed =  miss.length

        const held = att.length

        const attended = held - missed

        const percentage = (attended/held) * 100

        res.render('members', {att: att, attended: attended,profile: memberdetails.dpURL, percentage: percentage, userpart: memberdetails.part, level: memberdetails.level, user: memberdetails.firstname + " " + memberdetails.lastname})
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.post('/Member/changepassword', async(req, res) => {
    let sess = req.session
    if(sess.user) {
        const {newpassword: plainTextPassword, reEnterPassword} = req.body

        const token = sess.token

        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno})

        if(plainTextPassword.length < 8) {
            return res.render('changepassword', {message: "Password Should be at least 8 characters",profile: memberdetails.dpURL, level: memberdetails.level,userpart: memberdetails.part, user: memberdetails.firstname + " " + memberdetails.lastname})
        }

        /* if(plainTextPassword !== reEnterPassword) {
            return res.render('changepassword', {message: "Password not the same", username: sess.user, user: memberdetails.firstname + " " + memberdetails.lastname})
        } */

        try{
            const user = jwt.verify(token, process.env.JWT)
            const _id = user.id

            const password = await bcrypt.hash(plainTextPassword,10)

            await memberauth.updateOne(
                {_id},
                {
                    $set: {password: password}
                }
            )

            res.redirect('/Member/au/logout')
        } catch (error) {
            console.log(error)
            res.render('changepassword', {message: "Try again Later",profile: memberdetails.dpURL, level: memberdetails.level, userpart: memberdetails.part, user: memberdetails.firstname + " " + memberdetails.lastname})
        }
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.get('/Member/changepassword', async(req, res) => {
    let sess = req.session
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno})
        res.render('changepassword', {userpart: memberdetails.part,profile: memberdetails.dpURL, level: memberdetails.level, user: memberdetails.firstname + " " + memberdetails.lastname})
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.post('/search', async (req, res) => {
    const search = req.body.search

    const member = await Member.find({$or:[ 
        { matricno: search }, 
        {firstname: search}, 
        { lastname: search }, 
        { middlename: search },
        { department: search },
        { college: search }, 
        { subunit: search }, 
    ]})

    res.render("admin2", {
        top: member
    })
})

app.get('/Choir/leaders', async (req, res) => {
    let sess = req.session
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno})

        const excos = await Executive.find()

        res.render('leader', {userpart: memberdetails.part,profile: memberdetails.dpURL, user: memberdetails.firstname + " " + memberdetails.lastname, exco: excos, level: memberdetails.level})
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.get("/Choir/Announcement", async (req, res) => {
    let sess = req.session
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno})

        const Dresscode = await Announcement.find({type: "Dress code"})

        const announcement = await Announcement.find({type: "Announcement"})

        const Sundaysong = await Announcement.find({type: "Sunday song"})

        const Tuesdaysong = await Announcement.find({type: "Tuesday song"})

        const Thursdaysong = await Announcement.find({type: "Thursday song"})

        res.render('announcements', {dresscode: Dresscode,profile: memberdetails.dpURL, announcement: announcement, sunday: Sundaysong, tuesday: Tuesdaysong, thursday: Thursdaysong, userpart: memberdetails.part, user: memberdetails.firstname + " " + memberdetails.lastname, level: memberdetails.level})
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.post("/Formsubmit", async (req, res) => {
    let sess = req.session
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno})
        
        const Dresscode = await Announcement.find({type: "Dress code"})

        const announcement = await Announcement.find({type: "Announcement"})

        const Sundaysong = await Announcement.find({type: "Sunday song"})

        const Tuesdaysong = await Announcement.find({type: "Tuesday song"})

        const Thursdaysong = await Announcement.find({type: "Thursday song"})

        try {
            await Suggestion.create({
                name: memberdetails.firstname + " " + memberdetails.lastname,
                regno: req.body.regno,
                suggestion: req.body.message
            })

            res.render('announcements', {message: "Message sent successfully",profile: memberdetails.dpURL, dresscode: Dresscode, announcement: announcement, sunday: Sundaysong, tuesday: Tuesdaysong, thursday: Thursdaysong, userpart: memberdetails.part, user: memberdetails.firstname + " " + memberdetails.lastname, level: memberdetails.level})
        } catch (error) {
            console.log(error)
            res.render('announcements', {message: "Try Again...",profile: memberdetails.dpURL, dresscode: Dresscode, announcement: announcement, sunday: Sundaysong, tuesday: Tuesdaysong, thursday: Thursdaysong, userpart: memberdetails.part, user: memberdetails.firstname + " " + memberdetails.lastname, level: memberdetails.level})
        }
        
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.get('/Member/Attendance', async(req, res) => {
    let sess = req.session 
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno })
        const att = await Att.find({$or:[ 
            { matricno: memberdetails.matricno }, 
            {matricno: memberdetails.regno}
        ]})

        var miss = att.filter(function (el)
            {
                return el.clocked == "0"
            }
        );

        const missed =  miss.length

        const held = att.length

        const attended = held - missed

        const percentage = (attended/held) * 100
        res.render('Memberattendance', {att: att,held: held, profile: memberdetails.dpURL, attended: attended, percentage: percentage, userpart: memberdetails.part, level: memberdetails.level, user: memberdetails.firstname + " " + memberdetails.lastname})
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.get('/Member/Updateinfo', async (req, res) => {
    let sess = req.session 
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno })

        res.render('register', {details: memberdetails})
    } else {
        res.redirect('/Member/au/Login')
    }
})

app.post('/Member/Updateinfo', async (req, res) => {
    let sess = req.session 
    if(sess.user) {
        const member = await memberauth.findOne({username: sess.user})
        const memberdetails = await Member.findOne({matricno: member.matricno })
        try {
            await Member.updateOne(
                {matricno: member.matricno}, 
                {
                    $set : {
                        firstname: req.body.firstname || memberdetails.firstname,
                        middlename: req.body.middlename || memberdetails.middlename,
                        lastname: req.body.lastname || memberdetails.lastname,
                        regno: req.body.regno || memberdetails.regno,
                        matricno: req.body.matricno || memberdetails.matricno,
                        college: req.body.college || memberdetails.college,
                        department: req.body.department || memberdetails.department,
                        instagramID: req.body.instagramID || memberdetails.instagramID,
                        email: req.body.email || memberdetails.email,
                        phonenumber: req.body.phonenumber || memberdetails.phonenumber,
                        roomno: req.body.roomno || memberdetails.roomno,
                        dob: req.body.dob || memberdetails.dob,
                        subunit: req.body.subunit || memberdetails.subunit,
                        part: req.body.part || memberdetails.part,
                        level: req.body.level || memberdetails.level
                    }
            })
            res.render('register', {details: memberdetails, message: "Updated Successfully"})
        } catch (error) {
            console.log(error)
            res.render('register', {details: memberdetails, message: "An error occurred"})
        }
    } else {
        res.redirect('/Member/au/Login')
    }
})