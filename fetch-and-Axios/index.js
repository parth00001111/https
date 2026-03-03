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

app.listen(3000);
//The difference is query and params