const windowWidth = window.innerWidth;
const numberList = document.querySelectorAll(".number");
const emailList = document.querySelectorAll(".mail");
const numberListCopy = [...numberList];
const emailListCopy = [...emailList];

const contactDetails = [
  { number: "+916395057581", email: "pcr@bitsbosm.org" },
  { number: "+919632217970", email: "controls@bitsbosm.org" },
  { number: "+919100955331", email: "sponsorship@bitsbosm.org" },
  { number: "+917350334393", email: "recnacc@bitsbosm.org" },
  { number: "+918810211563", email: "sportssecretary@bitsbosm.org" },
  { number: "+917058949468", email: "" },
  { number: "+916350648125", email: "" },
  { number: "+919820075904", email: "" },
  { number: "+919911448690", email: "webmaster@bitsbosm.org" },
];

setInterval(() => {
  if (window.innerWidth < 1201) {
    numberList.forEach((element) => {
      element.innerHTML = `<i class="fa-solid fa-phone"></i>`;
    });
    emailList.forEach((phone) => {
      phone.innerHTML = `<i class="fa-solid fa-envelope"></i>`;
    });
  } else {
    numberList.forEach((element, index) => {
      element.innerHTML = contactDetails[index].number;
    });
    emailList.forEach((phone, index) => {
      phone.innerHTML = contactDetails[index].email;
    });
  }
  // else{
  //     numberList.forEach((element)=>{
  //         element.innerHTML=numberListCopy.
  //     })
  // }
  //   console.log("recheck");
}, 50);

window.addEventListener("load", () => {});
console.log(numberList);

// window.addEventListener("resize", () => {
//   if (windowWidth < 1201) {
//     numberList.forEach((element) => {
//       element.innerHTML = `<i class="fa-solid fa-phone"></i>`;
//     });
//     emailList.forEach((phone) => {
//       phone.innerHTML = `<i class="fa-solid fa-envelope"></i>`;
//     });
//   }
//   console.log("resize");
// });
