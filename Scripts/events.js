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

let amountDisplay = parseInt(
  getComputedStyle(evtSec).getPropertyValue("--numDisplay")
);
let lengths = amountDisplay === 0 ? 4 : amountDisplay;

let evtActive = 0;
let evtElems = [];
let evtDots = [];
let i = 0;
let lastIdx = 0;

const initEvtElems = () => {
  evtElems = [];
  evtDots = [];
  i = 0;
  for (let [name, label] of Object.entries(events)) {
    let evtElem = document.createElement("div");
    evtElem.classList.add("evt");
    evtElem.id = i.toString();
    evtElem.style.backgroundImage = `url("Assets/sports/${name}.png")`;
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

  let dotsCount = evtElems.length / lengths;

  for (let i = 0; i < dotsCount; i++) {
    let dot = document.createElement("div");
    dot.classList.add("event-dot");
    evtDots.push(dot);
    dot.addEventListener("click", () => {
      evtActive = i * lengths;
      setActive();
      evtActive += lengths;
      if (evtActive >= evtElems.length) {
        evtActive = 0;
      } else if (evtActive < 0) {
        evtActive = evtElems.length - lengths;
      }
      clearInterval(eventInterval);
      eventInterval = setInterval(appendActive, 3000);
    });
  }
  for (let i = 1; i <= lengths; i++) {
    evtElems[evtElems.length - i].classList.add("evt-active");
  }
  evtsDotsCont.replaceChildren(...evtDots);
  setActive();
};

const setActive = () => {
  evtElems.forEach((elem, idx) => {
    let dot = evtDots[Math.floor(idx / lengths)];
    let id = parseInt(elem.id);
    if (elem.classList.contains("evt-inactive")) {
      elem.classList.remove("evt-inactive");
    }
    if (elem.classList.contains("evt-next")) {
      elem.classList.remove("evt-next");
    }
    if (elem.classList.contains("evt-prev")) {
      elem.classList.remove("evt-prev");
    }
    if (dot.classList.contains("evt-dot-active")) {
      dot.classList.remove("evt-dot-active");
    }
    if (elem.classList.contains("evt-active")) {
      elem.classList.remove("evt-active");
      elem.classList.add("evt-prev");
      elem.classList.add("evt-inactive");
    }
    if (id >= evtActive && id <= evtActive + lengths - 1) {
      elem.classList.add("evt-active");
    } else if (id >= evtActive + lengths && id <= evtActive + 2 * lengths - 1) {
      elem.classList.add("evt-next");
      elem.classList.add("evt-inactive");
    } else {
      elem.classList.add("evt-inactive");
    }
    let evtDiff = evtElems.length - evtActive;
    if (evtDiff <= lengths) {
      if (idx < evtDiff - lengths) {
        elem.classList.add("evt-active");
      } else if (idx < evtDiff - lengths + lengths) {
        elem.classList.add("evt-next");
      }
    }
  });
  evtsCont.replaceChildren(
    ...evtElems.filter((elem) => elem.classList.contains("evt-prev")),
    ...evtElems.filter((elem) => elem.classList.contains("evt-active")),
    ...evtElems.filter((elem) => elem.classList.contains("evt-next"))
  );
  evtDots[Math.floor(evtActive / lengths)].classList.add("evt-dot-active");
};

const setActiveMob = () => {
  evtElems.forEach((elem, idx) => {
    let dot = evtDots[Math.floor(idx / lengths)];
    if (elem.classList.contains("evt-active")) {
      elem.classList.remove("evt-active");
      elem.classList.add("evt-inactive");
      elem.classList.add("evt-prev");
    } else if (elem.classList.contains("evt-next")) {
      elem.classList.remove("evt-next");
      elem.classList.remove("evt-inactive");
      elem.classList.add("evt-active");
    } else if (elem.classList.contains("evt-prev")) {
      elem.classList.remove("evt-prev");
    } else {
      elem.className = "evt evt-inactive";
    }
    if (dot.classList.contains("evt-dot-active")) {
      dot.classList.remove("evt-dot-active");
    }
  });
  let j = 0;
  for (let i = 1; i <= 4; i++) {
    if (lastIdx + i < evtElems.length) {
      evtElems[lastIdx + i].classList.add("evt-next");
      j++;
    }
  }
  if (j < 4) {
    for (let i = 0; i < lengths - j; i++) {
      evtElems[i].classList.add("evt-next");
      lastIdx = i;
    }
  } else {
    lastIdx += 4;
  }
  evtsCont.replaceChildren(
    ...evtElems.filter((elem) => elem.classList.contains("evt-prev")),
    ...evtElems.filter((elem) => elem.classList.contains("evt-active")),
    ...evtElems.filter((elem) => elem.classList.contains("evt-next"))
  );
  evtDots[Math.floor(evtActive / lengths)].classList.add("evt-dot-active");
};

const appendActive = () => {
  if (amountDisplay === 0) {
    setActiveMob();
  } else {
    setActive();
  }
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

// let eventInterval = setInterval(appendActive, 3000);
initEvtElems();
