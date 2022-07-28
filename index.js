// Import dotenv module
require("dotenv").config()

// Create auth credentials for SignalWire
const auth = {
  username: process.env.SWusername,
  password: process.env.SWpassword
}

// Set Space URL and the room we want to join
const apiurl = process.env.url;

// Basic express boilerplate
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const { application } = require("express");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs')
app.use('/views', express.static('views'));


// Endpoint to request token for video call
app.post("/get_token", async (req, res) => {
  let { user_name, roomname } = req.body;
  console.log("Received name", user_name);
  try {
    let token = await axios.post(
      apiurl + "/room_tokens",
      {
        user_name: user_name,
        room_name: roomname,
        permissions: ['room.list_available_layouts', 'room.set_layout']
      },

      { auth }
    );
    // console.log(token.data.token);
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

app.get('/', async (req, res) => {
  var rooms = ['test', 'room', 'testroom']
  res.render('index', { rooms: rooms })
})


// Start the server
async function start(port) {
  app.listen(port, () => {
    console.log("Server is on port", port)
  })
};

start(8080);
