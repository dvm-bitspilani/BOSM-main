const END_POINT = "https://www.bitsbosm.org/2022/registrations";

const form = document.getElementById("reg-form");
const sport_inpt = document.getElementById("sports");
const sport_sel_list = document.getElementById("sport-sel-list");
const sport_list = document.getElementById("sport-list");
const college_list = document.getElementById("college-list");
const col_inpt = document.getElementById("college");
const yos_list = document.getElementById("yos-list");
const yos_inpt = document.getElementById("yos");

let win_height = window.innerHeight,
  win_width = window.innerWidth,
  avail_sports = [],
  sel_sports = [],
  mat_sports = [],
  sports_avail_html = ``,
  sports_sel_html = ``,
  avail_colleges = [],
  mat_colleges = [],
  college_html = ``,
  avail_yos = [1, 2, 3, 4, 5],
  mat_yos = [...avail_yos],
  yos_html = ``,
  yos_list_disp = false,
  col_list_disp = false,
  sport_list_disp = false,
  prevent_scroll = false,
  newTop = 0;
let scrollInterval;

const set_vh = () => {
  let vh = win_height * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const set_disp_list = () => {
  if (col_list_disp) {
    college_list.style.display = "grid";
    yos_list.style.display = "none";
    sport_list.style.display = "none";
    if (win_width < 800) {
      newTop = window.pageYOffset + col_inpt.getBoundingClientRect().top - 40;
      prevent_scroll = true;
      window.scrollTo({ top: newTop, behavior: "smooth" });
    }
  } else if (yos_list_disp) {
    college_list.style.display = "none";
    yos_list.style.display = "grid";
    sport_list.style.display = "none";
    if (win_width < 800) {
      newTop = window.pageYOffset + yos_inpt.getBoundingClientRect().top - 40;
      prevent_scroll = true;
      window.scrollTo({ top: newTop, behavior: "smooth" });
    }
  } else if (sport_list_disp) {
    college_list.style.display = "none";
    yos_list.style.display = "none";
    sport_list.style.display = "grid";
    if (win_width < 800) {
      newTop = window.pageYOffset + sport_inpt.getBoundingClientRect().top - 40;
      prevent_scroll = true;
      window.scrollTo({ top: newTop, behavior: "smooth" });
    }
  } else {
    college_list.style.display = "none";
    yos_list.style.display = "none";
    sport_list.style.display = "none";
  }
};

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
    mat_sports = [...avail_sports];
    mat_colleges = [...avail_colleges];
  } catch (e) {
    alert("Failure in getting data");
  }
};

const set_college_ul = () => {
  let college_pat = ``;
  college_html = ``;
  mat_colleges.forEach((val) => {
    let college_esc = val.name.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    college_html = `${college_html}<li>${val.name}</li>`;
    college_pat = `${college_pat}|${college_esc}`;
  });
  college_list.innerHTML = college_html;
  col_inpt.pattern = college_pat;
  document.querySelectorAll("#college-list>li").forEach((ele) => {
    ele.addEventListener("click", () => {
      col_inpt.value = ele.textContent;
      col_inpt.dispatchEvent(new Event("input"));
    });
  });
};

const set_yos_ul = () => {
  yos_html = ``;
  mat_yos.forEach((val) => {
    yos_html = `${yos_html}<li>${val}</li>`;
  });
  yos_list.innerHTML = yos_html;
  document.querySelectorAll("#yos-list>li").forEach((ele) => {
    ele.addEventListener("click", () => {
      yos_inpt.value = ele.textContent;
      yos_inpt.dispatchEvent(new Event("input"));
    });
  });
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
    console.log(capt);

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
      set_sport_list();
    }
    grecaptcha.reset();
  } catch (e) {
    console.log(e);
  }
}

const submit_handler = (evt) => {
  evt.preventDefault();
  // alert('Registrations Closed!');
  grecaptcha.execute();
};

