// Use const for variables that don't get reassigned and let for variables that do
const player = document.getElementById("player");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playbtn");
const tracks = document.querySelectorAll(".track");
let currentTrackIndex = 0;

// Play a track
function playTrack(index) {
  const track = tracks[index];
  const src = track.getAttribute("data-src");
  player.src = src;
  player.play();
  currentTrackIndex = index;
  setTrackActive(index);
  updateTrackName(track.innerText);
}

// Set active track
function setTrackActive(index) {
  tracks.forEach((track, i) => {
    track.classList.toggle("active", i === index);
  });
}

// Play or pause the player
function togglePlayPause() {
  player.paused ? player.play() : player.pause();
}

// Update play/pause button icon
function updatePlayBtnIcon() {
  playBtn.classList.toggle("fa-play", player.paused);
  playBtn.classList.toggle("fa-pause", !player.paused);
}

// Update track name in player
function updateTrackName(name) {
  document.querySelector(".info").textContent = name;
}

// Update progress bar and current time
function updateProgressBar() {
  const ct = player.currentTime;
  const duration = player.duration;
  const prog = Math.floor((ct / duration) * 100);
  progress.style.setProperty("--progress", `${prog}%`);
  current.textContent = formatTime(ct);
}

// Format time to mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Add event listeners
playBtn.addEventListener("click", togglePlayPause);
player.addEventListener("play", updatePlayBtnIcon);
player.addEventListener("pause", updatePlayBtnIcon);
player.addEventListener("timeupdate", updateProgressBar);
tracks.forEach((track, i) => {
  track.addEventListener("click", () => playTrack(i));
});

// Play the first track by default
playTrack(currentTrackIndex);
