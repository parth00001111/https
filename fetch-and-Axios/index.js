const express = require('express');
const app = express();

app.get("/add/:a/:b", function (req, res) {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (a === null || b === null) {
    res.status(404).send("invalid");
  } else {
    res.status(200).json(a + b);
  }
});

app.get('/me', function(req, res) {
  const token = req.headers.token;
  const foundUser = null;
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
//The difference is query and params