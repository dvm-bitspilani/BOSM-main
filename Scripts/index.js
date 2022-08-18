/////////////// TIMER ANIMATION

const bosm = new Date("October 14, 2022 23:59:59").getTime();
let prev_day, prev_hr, prev_min, prev_sec;
let days, hrs, min, sec;
let temp = 0;

// setInterval(() => {
//   document.getElementById("sec").style.animation =
//     temp % 2 == 0 ? "card-flip 0.6s" : "none";
//   temp++;
// }, 500);

setInterval(() => {
  const current_time = new Date().getTime();

  // updating number of days left
  days = Math.floor((bosm - current_time) / (1000 * 60 * 60 * 24));
  days = days < 10 ? `0${days}` : days;

  // updating number of hours left (in that day)
  hrs = Math.floor((bosm - current_time) / (1000 * 60 * 60)) - days * 24;
  hrs = hrs < 10 ? `0${hrs}` : hrs;

  // updating number of minutes left (in that hour)
  min =
    Math.floor((bosm - current_time) / (1000 * 60)) - days * 24 * 60 - hrs * 60;
  min = min < 10 ? `0${min}` : min;

  // // updating number of seconds left (in that min)
  // sec =
  //   Math.floor((bosm - current_time) / 1000) -
  //   days * 24 * 60 * 60 -
  //   hrs * 60 * 60 -
  //   min * 60;
  // sec = sec < 10 ? `0${sec}` : sec;

  // when timer is completed (BOSM arrives)
  if (days < 0) {
    days = "00";
    hrs = "00";
    min = "00";
    // sec = "00";
  }

  // adding animation to timer cards
  document.getElementById("days").style.animation =
    prev_day != days ? "card-flip 0.6s" : "none";
  document.getElementById("hours").style.animation =
    prev_hr != hrs ? "card-flip 0.6s" : "none";
  document.getElementById("min").style.animation =
    prev_min != min ? "card-flip 0.6s" : "none";

  // updating the temporary variables
  prev_day = days;
  prev_hr = hrs;
  prev_min = min;
  // prev_sec = sec;

  // updating the divs
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hrs;
  document.getElementById("min").innerText = min;
  // document.getElementById("sec").innerText = sec;
}, 1000);

////////// RANDOM STARS

// let stars = "";
// const sc_factor = Math.random() * 0.1 + 0.25;
// let height = window.innerHeight;
// let width = window.innerWidth;
// let star_count = (height * width * sc_factor) / 1000;

// const add_stars = () => {
//   stars = "";
//   for (let i = 0; i < star_count; i++) {
//     let class_int = Math.random();
//     let offset_x = Math.random() * 1;
//     let offset_y = Math.random() * 1;

//     if (class_int < 0.5) {
//       stars = `${stars}\n
//       <div class="star-type1 star" style="left: ${offset_x * width}px; top: ${
//         offset_y * height
//       }px"></div>`;
//     } else {
//       stars = `${stars}\n
//       <div class="star-type2 star" style="left: ${offset_x * width}px; top: ${
//         offset_y * height
//       }px"></div>`;
//     }
//   }
//   stars_cont.innerHTML = stars;
// };

// add_stars();

////////// AUDIO FILES

let sound = new Audio("Assets/switchsound.mp3");

function flicker() {
  sound.volume = 0.3;
  sound.playbackRate = 1.2;
  sound.play();
}

////////// LINES Transform

// const lines = document.getElementsByClassName('lines')
// let scroll = window.pageYOffset;
// let rate = (scroll * 0.5) - 750;
// lines[0].style.transform = 'translate3d(0px,' + rate + 'px,0px)';
// document.addEventListener('scroll', () => {
//   lines[0].style.transform = 'translate3d(0px,' + rate + 'px,0px)';
// })

////////// LOADER EVENTS

