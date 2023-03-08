// declare variables using let or const
const player = document.getElementById("player");
const progress = document.getElementById("progress");
const playbtn = document.getElementById("playbtn");
const tracks = document.querySelectorAll(".track");
let currentTrackIndex = 0;

// play a track
function playTrack(index) {
  const track = tracks[index];
  const src = track.getAttribute("data-src");
  player.src = src;
  player.play();
  currentTrackIndex = index;
  setTrackActive(index);

  // update track name in player
  const trackName = track.innerText;
  document.querySelector(".info").innerText = trackName;
}

// set active track
function setTrackActive(index) {
  tracks.forEach(function (track, i) {
    if (i === index) {
      track.classList.add("active");
    } else {
      track.classList.remove("active");
    }
  });
}

// play or pause the player
function playpause() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

// add event listener to play/pause button
playbtn.addEventListener("click", playpause);

// change icon when player is played or paused
player.onplay = function () {
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
};

player.onpause = function () {
  playbtn.classList.add("fa-play");
  playbtn.classList.remove("fa-pause");
};

// update progress bar and current time
player.ontimeupdate = function () {
  const ct = player.currentTime;
  current.innerHTML = timeFormat(ct);
  // update progress
  const duration = player.duration;
  const prog = Math.floor((ct * 100) / duration);
  progress.style.setProperty("--progress", prog + "%");
};

// format time to mm:ss
function timeFormat(ct) {
  let minutes = Math.floor(ct / 60);
  let seconds = Math.floor(ct % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

// add event listener to each track
tracks.forEach(function (track, i) {
  track.addEventListener("click", function () {
    playTrack(i);
  });
});

// play the first track by default
playTrack(currentTrackIndex);
