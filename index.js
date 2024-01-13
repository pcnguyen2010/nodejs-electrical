const express = require('express');
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const db = require('./db')
const bodyParser = require('body-parser')
const sequelize = require('./util/database');
const User = require('./model/user');
const controller = require('./controller/user');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('image'));
app.use(express.static('css'));
app.use(express.static('script'));

//register view engine
app.set('view engine','ejs');
app.set('views','view');



app.get('/error',(req,res) =>{
    res.render('error',{title: 'Error',message:''});
});

app.get('/',(req,res) =>{
    res.render('index',{title: 'Electrical HVAC Plumbing'});
});
app.get('/signup',(req,res) =>{
  res.render('signup',{title: 'Sign Up'});
});


app.post('/phuc/user',(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Field value: "+email+" password: "+password);
  res.redirect('/signup');
})

app.post("/user/login", controller.getUserLogin);

/*
app.get('/getUsers',db.getUsers);
app.get('/getUserID/:id',db.getUserByID);//use this,http://localhost:5900/getUserID/2
app.post('/insertUser',db.insertUser)//To test with curl: curl -X POST http://localhost:5900/insertUser -H "Content-Type: application/x-www-form-urlencoded" -d "username=hantran&password=hantranPassword&email=hantran@hantran.com&created_on=now()"
*/
//CRUD routes
app.use('/user', require('./route/user'));

/*
const PORT = process.env.PORT || 5900;

app.listen(PORT,() => console.log(`Sever started on ${PORT}`));
*/

//error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });
  
  //sync database
sequelize
    .sync()
    .then(result => {
      console.log("Database connected");
      app.listen(5900);
    })
    .catch(err => console.log(err));






