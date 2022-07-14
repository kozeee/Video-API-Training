// Set up some client-side variables
const $ = (x) => document.getElementById(x);
const backendurl = "";

let room;

// Create a controller that will show/hide the required forms and divs

// Create a function that handles our 'login' form
  async function joinwithusername(){
    let username = $("usernameinput").value.trim();
    console.log(username);
    
    try{
      let tokens = await axios.post(backendurl+"/get_token",{
        user_name:username
      })
    
    let token = tokens.data.token;
    console.log(token)
  }
  catch(e){
    console.log(e);
  }
}

// Create a function to allow users to leave the call.

// Create a function that allows users to share their screen

// Create functions that allow users to interact with our video room

  //Audio Mute and Unmute

  //Video Mute and Unmute

//Make sure we land on the correct page when loading
