const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');

const app = express();

app.use(express.static('public'));

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
  res.render("main");
})
app.post("/", (req,res) => {
  const ip = req.body.IP ;

  http.get("http://ip-api.com/json/"+ip, (response)=>{
    response.on("data", (data)=>{
      const ipData = JSON.parse(data);
      res.render("result", {ipData:ipData});
    })
  })
})
app.listen(3000, ()=>{
  console.log("Running on Port:3000");
})
