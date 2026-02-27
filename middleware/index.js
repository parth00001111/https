const express = require("express");
const app = express();

//function that return a boolean if age in more than 14

// function checker(age) {
//   if (age >= 14) {
//     return true;
//   } else false;
// }

function isOldEnoughMiddleware(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.status(411).json({
      msg: "you cannot take this ride",
    });
  }
}
// app.get("/ride1", function (req, res) {
//   if (checker(req.query.age)) {
//     res.json({
//       msg: "You have successfully riden the ride 1",
//     });
//   } else
//     res.status(401).json({
//       msg: "you cannot take the ride1",
//     });
// });

// app.get("/ride2", function (req, res) {
//   if (checker(req.query.age)) {
//     res.json({
//       msg: "you can take the ride",
//     });
//   } else
//     res.status(411).json({
//       msg: "you cannot take the ride",
//     });
// });

// these are also the way to do this but middleware works good here

app.use(isOldEnoughMiddleware);
app.get("/ride1", (req, res)=> {
  res.json({
    msg: "you have ridden the ride",
  });
});

// app.listen(3000);
