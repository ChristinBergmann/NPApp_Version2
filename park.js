///////-----------------------------------------------------  BUILDS SECOND PAGE (Park Infos) --------------------------------------------------////////

function buildSecondPage(parks) {
  let secondPage = document.getElementById("secondPage");
  secondPage.innerHTML = "";

  // Park Name:
  let divParkHeader = document.createElement("div");
  divParkHeader.setAttribute("class", "campDiv");
  let parkName = document.createElement("h1");
  parkName.innerHTML = parks.name;

  // Nav Button Directions:
  let divNavButtons = document.createElement("div");
  divNavButtons.setAttribute("class", "navBTN");
  let buttonDirections = document.createElement("button");
  buttonDirections.setAttribute("id", parks.id);
  buttonDirections.setAttribute(
    "class",
    "link-btn waves-effect waves-light btn-small #ffeb3b yellow"
  );
  buttonDirections.innerHTML = "How to get there";

  // builds third page:
  buttonDirections.addEventListener("click", function (event) {
    buildThirdPage(parks, event);
    // initMap()
  });

  // Nav Button Campgrounds:
  let buttonCampgrounds = document.createElement("button");
  buttonCampgrounds.setAttribute("data-parkCode", parks.parkCode);
  buttonCampgrounds.setAttribute(
    "class",
    "link-btn waves-effect waves-light btn-small #ffeb3b yellow"
  );
  buttonCampgrounds.innerHTML = "Find a Campground";

  // on click the parkcode is transmitted- builds fourth page:
  buttonCampgrounds.addEventListener("click", function (event) {
    let parkCode = event.target.getAttribute("data-parkCode");
    buildFourthPage(event, parkCode);
  });

  // Park Description:
  let divDescription = document.createElement("div");
  divDescription.setAttribute("class", "contextInfo");
  let headDescription = document.createElement("h2");
  headDescription.innerHTML = "Description:";
  let contextDescription = document.createElement("div");
  contextDescription.setAttribute("class", "contextDiv");
  let textDescription = document.createElement("p");
  textDescription.innerHTML = parks.description;

  // Park Weather Description:
  let divWeather = document.createElement("div");
  divWeather.setAttribute("class", "contextInfo");
  let headWeather = document.createElement("h2");
  headWeather.innerHTML = "Weather Information:";
  let contextWeather = document.createElement("div");
  contextWeather.setAttribute("class", "contextDiv");
  let textWeather = document.createElement("p");
  textWeather.innerHTML = parks.weatherInfo;
  textWeather.setAttribute("href", parks.weatherInfo); // pure link works but not if its w text or just "a"tag
  textWeather.setAttribute("target", "_blank");

  // BACK button:
  let backButton1 = document.createElement("div");
  backButton1.setAttribute("id", "backBTN");

  let button1 = document.createElement("button");
  button1.setAttribute("id", "button");
  button1.innerHTML = "BACK";
  button1.className = "btn waves-effect waves-#ffeb3b yellow";

  // first Page is shown + second Page is hidden:
  button1.addEventListener("click", function () {
    document.getElementById("firstPage").classList.add("active");
    document.getElementById("secondPage").classList.remove("active");
  });

  secondPage.appendChild(divParkHeader);
  divParkHeader.appendChild(parkName);
  divParkHeader.appendChild(divNavButtons);

  divNavButtons.appendChild(buttonDirections);
  divNavButtons.appendChild(buttonCampgrounds);

  divParkHeader.appendChild(divDescription);
  divDescription.appendChild(headDescription);
  divDescription.appendChild(contextDescription);
  contextDescription.appendChild(textDescription);

  divParkHeader.appendChild(divWeather);
  divWeather.appendChild(headWeather);
  divWeather.appendChild(contextWeather);
  contextWeather.appendChild(textWeather);

  secondPage.appendChild(backButton1);
  backButton1.appendChild(button1);

  document.getElementById("secondPage").classList.add("active");
  document.getElementById("firstPage").classList.remove("active");
  document.getElementById("headline").style.display = "none";
}
