let body = document.querySelector("body");

const getCookie = (cookieName) => {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const light = document.getElementsByClassName("light");

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

  if (document.getElementById("video").readyState === 4) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const hide = document.querySelector(".hide");
    hide.style.animation = "appear 3s";

    if (getCookie("showContinue") !== "false") {
      setTimeout(() => {
        hide.style.opacity = 0.9;
      }, 2901);
      document.cookie = "showContinue=false";
    } else {
      loader.click();
    }
  }
});
