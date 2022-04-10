express = require("express");
path = require("path");
const mysql = require('mysql');
const bodyParser = require("body-parser");
const model = require("./models/model")

app = express();
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'))

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"view", "index.html"))
});

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname, "view", "signup.html"))
})

app.post("/signup", (req, res)=>{
  const {name, email, password} = req.body;
  model.signup(`${email} ${password}`);
})

app.post("/login", (req, res)=>{
  const {email, password} = req.body;
  console.log(model.login(email, password))
  auth = model.login(email, password);
  if(auth)
    return res.redirect("/home")
  else{
    console.log("incorrect id Password")
    return res.redirect("/login")
  }

})

app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname, "view", "login.html"))
})

app.get("/home", (req, res)=>{
  res.sendFile(path.join(__dirname, "view", "home.html"))
})

app.listen(5000,() => {console.log("server started")});