const events = {
  badminton: "Badminton",
  swimming: "Swimming",
  squash: "Squash",
  tennis: "Tennis",
  volleyball: "Volleyball",
  hockey: "Hockey",
  chess: "Chess",
  carrom: "Carrom",
  cricket: "Cricket",
  athletics: "Athletics",
  frisbee: "Ultimate Frisbee",
  tabletennis: "Table Tennis",
  taekwondo: "Taekwondo",
  powerlifting: "Power Lifting",
  bodybuilding: "Body Building",
  snooker: "Snooker & Pool",
  football: "Football",
  basketball: "Basketball",
};

const evtSec = document.querySelector(".events");
const evtsCont = document.getElementById("events-cont");
const evtsDotsCont = document.getElementById("event-dots-cont");
const evtArrLeft = document.getElementById("evt-arrow-left");
const evtArrRight = document.getElementById("evt-arrow-right");
const touchThreshold = 70;

let amountDisplay = parseInt(
  getComputedStyle(evtSec).getPropertyValue("--numDisplay")
);
let lengths = amountDisplay === 0 ? 4 : amountDisplay;

let evtActive = 0,
  evtElems = [],
  evtDots = [],
  touchstartX = 0,
  touchendX = 0,
  i = 0;

const initEvtElems = () => {
  evtElems = [];
  evtDots = [];
  i = 0;
  for (let num = 0; num < 20; num++) {
    for (let [name, label] of Object.entries(events)) {
      let evtElem = document.createElement("div");
      evtElem.classList.add("evt");
      evtElem.id = i.toString();
      evtElem.style.backgroundImage = `url("Assets/sports/${name}.png")`;
      let evtElemCont = document.createElement("div");
      evtElemCont.classList.add("evt-item-cont");
      i++;
      let evtImg = document.createElement("img");
      evtImg.classList.add("evt-logo");
      evtImg.src = `Assets/sports/${name}_logo.svg`;
      evtImg.alt = `${label} event`;
      let evtLabel = document.createElement("div");
      evtLabel.classList.add("evt-label");
      evtLabel.textContent = label;
      let evtTitle = document.createElement("div");
      evtTitle.classList.add("evt-label-cont");
      evtTitle.appendChild(evtImg);
      evtTitle.appendChild(evtLabel);
      evtElem.appendChild(evtTitle);
      evtElems.push(evtElem);
    }
  }

  let dotsCount = evtElems.length / (lengths * 20);

  for (let i = 0; i < dotsCount; i++) {
    let dot = document.createElement("div");
    dot.classList.add("event-dot");
    evtDots.push(dot);
    dot.addEventListener("click", (evt) => {
      let lastDot = evtDots.indexOf(
        evtDots.find((dot) => dot.classList.contains("evt-dot-active"))
      );
      let idx = evtDots.indexOf(evt.target);
      evtActive += (idx - lastDot) * lengths;
      setActive();
      clearInterval(eventInterval);
      eventInterval = setInterval(appendActive, 3000);
    });
  }
  evtsCont.replaceChildren(...evtElems);
  evtsDotsCont.replaceChildren(...evtDots);
  setActive();
};

const setActive = () => {
  evtElems.forEach((elem, idx) => {
    let dot = evtDots[Math.floor(idx / lengths) % evtDots.length];
    let id = parseInt(elem.id);
    if (elem.classList.contains("evt-active")) {
      elem.classList.remove("evt-active");
    }
    if (elem.classList.contains("evt-inactive")) {
      elem.classList.remove("evt-inactive");
    }
    if (dot.classList.contains("evt-dot-active")) {
      dot.classList.remove("evt-dot-active");
    }
    if (id >= evtActive && id <= evtActive + lengths - 1) {
      elem.classList.add("evt-active");
    } else {
      elem.classList.add("evt-inactive");
    }
    if (amountDisplay !== 0) {
      elem.style.transform = `translateX(calc(-${evtActive} * (var(--evtLogoSize) + 3 * var(--evtPadding) + 2 * var(--evtMargin))))`;
    } else {
      elem.style.transform = `translateX(calc(-${
        evtActive / 4
      } * (2 * var(--evtSize) + 4 * var(--evtMargin))))`;
    }
  });
  evtDots[Math.floor(evtActive / lengths) % evtDots.length].classList.add(
    "evt-dot-active"
  );
};

let appendActive = () => {
  setActive();
  evtActive += lengths;
  if (evtActive >= evtElems.length) {
    evtActive = 0;
  } else if (evtActive < 0) {
    evtActive = evtElems.length - lengths;
  }
};

window.addEventListener("resize", () => {
  let newAmountDisplay = parseInt(
    getComputedStyle(evtSec).getPropertyValue("--numDisplay")
  );
  if (amountDisplay !== newAmountDisplay) {
    amountDisplay = newAmountDisplay;
    lengths = amountDisplay === 0 ? 4 : amountDisplay;
    initEvtElems();
  }
});

evtArrLeft.addEventListener("click", () => {
  evtActive -= lengths;
  if (evtActive >= evtElems.length) {
    evtActive = 0;
  } else if (evtActive < 0) {
    evtActive = evtElems.length - lengths;
  }
  setActive();
  clearInterval(eventInterval);
  eventInterval = setInterval(appendActive, 3000);
});

evtArrRight.addEventListener("click", () => {
  evtActive += lengths;
  if (evtActive >= evtElems.length) {
    evtActive = 0;
  } else if (evtActive < 0) {
    evtActive = evtElems.length - lengths;
  }
  setActive();
  clearInterval(eventInterval);
  eventInterval = setInterval(appendActive, 3000);
});

function checkDirection() {
  console.log(touchstartX - touchendX);
  if (touchstartX - touchendX > touchThreshold) {
    evtActive += lengths;
    if (evtActive >= evtElems.length) {
      evtActive = 0;
    } else if (evtActive < 0) {
      evtActive = evtElems.length - lengths;
    }
    setActive();
  }
  if (touchendX - touchstartX > touchThreshold) {
    evtActive -= lengths;
    if (evtActive >= evtElems.length) {
      evtActive = 0;
    } else if (evtActive < 0) {
      evtActive = evtElems.length - lengths;
    }
    setActive();
    clearInterval(eventInterval);
    eventInterval = setInterval(appendActive, 3000);
  }
}

evtsCont.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
  clearInterval(eventInterval);
});

evtsCont.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
  eventInterval = setInterval(appendActive, 3000);
});

let eventInterval = setInterval(appendActive, 3000);
initEvtElems();
