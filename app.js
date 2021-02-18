////////--------------------------------   BUILDS FIRST PAGE // (Fetch Data,Carousel,Search Input(List Of Parks,Error Div))  ----------------------------------------//////////////////

api_Url =
  document.location.hostname === "localhost"
    ? "https://cors-anywhere.herokuapp.com/http://localhost:8080/parks.json"
    : "https://cors-anywhere.herokuapp.com/https://np-mobile-app-version2.netlify.app/parks.json";

fetch(`${api_Url}`)
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);
    let data = result.data;
    // console.log(data[0].images[1].url)

    // builds carousel + fills content:
    let carousel = document.getElementById("carouselID");

    for (let i = 0; i < data.length; i++) {
      for (let x = 0; x < data[i].images.length; x++) {
        let carouselItem = document.createElement("figure");
        carouselItem.setAttribute("class", "carousel-item");
        let parkName = document.createElement("figcaption");
        parkName.setAttribute("id", data[i].id);
        parkName.setAttribute("class", "imgCaption");
        parkName.innerHTML = data[i].name;
        parkName.addEventListener("click", function (event) {
          filterContentParkList(data, event);
        });

        let parkType = document.createElement("figcaption");
        parkType.innerHTML = "(" + data[i].designation + ")";

        // work around bc no backend for imgs:
        let img = document.createElement("img");
        img.src =
          document.location.hostname === "localhost"
            ? "http://localhost:8081/signature/auto/200/0/sm/0/plain/" +
              data[i].images[x].url
            : "/Images/parks/" + data[i].images[x].url.split("/").pop();
        // base64 encoded url:
        // "http://localhost:8081/signature/auto/200/0/sm/0/" + btoa(result.data[i].images[x].url);

        carouselItem.appendChild(img);
        carouselItem.appendChild(parkName);
        carouselItem.appendChild(parkType);
        carousel.appendChild(carouselItem);
      }
    }
    M.AutoInit(); // calls the carousel
    filterParkListDiv(data);
  })
  .catch(function (error) {
    console.log(error, "this is wrong");
  });

// filters the list of park - depending on search input:
function filterParkListDiv(parks) {
  document.getElementById("searchButton").addEventListener("click", () => {
    // when clicked shows filtered search below:
    let searchTerm = document.getElementById("searchInput").value;
    let filteredList = [];

    parks.forEach(function (park) {
      if (
        searchTerm.toLowerCase() === park.name.toLowerCase() ||
        searchTerm.toLowerCase() === park.states.toLowerCase()
      ) {
        filteredList.push(park);
        document.getElementById("dropdownList").style.visibility = "visible";
      } else if (!searchTerm) {
        document.getElementById("carouselID").style.display = "block";
        document.getElementById("errorDiv").style.visibility = "hidden";
        document.getElementById("dropdownList").style.visibility = "hidden";
      }
    });
    buildParkListDiv(filteredList);

    document.getElementById("headline").style.visibility = "hidden";
  });
}

// to use ENTER on keyboard:
function handleKeyPress(e) {
  let searchButton = document.getElementById("searchButton");

  e = e || window.event;
  if (e.keyCode === 13) {
    searchButton.click();
    return false;
  }
}
let searchInput;
searchInput = document.getElementById("searchInput");
searchInput.onkeypress = handleKeyPress;

// creates + fills park list div:
function buildParkListDiv(data) {
  if (!data.length) {
    // Error Message Div:
    let parkListError = document.getElementById("errorDiv");
    parkListError.setAttribute("class", "contextErrorInfo");
    parkListError.innerHTML = "";
    let listError = document.createElement("p");
    listError.innerHTML = "Check Typing  -?-  No Parks listed";
    let listError1 = document.createElement("a");
    listError1.setAttribute("class", "errorText blue-text darken-3");
    listError1.setAttribute("href", "http://nps.gov");
    listError1.setAttribute("target", "_blank");
    listError1.innerHTML =
      "click HERE to check official Nat.Park Service Website";

    parkListError.appendChild(listError);
    parkListError.appendChild(listError1);

    document.getElementById("errorDiv").style.visibility = "visible";
    document.getElementById("carouselID").style.display = "none";
    document.getElementById("dropdownList").style.visibility = "hidden";
  } else {
    let parkListDiv = document.getElementById("dropdownList");
    parkListDiv.addEventListener(
      "mouseover",
      function (event) {
        // highlights the mouseover target:
        event.target.style.color = "rgb(234, 250, 8)";
        // resets the color after a short delay:
        setTimeout(function () {
          event.target.style.color = "";
        }, 200);
      },
      false
    );

    parkListDiv.classList.add;
    parkListDiv.innerHTML = "";

    data.forEach((park) => {
      // to get parkID
      let divTR = document.createElement("div");
      divTR.className = "divTR";

      let parkListDisplay = document.createElement("p");
      parkListDisplay.innerHTML = park.fullName + " / " + park.states;
      parkListDisplay.setAttribute("id", park.id);
      parkListDisplay.setAttribute("data-parkCode", park.parkCode);
      parkListDisplay.className = "parkClick";
      parkListDisplay.style.color = "white";

      // by click event the parkId + parkCode gets transmitted:
      parkListDisplay.addEventListener("click", function (event) {
        filterContentParkList(data, event);
      });

      parkListDiv.appendChild(divTR);
      divTR.appendChild(parkListDisplay);

      document.getElementById("carouselID").style.display = "none";
      document.getElementById("errorDiv").style.visibility = "hidden";
    });
  }
}

// filters which park of list is shown + displays on second page:
function filterContentParkList(data, event) {
  data.forEach(function (info) {
    if (event.target.id === info.id) {
      buildSecondPage(info);
    }
  });
}
