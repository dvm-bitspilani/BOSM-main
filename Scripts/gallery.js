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
  swipeCount: 0
};

let val = gall.clientWidth,
  width = document.documentElement.clientWidth * 0.8,
  galInt,
  touchstartX = 0,
  touchendX = 0,
  trans = resp2.matches ? 0.99 : 0.98;

const startScrolling = (dir) => {
  let translate = `${getTranslateX()}px`;

  if (dir === "right" && width - val <= getTranslateX() - width * 0.1) {
    gall.style.transform = `translateX(calc(-1*5% + ${translate}))`;
  } else if (dir === "left" && getTranslateX() + width * 0.1 < 0) {
    gall.style.transform = `translateX(calc(5% + ${translate}))`;
  }
};

function getTranslateX() {
  var style = window.getComputedStyle(gall);
  var matrix = new WebKitCSSMatrix(style.transform);
  console.log(matrix.m41);
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
  if (touchstartX > touchendX) {
    scrObj.swipeCount += 1;
    gall.style.transform = `translateX(calc((-1)*${trans}%*(${scrObj.swipeCount}) + (-1*(50%+10px))))`;
  }
  if (touchstartX < touchendX) {
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

for (let i = 1; i <= 50; i++) {
  for (let j = 1; j <= 12; j++) {
    gall.innerHTML += `<div class="gallery-images" id=${j}>
            <img src="../Assets/gallery/${j}.jpg" alt="img">
            </div>`;
  }
}
