let rightArr = document.querySelector('#right-arr');
let leftArr = document.querySelector('#left-arr');
let gall = document.querySelector('.gallery-grid');

let scrObj = {
    scr: 0,
    scrollVal: `0px`
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