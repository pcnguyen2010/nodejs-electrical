const User = require('../model/user');

// CRUD Controllers

exports.getTest = (req,res) => {
  res.redirect("/");
}
//get all users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}



//get user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            //res.status(200).json({ user: user });
            res.render('user',{title: 'View user',user});
        })
        .catch(err => console.log(err));
}

//create user
exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const user_name = req.body.user_name;
  const password = req.body.password;

  User.create({
    name: name,
    email: email,
    user_name: user_name,
    password: password
  })
    .then(result => {
      console.log('Created User');
      /*
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
      */
      res.redirect("/");

    })
    .catch(err => {
      console.log(err);
    }); 
}

//update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedUserName = req.body.user_name;
  const updatedPassword = req.body.password;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      user.name = updatedName;
      user.email = updatedEmail;
      user.user_name = updatedUserName;
      user.password = updatedPassword;
      return user.save();
    })
    .then(result => {
      //res.status(200).json({message: 'User updated!', user: result});
      res.redirect("/");
    })
    .catch(err => console.log(err));
}

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => console.log(err));
}

//login.user
exports.getUserLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  User.findAll({
    where: {
      email: email,
      password: password
    },
    //raw: true,
  }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
          
        if(user.length > 0){
          console.log("Yeah I got it",user[0].id);
          res.redirect("/user/"+user[0].id);
        }else{
          //res.redirect('/error?message=WrongUser');
          res.render('error',{title: 'Error',message:'Wrong User'});
        }
        
      })
      .catch(err => console.log(err));


}