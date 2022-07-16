const END_POINT = "https://www.bitsbosm.org/2022/registrations";
const form_cont = document.getElementById("reg-cont");
const form = document.getElementById("reg-form");
const sport_inpt = document.getElementById("sports");
const sport_sel_list = document.getElementById("sport-sel-list");
const sport_list = document.getElementById("sport-list");
const college_list = document.getElementById("college-list");
const col_inpt = document.getElementById("college");
const sub_but = document.getElementById("form-submit");

let avail_sports = [];
let sel_sports = [];
let sports_avail_html = ``;
let sports_sel_html = ``;
let avail_colleges = [];
let college_html = ``;

const get_elems = async () => {
  try {
    let college_res = await fetch(`${END_POINT}/get_colleges`, {
      method: "GET",
    });

    let sports_res = await fetch(`${END_POINT}/get_sports`, {
      method: "GET",
    });

    let college_list_json = await college_res.json();
    let sport_list_json = await sports_res.json();
    avail_colleges = await college_list_json.data;
    avail_sports = await sport_list_json.data;
    let college_pat = ``;
    avail_colleges.forEach((val) => {
      college_html = `${college_html}<option label="${val.name}" value="${val.name}" />`;
      college_pat = `${college_pat}|${val.name}`;
    });
    college_list.innerHTML = college_html;
    document.getElementById("college").pattern = college_pat;
  } catch (e) {
    alert("Failure in getting data");
  }
};

async function submit_form() {
  try {
    let genders = document.getElementsByName("gender");
    let name = document.getElementById("name").value.trim();
    let email_id = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let gender;
    let yos = parseInt(document.getElementById("yos").value.trim());
    let college_id;
    let city = document.getElementById("city").value.trim();
    let state = document.getElementById("state").value.trim();
    let sports_ids = sel_sports.map((sport) => sport.id);
    let is_coach = document.getElementById("coach").checked;
    avail_colleges.some((college, idx) => {
      let col_name = document.getElementById("college").value;
      if (college.name === col_name) {
        college_id = college.id;
        return;
      }
    });
    genders.forEach((gender_elem) => {
      if (gender_elem.checked) {
        gender = gender_elem.value;
      }
    });

    if (
      name === "" ||
      phone === "" ||
      gender === "" ||
      yos === null ||
      city === "" ||
      state === "" ||
      sports_ids === []
    ) {
      alert("Fill all the mentioned fields");
      return;
    }

    let capt = grecaptcha.getResponse();

    let data = {
      name: name,
      email_id: email_id,
      phone: phone,
      gender: gender,
      year_of_study: yos,
      college_id: college_id,
      city: city,
      state: state,
      sports_ids: sports_ids,
      is_coach: is_coach,
      captcha: capt,
    };

    let res = await fetch(`${END_POINT}/register/`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res_json = await res.json();

    alert(res_json.message);

    if (res.ok) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("yos").value = "";
      document.getElementById("college").value = "";
      document.getElementById("city").value = "";
      document.getElementById("state").value = "";
      document.getElementById("sports").value = "";
      avail_sports = [...avail_sports, ...sel_sports];
      sel_sports = [];
    } else {
      grecaptcha.reset();
    }
  } catch (e) {
    console.log(e);
  }
}

const submit_handler = (evt) => {
  evt.preventDefault();
  console.log("SUBMITTING");
  grecaptcha.execute();
};

const set_sport_list = () => {
  sports_avail_html = ``;
  sports_sel_html = ``;
  avail_sports.forEach((val) => {
    sports_avail_html = `${sports_avail_html}<option label="${val.name}" value="${val.name}" />`;
  });
  sport_list.innerHTML = sports_avail_html;
  sel_sports.forEach((val) => {
    sports_sel_html = `${sports_sel_html}<li class="sport-item">${val.name}</li>`;
  });
  sport_sel_list.innerHTML = sports_sel_html;
  if (sel_sports.length === 0) {
    sport_sel_list.style.display = "none";
  } else {
    sport_sel_list.style.display = "flex";
  }
};

const init_form = async () => {
  await get_elems();
  set_sport_list();
};

sport_inpt.addEventListener("input", (evt) => {
  let col_idx = -1;
  avail_sports.some((sport, idx) => {
    if (sport.name === evt.target.value) {
      col_idx = idx;
      return;
    }
  });
  if (col_idx >= 0) {
    sel_sports.push(avail_sports[col_idx]);
    avail_sports.splice(col_idx, 1);
    evt.target.value = "";
    set_sport_list();
  }
});

form.addEventListener("submit", submit_handler);

document.querySelectorAll(".sport-item").forEach((ele) => {
  ele.addEventListener("click", (evt) => {
    avail_sports.push(ele.textContent);
    sel_sports.splice(sel_sports.indexOf(ele.textContent), 1);
    set_sport_list();
  });
});

init_form();
