const homePage = document.querySelector("#home-page");
const aboutSection = document.querySelector("#about-sec");
const eventsSection = document.querySelector("#eventsHere");
const contactsSection = document.querySelector("#contactUs");

let Pages = [homePage, aboutSection, eventsSection, contactsSection];

let activePage = homePage;
let nextPage = aboutSection;
let previousPage = null;

let downscroll = 0;
let upscroll = 1;
//  = aboutSection;

// const homePageScrollInfo = homePage.getBoundingClientRect();
// const aboutSectionScrollInfo = aboutSection.getBoundingClientRect();
// const eventsSectionScrollInfo = eventsSection.getBoundingClientRect();
// const contactsSectionScrollInfo = contactsSection.getBoundingClientRect();

let windowHeight = window.innerHeight;
let activeIndex = 0;

// window.localStorage.setItem("active","0")
// let activeIndex=window.localStorage.getItem("active")

function updatePageStatus() {
  Pages.forEach((page, index) => {
    if (page.hasAttribute("activepage")) {
      activePage = page;

      if (index > 0) {
        previousPage = Pages[index - 1];
      } else {
        previousPage = null;
      }

      if (index < Pages.length - 1) {
        nextPage = Pages[index + 1];
      } else {
        nextPage = null;
      }
      if (index !== activeIndex) {
        activeIndex = index;
        let scrollAmount = activePage.offsetTop;

        if ((activeIndex = 0)) {
          window.scrollTo({
            top: scrollAmount + 100,
            left: 0,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({ top: scrollAmount, left: 0, behavior: "smooth" });
        }
        console.log("scroll executed");
      }
    }
  });
}

function checkActivePage() {
  if (
    nextPage !== null &&
    percentageInView(nextPage) >= 10 &&
    upscroll === 1 &&
    downscroll === 0
  ) {
    activePage.removeAttribute("activepage");
    Pages[activeIndex + 1].setAttribute("activepage", "");
  }
  if (
    previousPage !== null &&
    percentageInView(previousPage) >= 10 &&
    downscroll === 1 &&
    upscroll === 0
  ) {
    activePage.removeAttribute("activepage");
    Pages[activeIndex - 1].setAttribute("activepage", "");
  }

  // if(percentageInView(previousPage) >= 10 &&)
}

function scrollToActivePage(page) {
  // window.scrollTo(page.offsetTop);
}

function percentageInView(page) {
  let pageTop = page.offsetTop;
  let pageHeight = page.getBoundingClientRect().height;

  let docScroll = window.scrollY;

  let hiddenBefore = docScroll - pageTop;
  let hiddenAfter = pageTop + pageHeight - (docScroll + windowHeight);

  if (docScroll > pageTop + pageHeight || pageTop > docScroll + windowHeight) {
    return 0;
  } else {
    let percentView = 100;
    if (hiddenBefore > 0) {
      percentView -= (hiddenBefore * 100) / pageHeight;
    }
    if (hiddenAfter > 0) {
      percentView -= (hiddenAfter * 100) / pageHeight;
    }
    return percentView;
  }
}

let newScroll = window.scrollY;
let oldScroll = window.scrollY;

window.addEventListener("scroll", () => {
  newScroll = window.scrollY;
  if (newScroll > oldScroll) {
    upscroll = 1;
    downscroll = 0;
    // console.log("up");
  } else {
    downscroll = 1;
    upscroll = 0;
    // console.log("down");
  }
  oldScroll = window.scrollY;

  checkActivePage();
  updatePageStatus();
  activeIndex = Pages.indexOf(activePage);

  // console.log(percentageInView(homePage));
  // console.log(percentageInView(aboutSection));
  // console.log(percentageInView(eventsSection));
  // console.log(percentageInView(contactsSection));
});
