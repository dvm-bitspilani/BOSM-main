let body = document.querySelector("body");
let gal = document.querySelector(".gallery");

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  body.style.overflowY = "hidden";

  loader.addEventListener("click", () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    loader.style.animation = "fade-out 1s ease-out";
    body.style.overflowY = "scroll";
    gal.style.opacity = "1";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  });

  if (document.getElementById("video").readyState === 4) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const hide = document.querySelector(".hide");
    hide.style.animation = "appear 3s";

    if (sessionStorage.getItem("showContinue") !== "false") {
      setTimeout(() => {
        hide.style.opacity = 0.9;
      }, 2901);
      sessionStorage.setItem("showContinue", "false");
    } else {
      loader.click();
    }
  }
});
