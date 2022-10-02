const gall = document.querySelector(".gallery-grid");
const leftArr = document.querySelector("#left-arr");
const rightArr = document.querySelector("#right-arr");
const disc1 = document.querySelector("#disc-1");
const disc2 = document.querySelector("#disc-2");
const resp1 = window.matchMedia("(max-width: 800px)");
const resp2 = window.matchMedia("(max-width: 600px)");

let scrObj = {
  scr: 0,
  scrollVal: `0px`,
  swiped: 0,
  swipeCount: 0,
};

let val = gall.clientWidth;
let width = document.documentElement.clientWidth * 0.8;
let opaqWidth = document.querySelector(".opaq-left").clientWidth;
console.log(opaqWidth);

let galInt;

let touchstartX = 0;
let touchendX = 0;
let trans = 1.67;

const startScrolling = (dir) => {
  let translate = `${getTranslateX()}px`;

  if (
    dir === "right" &&
    width - val <= getTranslateX() - width * 0.1 + opaqWidth + 20
  ) {
    gall.style.transform = `translateX(calc(-1*5% + ${translate}))`;
  } else if (dir === "left" && getTranslateX() + width * 0.1 < opaqWidth + 20) {
    gall.style.transform = `translateX(calc(5% + ${translate}))`;
  }
};

function getTranslateX() {
  var style = window.getComputedStyle(gall);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

rightArr.addEventListener("mousedown", () => {
  galInt = setInterval(startScrolling, 0, "right");
});

rightArr.addEventListener("mouseup", () => {
  clearInterval(galInt);
});

leftArr.addEventListener("mousedown", () => {
  galInt = setInterval(startScrolling, 0, "left");
});

leftArr.addEventListener("mouseup", () => {
  clearInterval(galInt);
});

const swipe = (scrObj) => {
  console.log("swipe");
  if (touchstartX > touchendX + 100) {
    scrObj.swipeCount += 1;
    gall.style.transform = `translateX(calc((-1)*${trans}%*(${scrObj.swipeCount}) + (-1*(50%+10px))))`;
  }
  if (touchstartX < touchendX - 100) {
    scrObj.swipeCount -= 1;
    gall.style.transform = `translateX(calc((-1)*${trans}%*(${scrObj.swipeCount}) + (-1*(50%+10px))))`;
  }

  if (scrObj.swipeCount % 2 === 0) {
    disc2.classList.remove("active-disc");
    disc1.classList.add("active-disc");
  } else {
    disc1.classList.remove("active-disc");
    disc2.classList.add("active-disc");
  }
};

gall.addEventListener("touchstart", (event) => {
  if (resp1.matches) {
    touchstartX = event.changedTouches[0].screenX;
  }
});

gall.addEventListener("touchend", (event) => {
  if (resp1.matches) {
    touchendX = event.changedTouches[0].screenX;
    swipe(scrObj);
  }
});

if (resp2.matches) {
  gall.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    for (let j = 1; j <= 4; j++) {
      gall.innerHTML += `<div class="gallery-images" id=${j}>
              <img src="../Assets/gallery/${j}.jpg" alt="img">
              </div>`;
    }
  }
  for (let i = 1; i <= 30; i++) {
    for (let j = 5; j <= 8; j++) {
      gall.innerHTML += `<div class="gallery-images" id=${j}>
              <img src="../Assets/gallery/${j}.jpg" alt="img">
              </div>`;
    }
  }
  for (let i = 1; i <= 30; i++) {
    for (let j = 9; j <= 12; j++) {
      gall.innerHTML += `<div class="gallery-images" id=${j}>
              <img src="../Assets/gallery/${j}.jpg" alt="img">
              </div>`;
    }
  }
} else if (resp1.matches) {
  gall.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    for (let j = 1; j <= 6; j++) {
      gall.innerHTML += `<div class="gallery-images" id=${j}>
              <img src="../Assets/gallery/${j}.jpg" alt="img">
              </div>`;
    }
  }
  for (let i = 1; i <= 30; i++) {
    for (let j = 7; j <= 12; j++) {
      gall.innerHTML += `<div class="gallery-images" id=${j}>
              <img src="../Assets/gallery/${j}.jpg" alt="img">
              </div>`;
    }
  }
}

// else {
//   for (let j = 1; j <= 12; j++) {
//     gall.innerHTML += `<div class="gallery-images" id=${j}>
//             <img src="../Assets/gallery/${j}.jpg" alt="img">
//             </div>`;
//   }
// }