let body = document.querySelector("body");

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const light = document.getElementsByClassName("light");

  if (document.getElementById("video").readyState === 4) {
    const hide = document.querySelector(".hide");
    hide.style.animation = "appear 3s";

    setTimeout(() => {
      hide.style.opacity = 0.9;
    }, 2901);
  }

  loader.addEventListener("click", () => {
    const fred = document.getElementsByClassName("fall-red");
    const fblue = document.getElementsByClassName("fall-blue");
    const fyellow = document.getElementsByClassName("fall-yellow");
    const loop1 = [fred, fblue, fyellow];

    const bred = document.querySelector(".bg-red");
    const bblue = document.querySelector(".bg-blue");
    const byellow = document.querySelector(".bg-yellow");
    let loop2 = [bred, bblue, byellow];

    const appear = [
      document.querySelector("#bosm"),
      document.querySelector("#bosmr"),
    ];

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    loader.style.animation = "fade-out 1s ease-out";
    body.style.overflowY = "scroll";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);

    setTimeout(() => {
      flicker();
    }, 1000);

    light[0].style.animation = "flicker 2s 1s";
    light[1].style.animation = "flicker 2s 2.3s";
    light[2].style.animation = "flicker 2s 1.5s";

    bred.style.animation = "flicker 2s 1s";
    bblue.style.animation = "flicker 2s 2.3s";
    byellow.style.animation = "flicker 2s 1.5s";

    for (let i = 0; i < 3; i++) loop2[i].style.opacity = 0;
    for (let i = 0; i < 2; i++) appear[i].style.opacity = 0;

    for (let i = 0; i < 3; i++) {
      light[i].style.opacity = 0;
      fred[i].style.animation = "fall-red 52s linear 2.4s infinite";
      fblue[i].style.animation = "fall-blue 52s linear 2.4s infinite";
      fyellow[i].style.animation = "fall-yellow 52s linear 2.4s infinite";
    }

    setTimeout(() => {
      for (let i = 0; i < 3; i++) loop1[i][0].style.opacity = 1;
    }, 3000);

    setTimeout(() => {
      for (let i = 0; i < 3; i++) loop1[i][1].style.opacity = 1;
    }, 3500);

    setTimeout(() => {
      for (let i = 0; i < 3; i++) loop1[i][2].style.opacity = 1;
    }, 3300);

    setTimeout(() => {
      document.getElementById("lightRed").style.opacity = 1;
      bred.style.opacity = 1;
    }, 3000);

    setTimeout(() => {
      document.getElementById("lightBlue").style.opacity = 1;
      bblue.style.opacity = 1;
    }, 3500);

    setTimeout(() => {
      document.getElementById("lightYellow").style.opacity = 1;
      byellow.style.opacity = 1;
    }, 3300);

    setTimeout(() => {
      for (let i = 0; i < 2; i++) appear[i].style.animation = "fade-in 1.7s";
    }, 3000);

    setTimeout(() => {
      for (let i = 0; i < 2; i++) appear[i].style.opacity = 1;
    }, 4700);

    if (screen.width < 801) {
      for (let i = 0; i < 3; i++) {
        fred[i].style.animation = "fall-red-2 52s linear 2.4s infinite";
        fblue[i].style.animation = "fall-blue-2 52s linear 2.4s infinite";
        fyellow[i].style.animation = "fall-yellow-2 52s linear 2.4s infinite";
      }

      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          loop1[i][j].setAttribute("src", "Assets/smol.png");
    } else {
      for (let i = 0; i < 3; i++) {
        fred[i].setAttribute("src", "Assets/fall-red-big.png");
        fblue[i].setAttribute("src", "Assets/fall-blue-big.png");
        fyellow[i].setAttribute("src", "Assets/fall-yellow-big.png");
      }
    }
  });
});

////////// CONTACT POP-UP

const texts = document.querySelectorAll(".number");
const mails = document.querySelectorAll(".mail");
const copied = document.getElementById("copied");
const textarea = document.createElement("textarea");

