const express = require('express');
const app = express();
/*
[{
  username: parth, password: 12341234: 
  token : askfjasdkfjdjadjf"
  }] */
app.use(express.json());
const users = [];

function generateToken() {// cuz whenever user sign we have to generate a token 
  let option = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",

    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
  ];
  let token = "";
  for (let i = 0; i < option.length; i++) {
    token = token + option[Math.floor(Math.random() * option.length)]
  }
  return token;
}

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
  let foundUser = null

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    const token = generateToken();
    foundUser.token = token;//this line will also store in the users array ({users, password, token}) also 
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

app.get('/me', function(req, res) {
  const token = req.headers.token;
  let foundUser = null;
  for(let i= 0; i < users.length; i++) {
    if (users[i].token == token) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password
    })
  }else {
    res.json({
      message : "token invalid" 
    })
  }
})


app.listen(3000);