const dDay = new Date("October 15, 2022 23:59:59").getTime();

function setTime() {
    const timeNow = new Date().getTime();

    let days = Math.floor((dDay - timeNow) / (1000 * 60 * 60 * 24));
    days = days < 10  ? `0${days}` : days
    let hrs = Math.floor((dDay - timeNow) / (1000 * 60 * 60)) - days * 24;
    hrs = hrs < 10 ? `0${hrs}` : hrs
    let min = Math.floor((dDay - timeNow) / (1000 * 60)) - days * 24 * 60 - hrs * 60;
    min = min < 10 ? `0${min}` : min
    if (days < 0) {
        days = '00';
        hrs = '00';
        min = '00';
    }
    console.log(days)
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("mins").innerHTML = min;
}
setInterval(setTime,60)