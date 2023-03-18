window.addEventListener("load", () => {
  const api1 = "https://quotes.rest/qod?language=en";
  fetch(api1)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("quote").innerText =
        '" ' + data.contents.quotes[0].quote + ' "';

      if (data.contents.quotes[0].author === null) {
        document.getElementById("author").innerText = "- unknown";
      } else {
        document.getElementById("author").innerText =
          "- " + data.contents.quotes[0].author;
      }
    });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const api = `http://api.weatherapi.com/v1/current.json?key=8c37d27b0d10406a8b383724231803&q=${latitude},${longitude}&days=1`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const getPlace = data.location.name;
          const getRegion = data.location.region;
          const getCountry = data.location.country;
          const getIcon = data.current.condition.icon;
          const getTemp = data.current.temp_c;
          const getDesc = data.current.condition.text;
          document.getElementById("temp").innerText = getTemp + " °C";
          document.getElementById("condition").setAttribute("src", getIcon);
          document.getElementById("location").innerText = getPlace;
          document.getElementById("tooltip1").innerText = getDesc;
          document.getElementById("tooltip2").innerText =
            getPlace + ", " + getRegion + ", " + getCountry;
        });
    });
  }

  const api2 = "https://picsum.photos/v2/list.webp";

  const t = document.getElementById("time");
  const g = document.getElementById("greeting");
  const n = document.getElementById("name");

  n.addEventListener("keypress", setName);
  n.addEventListener("blur", setName);

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
      g.textContent = "Good Morning, ";
    } else if (hour < 18) {
      document.body.style.backgroundImage = "url('img/afternoon.jpg')";
      g.textContent = "Good Afternoon, ";
    } else {
      document.body.style.backgroundImage = "url('img/evening.jpg')";
      g.textContent = "Good Evening, ";
    }
  }

  function getName() {
    if (localStorage.getItem("n") === null) {
      n.textContent = " [Enter Name]";
    } else {
      n.textContent = localStorage.getItem("n");
    }
  }

  function setName(ev) {
    if (ev.type === "keypress") {
      if ((ev.which == 13 || ev.keyCode == 13) && ev.target.innerText !== "") {
        localStorage.setItem("n", ev.target.innerText);
        n.blur();
      }
    } else {
      localStorage.setItem("n", ev.target.innerText);
    }
  }

  setTime();
  setBackground();
  getName();
});
