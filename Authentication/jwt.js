//JWT (JSON WEB TOKEN)
// store these token in a variable and in the data base also\
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const JWT_SECRET = "token"
/*
[{
  username: parth, password: 12341234: 
  token : askfjasdkfjdjadjf"
  }] */
app.use(express.json());
const users = [];// temporary data base ka kaam krega
//when server will restart all data will be reinitialized.



app.post("/sign-up", function (req, res) {
  const username = req.body.username;

  const password = req.body.password;
  users.push({
    username: username,
    password: password
  })
  res.json({
    msg: "you have signed up"
  })

})
app.post("/sign-in", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // maps and filter for this concept;
  /*const user = users.find(function(u) {
    if (u.username == username && u.password == password) {
      return true;
    }else {
      return false;
    }
      */
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    const token = jwt.sign({
      username: username
    }, JWT_SECRET);//converting their username to a JWT using JWT_SECRET;



    res.json({
      token: token
    })

  } else {
    res.status(403).send({
      msg: "invalid username and password"
    })
  }
  console.log(users)

})

app.get('/me', function (req, res) {
  const token = req.headers.token;
  const decode = jwt.verify(token, JWT_SECRET);

  const username = decode.username;
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {

      foundUser = users[i];
    }

  }
  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password
    })
  } else {
    res.json({
      msg: "token invalid"
    })
  }

})


app.listen(3000);