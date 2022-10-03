let body = document.querySelector("body");
let gal = document.querySelector(".gallery");
let reg = document.querySelector("#reg-cont");

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
  body.style.overflowY = "hidden";

  loader.addEventListener("click", () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    loader.style.animation = "fade-out 1s ease-out";
    body.style.overflowY = "scroll";
    if (gal !== null) {
      gal.style.opacity = "1";
    }

    if (reg !== null) {
      reg.style.display = "block";
    }

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
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