texts.forEach((text) => {
  text.addEventListener("click", () => {
    copyText(text);
  });
});

mails.forEach((text) => {
  text.addEventListener("click", () => {
    copyText(text);
  });
});

function copyText(text) {
  console.log(text);

  // copied.style.transform = `translateY(${})`
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.opacity = 0;
  textarea.style.pointerEvents = "none";
  textarea.value = text.innerText;

  document.body.appendChild(textarea);
  navigator.clipboard.writeText(textarea.value);
  textarea.select();

  setTimeout(() => {
    copied.style.opacity = 0;
  }, 1000);
}

////////// HAMBURGER EVENTS

let open = false;
let right = document.querySelector(".right");
let hamGrid = document.querySelector(".ham-grid");
let hamImg = document.querySelector(".ham-img img");
let hamText = document.querySelector(".ham-text img");
let hamLogo = document.querySelector(".ham-logo");
let hamIcons = document.querySelector(".ham-icons");
let hamLinks = document.querySelector(".ham-links");
let hamLine = document.querySelectorAll(".hamburger span");
let hamLink = document.querySelectorAll(".ham-links div a");

document.querySelector(".hamburger").addEventListener("click", () => {
  if (!open) {
    // hamburger menu opens
    open = true;
    hamGrid.style.display = "grid";
    body.style.overflowY = "hidden";

    // right nav position
    right.style.position = "fixed";
    right.style.top = "1rem";
    right.style.right = "0";

    // opening animations
    hamImg.style.animation = "come-right 1s linear";
    hamText.style.animation = "come-left 1s linear";
    hamLogo.style.animation = "come-down 1s linear";
    hamIcons.style.animation = "come-up 1s linear";
    hamLinks.style.animation = "come-up 1s linear";

    // links appear
    for (let i = 1; i <= 4; i++) {
      hamLink[i - 1].style.animation = `link-up 0.4s ${0.4 + i * 0.4}s`;
      setTimeout(() => {
        hamLink[i - 1].style.opacity = 1;
      }, 800 + i * 400);
    }

    // hamburger animations
    hamLine[0].style.animation = "ham-up-1 0.4s linear";
    hamLine[1].style.opacity = 0;
    hamLine[2].style.animation = "ham-down-1 0.4s linear";

    setTimeout(() => {
      hamLine[2].style.width = "25px";
      hamLine[2].style.top = "13.2px";
      hamLine[2].style.transform = "rotate(-45deg)";

      hamLine[0].style.width = "25px";
      hamLine[0].style.top = "13.2px";
      hamLine[0].style.transform = "rotate(45deg)";
    }, 400);
  } else {
    // hamburger menu closes
    open = false;
    setTimeout(() => {
      hamGrid.style.display = "none";
      body.style.overflowY = "scroll";
    }, 700);

    // right nav position
    right.style.position = "relative";
    right.style.top = "0";
    right.style.right = "0";

    // closing animations
    hamImg.style.animation = "go-left 0.7s linear";
    hamText.style.animation = "go-right 0.7s linear";
    hamLogo.style.animation = "go-up 0.7s linear";
    hamIcons.style.animation = "go-down 0.7s linear";
    hamLinks.style.animation = "go-down 0.7s linear";

    // links disappear
    for (let i = 1; i <= 4; i++) {
      hamLink[i - 1].style.opacity = 0;
    }

    // hamburger animations
    hamLine[0].style.animation = "ham-up-2 0.4s linear";
    hamLine[1].style.opacity = 1;
    hamLine[2].style.animation = "ham-down-2 0.4s linear";

    setTimeout(() => {
      hamLine[2].style.width = "13px";
      hamLine[2].style.top = "25.4px";
      hamLine[2].style.transform = "none";

      hamLine[0].style.width = "35px";
      hamLine[0].style.top = "1px";
      hamLine[0].style.transform = "none";
    }, 400);
  }
});
