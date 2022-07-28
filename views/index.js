// Set up some client-side variables
const $ = (x) => document.getElementById(x);
const backendurl = "";

let room;

// Create a controller that will show/hide the required forms and divs

// Create a function that handles our 'login' form
async function joinwithusername() {
  let username = $("usernameinput").value.trim();
  let roomname = $("rooms").value.trim();
  console.log("joined as " + username);

  try {
    let tokens = await axios.post(backendurl + "/get_token", {
      user_name: username,
      roomname: roomname
    })

    let token = tokens.data.token;
    console.log("Setting up RTC session");
    room = new SignalWire.Video.RoomSession({
      token,
      rootElement: document.getElementById("root"),
      audio: true,
      video: true
    });
    $('getusername').style.display = "none"
    $('loading').style.display = "block"
    await room.join();
    $('videoroom').style.display = "block"
    $('loading').style.display = "none"

    let layoutList = await room.getLayouts()
    console.log(layoutList)
    for (layout in layoutList.layouts) {
      let opt = document.createElement('option')
      opt.value = layoutList.layouts[layout]
      opt.innerText = layoutList.layouts[layout]
      $('layouts').appendChild(opt)
    }

  }
  catch (e) {
    console.log(e)
  }
}

async function setLayout() {
  let layout = $('layouts').value
  await room.setLayout({ name: layout })
}

async function leave_room() {
  await room.hangup();
  $('videoroom').style.display = "none"
  $('getusername').style.display = "block"
}

async function audio_mute() {
  await room.audioMute()
  console.log("muted")
}

async function audio_unmute() {
  await room.audioUnmute()
  console.log("unmuted")
}

async function video_mute() {
  await room.videoMute()
  console.log("muted")
}

async function video_unmute() {
  await room.videoUnmute()
  console.log("unmuted")
}

let screenShareObj;
async function screen_share() {
  if (room === undefined) return;
  screenShareObj = await room.startScreenShare({
    audio: true,
    video: true
  })
}