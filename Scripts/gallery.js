let rightArr = document.querySelector('#right-arr');
let leftArr = document.querySelector('#left-arr');
let gall = document.querySelector('.gallery-grid');
let disc1 = document.querySelector('#disc-1');
let disc2 = document.querySelector('#disc-2');
let touchstartX = 0;
let touchendX = 0;

let scrObj = {
    scr: 0,
    scrollVal: `0px`,
    swiped: 0,
    swipeCount: 0
};

const slideLeft = (scrObj) => {
    if(scrObj.scr > 0) {
        gall.style.transform = `translateX(calc(-1*${scrObj.scrollVal} + 10%))`;
        scrObj.scr -= 10;
        scrObj.scrollVal = `calc(${scrObj.scr}%)`;
    }
}

const slideRight = (scrObj) => {
    if(scrObj.scr < 50) {
        gall.style.transform = `translateX(calc(-1*${scrObj.scrollVal} - 10%))`;
        scrObj.scr += 10;
        scrObj.scrollVal = `calc(${scrObj.scr}%)`;
    }
}

leftArr.addEventListener('click', () => slideLeft(scrObj));
rightArr.addEventListener('click', () => slideRight(scrObj));

const swipe = (scrObj) => {
    console.log('swipe')
    if(touchstartX > touchendX) { 
        gall.style.transform = `translateX(calc((-1)*.98%*(${scrObj.swipeCount}+1) + (-1*(50%+10px))))`;
        scrObj.swipeCount += 1;
        console.log('swipe right');
    }
    if(touchstartX < touchendX) {
        gall.style.transform = `translateX(calc((-1)*.98%*(${scrObj.swipeCount}-1) + (-1*(50%+10px))))`;
        scrObj.swipeCount -= 1;
        console.log('swipe left');
    }

    if(scrObj.swipeCount % 2 === 0) {
        disc2.classList.remove('active-disc');
        disc1.classList.add('active-disc');
    }

    else {
        disc1.classList.remove('active-disc');
        disc2.classList.add('active-disc');
    }
}

gall.addEventListener('touchstart', (event) => {
    touchstartX = event.changedTouches[0].screenX;
});

gall.addEventListener('touchend', (event) => {
    touchendX = event.changedTouches[0].screenX;
    swipe(scrObj)
    // scrObj.swiped = !(scrObj.swiped);
});

for(let i=1; i<=50; i++) {
    for(let j=1; j<=12; j++) {
        gall.innerHTML += 
            `<div class="gallery-images" id=${j}>
            <img src="../Assets/Gallery/${j}.jpg" alt="img">
            </div>`;
    }
}