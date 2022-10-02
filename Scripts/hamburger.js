let open = false;
const right = document.querySelector(".right");

const hamImg = document.querySelector(".ham-img span");
const hamText = document.querySelector(".ham-text span");
const hamLogoImg = document.querySelector(".ham-logo img");

const hamGrid = document.querySelector(".ham-grid");
const hamLogo = document.querySelector(".ham-logo");
const hamIcons = document.querySelector(".ham-icons");
const hamLinks = document.querySelector(".ham-links");

const hamIcon = document.querySelectorAll(".ham-icon");
const hamLine = document.querySelectorAll(".hamburger span");
const hamLink = document.querySelectorAll(".ham-links div a");

document.querySelector(".hamburger").addEventListener("click", () => {
  if (!open) {
    // hamburger menu opens
    open = true;
    hamGrid.style.display = "grid";
    body.style.overflowY = "hidden";

    // links disappear
    for (let i = 1; i <= hamLink.length; i++) hamLink[i - 1].style.opacity = 0;

    // right nav position
    right.style.position = "fixed";
    right.style.top = "0rem";
    right.style.right = "0";

    // opening animations
    hamImg.style.animation = "span-right 0.45s linear";
    hamText.style.animation = "span-left 0.45s linear";
    hamLogo.style.animation = "come-up 0.45s linear";
    hamIcons.style.animation = "come-down 0.45s linear";
    hamLinks.style.animation = "come-up 0.45s linear";

    // links appear
    for (let i = 1; i <= hamLink.length; i++) {
      hamLink[i - 1].style.animation = `link-up 0.2s linear 0.45s`;
      setTimeout(() => {
        hamLink[i - 1].style.opacity = 1;
      }, 605);
    }

    // icons appear
    hamIcon[0].style.animation = `link-up 0.2s linear 0.45s`;
    hamIcon[1].style.animation = `link-up 0.2s linear 0.45s`;
    hamLogoImg.style.animation = `link-up 0.2s linear 0.45s`;

    setTimeout(() => {
      hamIcon[0].style.opacity = 1;
      hamIcon[1].style.opacity = 1;
      hamLogoImg.style.opacity = 1;
    }, 500);

    // hamburger animations
    hamLine[0].style.animation = "ham-up-1 0.15s linear";
    hamLine[1].style.opacity = 0;
    hamLine[2].style.animation = "ham-down-1 0.15s linear";

    setTimeout(() => {
      hamLine[2].style.width = "25px";
      hamLine[2].style.top = "13.2px";
      hamLine[2].style.transform = "rotate(-405deg)";

      hamLine[0].style.width = "25px";
      hamLine[0].style.top = "13.2px";
      hamLine[0].style.transform = "rotate(405deg)";
    }, 150);
  } else {
    // hamburger menu closes
    open = false;
    setTimeout(() => {
      hamGrid.style.display = "none";
      body.style.overflowY = "scroll";
    }, 500);

    // right nav position
    right.style.position = "relative";
    right.style.top = "0";
    right.style.right = "0";

    // closing animations
    hamImg.style.animation = "span-go-right 0.5s linear";
    hamText.style.animation = "span-go-left 0.5s linear";
    hamLogo.style.animation = "go-down 0.5s linear";
    hamIcons.style.animation = "go-up 0.5s linear";
    hamLinks.style.animation = "go-down 0.5s linear";

    // links disappear
    for (let i = 1; i <= 4; i++) hamLink[i - 1].style.opacity = 0;

    // icons disappear
    hamIcon[0].style.opacity = 0;
    hamIcon[1].style.opacity = 0;
    hamLogoImg.style.opacity = 0;

    // hamburger animations
    hamLine[0].style.animation = "ham-up-2 0.15s linear";
    hamLine[1].style.opacity = 1;
    hamLine[2].style.animation = "ham-down-2 0.15s linear";

    setTimeout(() => {
      hamLine[2].style.width = "13px";
      hamLine[2].style.top = "25.4px";
      hamLine[2].style.transform = "none";

      hamLine[0].style.width = "35px";
      hamLine[0].style.top = "1px";
      hamLine[0].style.transform = "none";
    }, 150);
  }
});
