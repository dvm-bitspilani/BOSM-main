let rightArr = document.querySelector('#right-arr');
let leftArr = document.querySelector('#left-arr');
let gall = document.querySelector('.gallery-grid');
let disc1 = document.querySelector('#disc-1');
let disc2 = document.querySelector('#disc-2');
let resp1 = window.matchMedia("(max-width: 800px)");
let resp2 = window.matchMedia("(max-width: 600px)");
let val = gall.clientWidth;
let w = (document.documentElement.clientWidth)*.8;

let galInt;

let touchstartX = 0;
let touchendX = 0;

let trans = (resp2.matches) ? .99 : .98

const startScrolling = (dir) => {
    let translate = `${getTranslateX()}px`;

    if(dir === 'right' && (w-val) <= getTranslateX() - w*.1) {
        gall.style.transform = `translateX(calc(-1*5% + ${translate}))`;
    }
    else if(dir === 'left' && getTranslateX() + w*.1 < 0) {
        gall.style.transform = `translateX(calc(5% + ${translate}))`;
    }
}


function getTranslateX() {
    var style = window.getComputedStyle(gall);
    var matrix = new WebKitCSSMatrix(style.transform);
    console.log(matrix.m41)
    return(matrix.m41);
}

rightArr.addEventListener('mousedown', () => {
    galInt = setInterval(startScrolling, 0, 'right');
})


rightArr.addEventListener('mouseup', () => {
    clearInterval(galInt)
})

leftArr.addEventListener('mousedown', () => {
    galInt = setInterval(startScrolling, 0, 'left');
})


leftArr.addEventListener('mouseup', () => {
    clearInterval(galInt)
})

const swipe = (scrObj) => {
    console.log('swipe')
    if(touchstartX > touchendX) { 
        scrObj.swipeCount += 1;
        gall.style.transform = `translateX(calc((-1)*${trans}%*(${scrObj.swipeCount}) + (-1*(50%+10px))))`;
    }
    if(touchstartX < touchendX) {
        scrObj.swipeCount -= 1;
        gall.style.transform = `translateX(calc((-1)*${trans}%*(${scrObj.swipeCount}) + (-1*(50%+10px))))`;
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
    if(resp1.matches) {
        touchstartX = event.changedTouches[0].screenX;
    }
});

gall.addEventListener('touchend', (event) => {
    if(resp1.matches) {
        touchendX = event.changedTouches[0].screenX;
        swipe(scrObj);
    }
});

for(let i=1; i<=50; i++) {
    for(let j=1; j<=12; j++) {
        gall.innerHTML += 
            `<div class="gallery-images" id=${j}>
            <img src="../Assets/Gallery/${j}.jpg" alt="img">
            </div>`;
    }
}