const set_list_coord = () => {
  if (
    win_height - yos_inpt.getBoundingClientRect().bottom >
    yos_list.getBoundingClientRect().height + 20
  ) {
    yos_list.style.top = "100%";
    yos_list.style.bottom = "auto";
  } else {
    yos_list.style.top = "auto";
    yos_list.style.bottom = "100%";
  }
  if (
    win_height - col_inpt.getBoundingClientRect().bottom >
    college_list.getBoundingClientRect().height
  ) {
    college_list.style.top = "100%";
    college_list.style.bottom = "auto";
  } else {
    college_list.style.top = "auto";
    college_list.style.bottom = "100%";
    ("polygon(0 100%, 100% 100%, 100% 100%, 0 100%)");
  }
  if (
    win_height - sport_inpt.getBoundingClientRect().bottom >
    sport_list.getBoundingClientRect().height + 20
  ) {
    sport_list.style.top = "30%";
    sport_list.style.bottom = "auto";
  } else {
    sport_list.style.top = "auto";
    sport_list.style.bottom = "100%";
  }
};

const set_sport_list = () => {
  sports_avail_html = ``;
  sports_sel_html = ``;

  mat_sports.forEach((val) => {
    sports_avail_html = `${sports_avail_html}<li>${val.name}</li>`;
  });

  sport_list.innerHTML = sports_avail_html;

  document.querySelectorAll("#sport-list>li").forEach((ele) => {
    ele.addEventListener("click", () => {
      sport_inpt.value = ele.textContent;
      sport_inpt.dispatchEvent(new Event("input"));
    });
  });

  if (sel_sports.length === 0) {
    sport_sel_list.innerHTML = `<li class="sport-item">SELECT ONE OR MORE SPORTS</li>`;
    return;
  }
  sel_sports.forEach((val) => {
    sports_sel_html = `${sports_sel_html}<li class="sport-item">${val.name} <div class="cross"></div></li>`;
  });

  sport_sel_list.innerHTML = sports_sel_html;

  document.querySelectorAll(".sport-item").forEach((ele) => {
    let cross = ele.querySelector(".cross");
    let text = ele.textContent.trim();
    cross.addEventListener("click", (evt) => {
      let ele_idx = -1;
      sel_sports.some((sport, idx) => {
        if (sport.name === text) {
          ele_idx = idx;
          return;
        }
      });
      avail_sports.push(sel_sports[ele_idx]);
      sel_sports.splice(ele_idx, 1);
      set_sport_list();
    });
  });
};

const init_form = async () => {
  await get_elems();
  set_sport_list();
  set_yos_ul();
  set_college_ul();
  yos_list.style.display = "none";
  college_list.style.display = "none";
  sport_list.style.display = "none";
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
  }
  mat_sports = avail_sports.filter((elem) =>
    elem.name.toLowerCase().includes(evt.target.value)
  );
  set_sport_list();
});

col_inpt.addEventListener("input", (evt) => {
  mat_colleges = avail_colleges.filter((elem) =>
    elem.name.toLowerCase().includes(evt.target.value.toLowerCase())
  );
  set_college_ul();
});

yos_inpt.addEventListener("input", (evt) => {
  mat_yos = avail_yos.filter((elem) =>
    elem.toString().toLowerCase().includes(evt.target.value)
  );
  set_yos_ul();
});

form.addEventListener("submit", submit_handler);

window.addEventListener("resize", () => {
  win_height = window.innerHeight;
  win_width = window.innerWidth;
  set_vh();
  set_disp_list();
});

document.addEventListener("scroll", () => {
  set_list_coord();
  if (!prevent_scroll) {
    college_list.style.display = "none";
    yos_list.style.display = "none";
    sport_list.style.display = "none";
  } else {
    clearInterval(scrollInterval);
    scrollInterval = setTimeout(() => {
      prevent_scroll = false;
    }, 200);
  }
});

document.addEventListener("click", (evt) => {
  if (col_inpt.contains(evt.target) || college_list.contains(evt.target)) {
    col_list_disp = true;
    yos_list_disp = false;
    sport_list_disp = false;
  } else if (yos_inpt.contains(evt.target) || yos_list.contains(evt.target)) {
    col_list_disp = false;
    yos_list_disp = true;
    sport_list_disp = false;
  } else if (
    sport_inpt.contains(evt.target) ||
    sport_list.contains(evt.target)
  ) {
    col_list_disp = false;
    yos_list_disp = false;
    sport_list_disp = true;
  } else {
    col_list_disp = false;
    yos_list_disp = false;
    sport_list_disp = false;
  }
  set_disp_list();
});

set_vh();
init_form();
