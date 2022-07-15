const bosm = new Date("October 15, 2022 23:59:59").getTime();
const stars_cont = document.getElementById("stars-cont");
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

// Stars spawning randomly

let stars = "";
const sc_factor = Math.random() * 0.1 + 0.2;
let height = window.innerHeight;
let width = window.innerWidth;
let star_count = (height * width * sc_factor) / 1000;

const add_stars = () => {
	stars = "";
	for (let i = 0; i < star_count; i++) {
		let class_int = Math.random();
		let offset_x = Math.random() * 0.9 + 0.05;
		let offset_y = Math.random() * 0.9 + 0.05;

		if (class_int < 0.5) {
			stars = `${stars}\n
      <div class="star-type1 star" style="left: ${offset_x * width}px; top: ${offset_y * height
			}px"></div>`;
		} else {
			stars = `${stars}\n
      <div class="star-type2 star" style="left: ${offset_x * width}px; top: ${offset_y * height
			}px"></div>`;
		}
	}
	stars_cont.innerHTML = stars;
};

add_stars();

// Audio Files

let sound = new Audio("../Assets/LightSound.mp3");

function flicker() {
	sound.volume = 1;
	sound.play();
}

window.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		flicker();
	}, 500);

	setTimeout(() => {
		flicker();
	}, 2000);

	setTimeout(() => {
		flicker();
	}, 3500);
});

//Lines

// const lines = document.getElementsByClassName('lines')
// let scroll = window.pageYOffset;
// let rate = (scroll * 0.5) - 750;
// lines[0].style.transform = 'translate3d(0px,' + rate + 'px,0px)';
// document.addEventListener('scroll', () => {
//   lines[0].style.transform = 'translate3d(0px,' + rate + 'px,0px)';
// })

// Lights

setInterval(() => {
	document.getElementById('lightRed').style.opacity = 1
}, 3000);

setInterval(() => {
	document.getElementById('lightBlue').style.opacity = 1
}, 3500);

setInterval(() => {
	document.getElementById('lightYellow').style.opacity = 1
}, 3300);