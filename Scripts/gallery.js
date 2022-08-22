let rightArr = document.querySelector('#right-arr');
let leftArr = document.querySelector('#left-arr');
let gall = document.querySelector('.gallery-grid');

const slideLeft = () => {
gall.style.transform = 'translateX(0)';
}

const slideRight = () => {
gall.style.transform = 'translateX(calc((-1)*((100% - 140px)/2 + 80px)))';
}

leftArr.addEventListener('click', () => slideLeft());
rightArr.addEventListener('click', () => slideRight());