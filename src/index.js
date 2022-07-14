// Import dotenv module
require("dotenv").config()

// Create auth credentials for SignalWire
const auth= {
    username: process.env.SWusername,
    password: process.env.SWpassword
}

// Set Space URL and the room we want to join
const apiurl = process.env.url;
const roomname = "TestRoom";

// Basic express boilerplate
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const {application} = require("express");

const app =  express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("src/frontend/"));


// Endpoint to request token for video call
app.post("/get_token", async (req, res) => {
    let { user_name } = req.body;
    console.log("Received name", user_name);
    try {
      let token = await axios.post(
        apiurl + "/room_tokens",
        {
          user_name:user_name,
          room_name: roomname,
        },
  
        { auth }
      );
      console.log(token.data.token);
      return res.json({ token: token.data.token });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

// Make sure to allocate our static folder for out frontend
  
// Run checks and start the server only if successful
  
// Start the server
async function start(port){
    app.listen(port,() =>{
        console.log("Server is on port", port)
    })
};

start(8080);
