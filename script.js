const title = document.getElementById("title");
const artist = document.getElementById("artist");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");
const image = document.querySelector("img");
const progress = document.querySelector(".progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const music = document.querySelector("audio");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Bohemia",
    src: "music/jacinto-0.mp3",
    imgSrc: `img/jacinto-0.jpg`,
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Badshah",
    src: "music/jacinto-1.mp3",
    imgSrc: `img/jacinto-1.jpg`,
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jassi Gill",
    src: "music/jacinto-2.mp3",
    imgSrc: `img/jacinto-2.jpg`,
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Hardy Sandu",
    src: "music/jacinto-3.mp3",
    imgSrc: `img/jacinto-3.jpg`,
  },
];
let currentSong = 0;
let isPlaying = false;
let duration = music.duration;
const loadSong = function (currentSong) {
  image.src = songs[currentSong].imgSrc;
  title.textContent = songs[currentSong].displayName;
  artist.textContent = songs[currentSong].artist;
  music.src = songs[currentSong].src;
  progress.style.width = "0px";
};
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

const nextSong = function () {
  currentSong++;
  if (currentSong > 3) currentSong = 0;
  loadSong(currentSong);
  playSong();
};

const prevSong = function () {
  currentSong--;
  if (currentSong < 0) currentSong = songs.length - 1;
  loadSong(currentSong);
  playSong();
};

// Setting Duration and Current time on DOM
const updateProgressBar = function () {
  // Displaying Music 🎵 Duration ⏳` on DOM
  if (isPlaying) {
    const durationMinutes = Math.floor(this.duration / 60);
    let durationSeconds = Math.floor(this.duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = (durationSeconds + "").padStart(2, "0");
    }

    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    //   Displaying Current Time on DOM
    const currentMinutes = Math.floor(this.currentTime / 60);
    let currentSeconds = Math.floor(this.currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = (currentSeconds + "").padStart(2, "0");
    }
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
};
// Seting current Time of music on DOM
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
  progress.style.width = `${clickX}px`;
};

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
