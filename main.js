const t = document.getElementById("time");
const g = document.getElementById("greeting");
const n = document.getElementById("name");
const f = document.getElementById("focus");

n.addEventListener("keypress", setName);
n.addEventListener("blur", setName);
f.addEventListener("keypress", setFocus);
f.addEventListener("blur", setFocus);

function setTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  t.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}`;

  setTimeout(setTime, 1000);
}

function addZero(x) {
  return (parseInt(x) < 10 ? "0" : "") + x;
}

function setBackground() {
  let hour = new Date().getHours();
  if (hour < 12) {
    document.body.style.backgroundImage = "url('img/morning.jpg')";
    g.textContent = "Good Morning";
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('img/afternoon.jpg')";
    g.textContent = "Good Afternoon";
  } else {
    document.body.style.backgroundImage = "url('img/evening.jpg')";
    document.body.style.color = "white";
    g.textContent = "Good Evening";
  }
}

function getName() {
  if (localStorage.getItem("n") === null) {
    n.textContent = "[Enter Name]";
  } else {
    n.textContent = localStorage.getItem("n");
  }
}

function setName(ev) {
  if (ev.type === "keypress") {
    if (ev.which == 13 || ev.keyCode == 13) {
      localStorage.setItem("n", ev.target.innerText);
      n.blur();
    }
  } else {
    localStorage.setItem("n", ev.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem("f") === null) {
    f.textContent = "[Enter Focus]";
  } else {
    f.textContent = localStorage.getItem("f");
  }
}

function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("f", e.target.innerText);
      f.blur();
    }
  } else {
    localStorage.setItem("f", e.target.innerText);
  }
}

setTime();
setBackground();
getName();
getFocus();
