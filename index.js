/*********************************************
 *                                           *|
 *              MUSIC PLAYER VER 2           *|
 *                                           *|
 * *******************************************/

//All variables:

let song = new Audio(); //Audio object
let current_song = 0; //Current song
let autoplay = document.getElementById("autoplay"); //Autoplay for non-media devices
let auto_media = document.getElementById("auto-media"); // Autoplay for media devices
let autoplay_tracker = 0; // Autoplay activator
let shuffle = document.getElementById("shuffle"); //Shuffle for non-media devices
let shuffle_media = document.getElementById("shuffle-media"); //Shuffle for media devices
let shuffle_tracker = 0; //Shuffle activator
let songname = document.getElementById("songname"); //Song Names for display
let songtime = document.getElementById("songtime"); //Song duration
let songposter = document.getElementById("songposter"); //Song image
let volume = document.getElementById("volume"); //Volume (only for non-media devices)
let volume_img = document.getElementById("volume-img"); //Volume image
let playorpause = document.getElementById("playnpause"); //Play and Pause buttons
let play_media = document.getElementById("play-media"); //Play and pause buttons for media devices
let namelist = document.getElementById("list"); //For displaying song names
let width = screen.width; //for screen width
let height = screen.height; //for screen height
let tracker = 1; //Toggle tracker

let songsList = [
  "Assets/Songs/Song_1.mp3",
  "Assets/Songs/Song_2.mp3",
  "Assets/Songs/Song_3.mp3",
  "Assets/Songs/Song_4.mp3",
  "Assets/Songs/Song_5.mp3",
  "Assets/Songs/Song_6.mp3",
  "Assets/Songs/Song_7.mp3",
  "Assets/Songs/Song_8.mp3",
  "Assets/Songs/Song_9.mp3",
  "Assets/Songs/Song_10.mp3",
  "Assets/Songs/Song_11.mp3",
  "Assets/Songs/Song_12.mp3",
  "Assets/Songs/Song_13.mp3",
  "Assets/Songs/Song_14.mp3",
  "Assets/Songs/Song_15.mp3"
];

let songNames = [
  "Ekadantaya Vakratundaya",
  "Grand Theft Auto V Theme",
  "Made in Abyss Season 1 Opening",
  "We Are! (One Piece, Straw Hats Version)",
  "Kaun Kehte Hain Bhagwaan Aate Nahi",
  "Mitti Di Kushboo - Aayushmaan Khuranna Cover",
  "Seigi Sikkou - One Punch Man OST",
  "Bohemian Rhapsody - Queen",
  "Dovahkiin - Song of the Dragon Born",
  "Hashire - HunterxHunter OST",
  "Bhaag D.K. Bose - Delhi Belly",
  "Neon Genesis: Evangelion Opening",
  "Sono Chi No Kiouku; End of ZA WARUDO - JoJo's Bizarre Adventures Season 3 Opening",
  "Avengers Theme Song",
  "Roundabout - Yes"
];

let songPos = [
  "Assets/Pictures/Pos_1.jpg",
  "Assets/Pictures/Pos_2.jpg",
  "Assets/Pictures/Pos_3.jpg",
  "Assets/Pictures/Pos_4.jpg",
  "Assets/Pictures/Pos_5.jpg",
  "Assets/Pictures/Pos_6.jpg",
  "Assets/Pictures/Pos_7.jpg",
  "Assets/Pictures/Pos_8.jpg",
  "Assets/Pictures/Pos_9.jpg",
  "Assets/Pictures/Pos_10.jpg",
  "Assets/Pictures/Pos_11.jpg",
  "Assets/Pictures/Pos_12.jpg",
  "Assets/Pictures/Pos_13.jpg",
  "Assets/Pictures/Pos_14.jpg",
  "Assets/Pictures/Pos_15.jpg"
];

// Initializations:

song.src = songsList[current_song];
songname.textContent = songNames[current_song];
songposter.src = songPos[current_song];

//Song duration event listener

song.addEventListener("timeupdate", function() {
  songtime.textContent =
    calculateTime(song.currentTime) + " / " + calculateTime(song.duration);
});

//Autoplay event listener

autoplay.addEventListener("click", function() {
  if (autoplay_tracker === 0) {
    autoplay.src = "Assets/Buttons/auto-play-active.png";
    auto_media.src = "Assets/Buttons/auto-play-active.png";
    autoplay_tracker = 1;
  } else {
    autoplay.src = "Assets/Buttons/auto-play-inactive.png";
    auto_media.src = "Assets/Buttons/auto-play-inactive.png";
    autoplay_tracker = 0;
  }
});

//Autoplay for media devices

auto_media.addEventListener("click", function() {
  if (autoplay_tracker === 0) {
    auto_media.src = "Assets/Buttons/auto-play-active.png";
    autoplay.src = "Assets/Buttons/auto-play-active.png";
    autoplay_tracker = 1;
  } else {
    auto_media.src = "Assets/Buttons/auto-play-inactive.png";
    autoplay.src = "Assets/Buttons/auto-play-inactive.png";
    autoplay_tracker = 0;
  }
});

