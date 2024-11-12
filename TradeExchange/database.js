const express=require('express');
const app=express();
const port=9000;
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');
const mongoose=require('mongoose');
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Zerodha-userdetail");
}
// setting structure of database
const ContactSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
});
// locking the structure or schema
const Contact = mongoose.model("Contact", ContactSchema);
// EXPRESS SPECIFIC STUFF //
app.use('/assests',express.static('assests'));  // for serving static file in app.js
app.use(express.urlencoded({extended: true})); // to transefer all data of our website to express
// PUG SPECIFIC STUFF //
app.set('view engine','html') //set the templete engine
app.set('views',path.join(__dirname,'views')); //set the views directory                
// ENDPOINTS //





app.get("/",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/TradeExchange.html');
});

app.get("/index",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/index.html');
});
app.get("/create",(req,res)=>{
  const param={};
  res.sendFile(__dirname + '/views/create.html');
});

app.get("/zerodhalog",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/TradeExchangelog.html');
});

app.post("/index",async (req,res)=>{

  const username = req.body.name;
  // const password = req.body.password;

  //check user exists or not
  const existingUser = await Contact.find({ name: username });

  if(existingUser==false){
    res.sendFile(__dirname + '/views/create.html');
  }
  else res.sendFile(__dirname + '/views/TradeExchangelog.html');
   return;
});

app.post("/create",(req,res)=>{

   // get data from body and send it to schema
   var mydata=new Contact(req.body);

   mydata.save().then(()=>{
       //res.send("Thanks ! our experts will contact you soon......... ")
       res.sendFile(__dirname + '/views/;TradeExchangeog.html');
   })
   .catch(()=>{
       res.status(404).send("Not found");
   })
})

app.listen(port,()=>{
    console.log( {port})
});