/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
 
const bGround = require('fcc-express-bground');
const myApp = require('./myApp');
const express = require('express');
require('dotenv').config()
const app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use((req, res, next) => {
    const allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    const origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    } 
    next();
  });
}
app.use("/public", express.static(__dirname + "/public"))

app.get('/', (req,res)=> {
  absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath)
})

app.get("/json", (req,res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ "message": "Hello json".toUpperCase() })
  } else {
    res.json({ "message": "Hello json" })
  }
})

const port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, () => {
  bGround.log(`Node is listening on port ${port}...`);
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

