// import dotenv module
require("dotenv").config()


// Create auth credentials for SignalWire
const auth = {
    username: process.env.SWusername, // Project-ID
    password: process.env.SWpassword // API token
  };

// set Space URL and the room we want to join
const apiurl = process.env.url;
const ROOMNAME = "TestRoom";
  
  
// Basic express boilerplate
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to request token for video call
app.post("/get_token", async (req, res) => {
  let { user_name } = req.body;
  console.log("Received name", user_name);
  try {
    let token = await axios.post(
      apiurl + "/room_tokens",
      {
        user_name:user_name,
        room_name: ROOMNAME,
      },

      { auth }
    );
    //console.log(token.data.token);
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});
  
//make sure to allocate our static folder for out frontend
app.use(express.static("src/frontend/"));
  
// Main function 
async function start(port) {
    app.listen(port, () => {
      console.log("Server listening at port", port);
    });
  }

// Start the server
start(8080);
  