const carousel = document.getElementById("about-car");
const selCont = document.getElementById("about-dots-cont");
const loader = document.querySelector(".loader");

const links = ["4lv-Ji3W9oU", "3lbRUfKTwWc", "5sH7FRg-7_Q"];
const vidsCount = links.length;
const carOptions = {
  root: null,
  rootMargin: "12px",
  threshold: 0.5,
};

let curVid = 0,
  vidTimer,
  vidsList = [],
  playersList = [],
  sels = [];

links.forEach((link, idx) => {
  let vidNode = document.createElement("div");
  vidNode.id = `play-cont-${idx + 1}`;
  vidNode.classList.add(`play-cont`);
  let vidPlayer = document.createElement("div");
  vidPlayer.id = `yt-play-${idx + 1}`;
  vidPlayer.classList.add(`yt-play`);
  let sel = document.createElement("div");
  sel.classList.add("about-dot");
  selCont.appendChild(sel);
  sels.push(sel);
  vidNode.appendChild(vidPlayer);
  carousel.appendChild(vidNode);
  vidsList.push(vidNode);
});

const changeActive = (evt) => {
  let idx = sels.indexOf(evt.target);
  if (idx !== curVid) {
    playersList[curVid].pauseVideo();
    curVid = idx;
    setTransform();
    clearInterval(vidTimer);
    vidTimer = setInterval(incrementTimer, 5000);
  }
};

const setTransform = () => {
  vidsList.forEach((vid, idx) => {
    if (vid.classList.contains("play-active")) {
      vid.classList.remove("play-active");
      sels[idx].classList.remove("about-dot-active");
    }
    if (idx === curVid) {
      vid.classList.add("play-active");
      sels[idx].classList.add("about-dot-active");
    }
  });
};

const carObsCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.target === carousel && loader.style.display === "none") {
      vidsList[0].classList.add("play-init");
      setTransform();
      vidTimer = setInterval(incrementTimer, 5000);
      observer.unobserve(carousel);
    }
  });
};

let carObserver = new IntersectionObserver(carObsCallback, carOptions);
carObserver.observe(carousel);

const incrementTimer = () => {
  curVid++;
  if (curVid >= vidsCount) {
    curVid = 0;
  }
  setTransform();
};

sels.forEach((sel) => {
  sel.addEventListener("click", changeActive);
});

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
    clearInterval(vidTimer);
    vidTimer = setInterval(incrementTimer, 5000);
  }
}
