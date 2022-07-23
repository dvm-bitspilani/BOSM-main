const carousel = document.getElementById("about-car");
const selCont = document.getElementById("about-dots-cont");

const links = ["4lv-Ji3W9oU", "3lbRUfKTwWc", "5sH7FRg-7_Q"];

const vidsCount = links.length;

let curVid = 0;
let prevVid = 0;
let vidTimer;
let vidsList = [];
let playersList = [];
let sels = [];

links.forEach((link, idx) => {
  let vidNode = document.createElement("div");
  vidNode.id = `play-cont-${idx + 1}`;
  vidNode.classList.add(`play-cont`);
  let vidPlayer = document.createElement("div");
  vidPlayer.id = `yt-play-${idx + 1}`;
  vidPlayer.classList.add(`yt-play`);
  let sel = document.createElement("div");
  sel.classList.add("dot");
  selCont.appendChild(sel);
  sels.push(sel);
  vidNode.appendChild(vidPlayer);
  carousel.appendChild(vidNode);
  vidsList.push(vidNode);
});

const changeActive = (evt) => {
  let idx = sels.indexOf(evt.target);
  prevVid = curVid;
  curVid = idx;
  setTransform();
  clearInterval(vidTimer);
  vidTimer = setInterval(incrementTimer, 5000);
};

const setTransform = () => {
  vidsList.forEach((vid, idx) => {
    if (vid.classList.contains("play-active")) {
      vid.classList.remove("play-active");
      sels[idx].classList.remove("active");
    } else if (vid.classList.contains("play-next")) {
      vid.classList.remove("play-next");
    } else if (vid.classList.contains("play-prev")) {
      vid.classList.remove("play-prev");
    }
    if (idx >= curVid) {
      vid.style.setProperty("--offset", idx - curVid);
    } else if (idx < curVid) {
      vid.style.setProperty("--offset", vidsCount - curVid + idx);
    }
    if (idx - curVid === 0) {
      vid.classList.add("play-active");
      vid.style.visibility = "visible";
      sels[idx].classList.add("active");
    } else if (idx - curVid === 1 || (curVid === vidsCount - 1 && idx === 0)) {
      vid.classList.add("play-next");
      vid.style.visibility = "visible";
    } else if (curVid - idx === 1 || (curVid === 0 && idx === vidsCount - 1)) {
      vid.classList.add("play-prev");
      setTimeout(() => (vid.style.visibility = "hidden"), 500);
    }
  });
};

const incrementTimer = () => {
  prevVid = curVid;
  curVid++;
  if (curVid >= vidsCount) {
    curVid = 0;
  }
  setTransform();
};

sels.forEach((sel) => {
  sel.addEventListener("click", changeActive);
});

vidTimer = setInterval(incrementTimer, 5000);

// Load the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
  links.forEach((link, idx) => {
    playersList[idx] = new YT.Player(`yt-play-${idx + 1}`, {
      height: "100%",
      width: "100%",
      videoId: link,
      controls: 0,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  });
}

function onPlayerReady() {
  console.log("%c MADE WITH LOVE BY DVM", "color:#eeecec;font-size:20px");
}

function onPlayerStateChange(evt) {
  let myPlayerState = evt.data;
  if (myPlayerState === 1 || myPlayerState === 3) {
    clearInterval(vidTimer);
    // PAUSE SLIDER
  } else if (myPlayerState === 2 || myPlayerState === 0) {
    vidTimer = setInterval(incrementTimer, 5000);
  }
}
