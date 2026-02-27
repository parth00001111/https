const express = require("express")
const app = express(); 
app.use(express.json())
const user = [{
    name : "parth", 
    kidneys : [{
        healthy : false
    }]
}];

app.get("/", function(req, res) {
    const parthKidneys = user[0].kidneys;
    const totalKid = parthKidneys.length; 
    let healthy = 0; 
    for (let i = 0; i < totalKid; i++) {
        if (parthKidneys[i].healthy) {
            healthy++; 
        }
    }
    const unhealthy = totalKid - healthy; 
    res.json({
        totalKid,
        healthy, 
        unhealthy
    })

})

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy; 
    user[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({msg: "done"});
})
app.put("/", function(req, res) {
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (user[0].kidneys[i].healthy === false) {
            user[0].kidneys[i].healthy = true;
        }
    }
    res.json({msg: "done"})
})
app.listen(3000);