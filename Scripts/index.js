/////////////// TIMER ANIMATION

const bosm = new Date("October 15, 2022 23:59:59").getTime();
let prev_days, prev_hrs, prev_min, days, hrs, min;

let count = setInterval(() => {
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

  // when timer is completed (BOSM arrives)
  if (days < 0) {
    days = "00";
    hrs = "00";
    min = "00";
  }

  // adding animation to timer cards
  document.getElementById("days").style.animation =
    prev_days != days ? "card-flip 0.6s" : "none";
  document.getElementById("hours").style.animation =
    prev_hrs != hrs ? "card-flip 0.6s" : "none";
  document.getElementById("mins").style.animation =
    prev_min != min ? "card-flip 0.6s" : "none";

  // updating the temporary variables
  prev_days = days;
  prev_hrs = hrs;
  prev_min = min;

  // updating the divs
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hrs;
  document.getElementById("mins").innerHTML = min;
}, 2000);

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

let sound = new Audio("../Assets/switchsound.mp3");

function flicker() {
  sound.volume = 0.6;
  sound.play();
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    flicker();
  }, 500);
});

////////// LINES Transform

// const lines = document.getElementsByClassName('lines')
// let scroll = window.pageYOffset;
// let rate = (scroll * 0.5) - 750;
// lines[0].style.transform = 'translate3d(0px,' + rate + 'px,0px)';
// document.addEventListener('scroll', () => {
//   lines[0].style.transform = 'translate3d(0px,' + rate + 'px,0px)';
// })

////////// SPOTLIGHT EFFECT

setTimeout(() => {
  document.getElementById("lightRed").style.opacity = 1;
  document.querySelector(".bg-red").style.opacity = 1;
}, 3000);

setTimeout(() => {
  document.getElementById("lightBlue").style.opacity = 1;
  document.querySelector(".bg-blue").style.opacity = 1;
}, 3500);

setTimeout(() => {
  document.getElementById("lightYellow").style.opacity = 1;
  document.querySelector(".bg-yellow").style.opacity = 1;
}, 3300);

setTimeout(() => {
  document.getElementsByClassName("fall-red")[0].style.opacity = 1;
  document.getElementsByClassName("fall-blue")[0].style.opacity = 1;
  document.getElementsByClassName("fall-yellow")[0].style.opacity = 1;
}, 2400);

setTimeout(() => {
  document.getElementsByClassName("fall-red")[1].style.opacity = 1;
  document.getElementsByClassName("fall-blue")[1].style.opacity = 1;
  document.getElementsByClassName("fall-yellow")[1].style.opacity = 1;
}, 20000);

setTimeout(() => {
  document.getElementsByClassName("fall-red")[2].style.opacity = 1;
  document.getElementsByClassName("fall-blue")[2].style.opacity = 1;
  document.getElementsByClassName("fall-yellow")[2].style.opacity = 1;
}, 40000);


//Contact PopUp

const texts = document.querySelectorAll('.number')
const mails = document.querySelectorAll('.mail')
const copied = document.getElementById("copied")
const textarea = document.createElement('textarea')
texts.forEach(text => {
  text.addEventListener('click', () => {
    copyText(text);
  })
});
mails.forEach(text => {
  text.addEventListener('click', () => {
    copyText(text);
  })
});

function copyText(text) {
  console.log(text)
  // copied.style.transform = `translateY(${})`
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.opacity = 0;
  textarea.style.pointerEvents = 'none';
  textarea.value = text.innerText;
  document.body.appendChild(textarea)
  textarea.select();
  navigator.clipboard.writeText(textarea.value);
  setTimeout(() => {
    copied.style.opacity = 0;
  }, 1000);
}