//Shuffle event listener

shuffle.addEventListener("click", function() {
  if (shuffle_tracker === 0) {
    shuffle.src = "Assets/Buttons/shuffle-active.png";
    shuffle_media.src = "Assets/Buttons/shuffle-active.png";
    shuffle_tracker = 1;
  } else {
    shuffle.src = "Assets/Buttons/shuffle-inactive.png";
    shuffle_media.src = "Assets/Buttons/shuffle-inactive.png";
    shuffle_tracker = 0;
  }
});

//Shuffle for media devices

shuffle_media.addEventListener("click", function() {
  if (shuffle_tracker === 0) {
    shuffle_media.src = "Assets/Buttons/shuffle-active.png";
    shuffle.src = "Assets/Buttons/shuffle-active.png";
    shuffle_tracker = 1;
  } else {
    shuffle_media.src = "Assets/Buttons/shuffle-inactive.png";
    shuffle.src = "Assets/Buttons/shuffle-inactive.png";
    shuffle_tracker = 0;
  }
});

//Volume slider

volume.oninput = function() {
  if (this.value <= 0) {
    volume_img.src = "Assets/Buttons/volume-mute.png";
  } else {
    volume_img.src = "Assets/Buttons/volume-unmute.png";
  }
  song.volume = this.value / 100;
};

//Duration bar

song.addEventListener("timeupdate", function() {
  let pos = song.currentTime / song.duration;
  duration.value = pos * 100;
});

duration.oninput = function() {
  song.currentTime = (this.value * song.duration) / 100;
};

//Autoplayer

song.addEventListener("ended", function() {
  if (autoplay_tracker === 1) {
    AutoPlay();
  } else {
    return null;
  }
});

//Media-based event listener

document.getElementById("toggler").addEventListener("click", function() {
  if (tracker === 0) {
    document.getElementById("toggled").style.display = "flex";
    tracker = 1;
  } else {
    document.getElementById("toggled").style.display = "none";
    tracker = 0;
  }
});

// Functions:

function PlaySong() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}

function PlayNPause() {
  if (song.paused) {
    playorpause.src = "Assets/Buttons/pause.png";
    play_media.src = "Assets/Buttons/pause.png";
  } else {
    playorpause.src = "Assets/Buttons/play.png";
    play_media.src = "Assets/Buttons/play.png";
  }
  PlaySong();
}

function AutoPlay() {
  if (shuffle_tracker === 1) {
    Shuffle();
  } else {
    current_song++;
  }
  if (current_song > songsList.length - 1) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  if (width <= 480 && songname.textContent.length > 23) {
    songname.textContent = songname.textContent.slice(0, 22) + "...";
  }
  songposter.src = songPos[current_song];
  song.play();
}

function Shuffle() {
  let random = Math.random();
  random = random * songsList.length;
  random = parseInt(random);
  current_song = random;
  if (current_song > songsList.length) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  if (width <= 480 && songname.textContent.length > 23) {
    songname.textContent = songname.textContent.slice(0, 22) + "...";
  }
  songposter.src = songPos[current_song];
}

function NextSong() {
  if (shuffle_tracker === 1) {
    Shuffle();
  }
  current_song++;
  if (current_song > songsList.length - 1) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  if (width <= 480 && songname.textContent.length > 23) {
    songname.textContent = songname.textContent.slice(0, 22) + "...";
  }
  songposter.src = songPos[current_song];
  PlayNPause();
}

function PrevSong() {
  if (shuffle_tracker === 1) {
    Shuffle();
  }
  current_song--;
  if (current_song < 0) {
    current_song = songsList.length - 1;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  if (width <= 480 && songname.textContent.length > 23) {
    songname.textContent = songname.textContent.slice(0, 22) + "...";
  }
  songposter.src = songPos[current_song];
  PlayNPause();
}

function SongList() {
  for (let i in songNames) {
    let listings = document.createElement("li");
    let poster = document.createElement("img");
    let names = document.createElement("p");
    listings.insertAdjacentElement("beforeend", names);
    listings.insertAdjacentElement("afterbegin", poster);
    listings.dataset.value = i;
    listings.addEventListener("click", function() {
      current_song = parseInt(listings.dataset.value);
      song.src = songsList[current_song];
      songname.textContent = songNames[current_song];
      if (width <= 480 && songname.textContent.length > 23) {
        songname.textContent = songname.textContent.slice(0, 22) + "...";
      }
      songposter.src = songPos[current_song];
      PlayNPause();
    });
    poster.src = songPos[i];
    names.innerText = songNames[i];
    namelist.insertAdjacentElement("beforeend", listings);
  }
}
SongList();

function calculateTime(currentTime) {
  let current_minute = parseInt(currentTime / 60) /* % 60*/,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time =
      (current_minute < 10 ? "0" + current_minute : current_minute) +
      ":" +
      (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}
