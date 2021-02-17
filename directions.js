/////////-------------------------------------------------  BUILDS THIRD PAGE  (Directions to park) -----------------------------------------------////////////////

function buildThirdPage(parks) {
  let thirdPage = document.getElementById("thirdPage");
  thirdPage.innerHTML = "";

  // Park Direction:
  let divHead = document.createElement("div");
  divHead.setAttribute("class", "contextInfoDirections");
  let headMaps = document.createElement("h2");
  headMaps.innerHTML = "Directions:";
  let contextMaps = document.createElement("div");
  contextMaps.setAttribute("class", "contextDiv");
  contextMaps.innerHTML = parks.directionsInfo;

  let hr = document.createElement("hr");
  hr.style.color = "white";
  hr.style.width = "70%";
  hr.style.margin = "7px auto";

  // Link Directions:
  let divMaps = document.createElement("div");
  divMaps.setAttribute("id", "maps");
  let mapsLink = document.createElement("a");
  mapsLink.setAttribute("href", parks.directionsUrl);
  mapsLink.setAttribute("target", "_blank");
  mapsLink.innerHTML = "More Info";

  // BACK button:
  let backButton2 = document.createElement("div");
  backButton2.setAttribute("id", "backBTN");

  let button2 = document.createElement("button");
  button2.setAttribute("id", "button");
  button2.innerHTML = "Previous Page";
  button2.className = "btn waves-effect waves-#ffeb3b yellow onclick";

  // second Page is shown + third Page is hidden:
  button2.addEventListener("click", function () {
    document.getElementById("secondPage").classList.add("active");
    document.getElementById("thirdPage").classList.remove("active");
    document.getElementById("fourthPage").classList.remove("active");
  });

  thirdPage.appendChild(divHead);
  divHead.appendChild(headMaps);
  divHead.appendChild(contextMaps);
  divHead.appendChild(hr);
  divHead.appendChild(divMaps);
  divMaps.appendChild(mapsLink);

  thirdPage.appendChild(backButton2);
  backButton2.appendChild(button2);

  document.getElementById("thirdPage").classList.add("active");
  document.getElementById("secondPage").classList.remove("active");
}

// let maps = document.getElementById("maps")

// function initMap(data) {

//     let map = data[i].latLong

//     // The map, centered at Uluru
//     maps = new google.maps.Map(
//         document.getElementById('maps'), {
//             zoom: 4,
//             center: map
//         });
//     // The marker, positioned at
//     marker = new google.maps.Marker({
//         position: map,
//         map: map
//     });
// }
/// extract data attrib out of the event
