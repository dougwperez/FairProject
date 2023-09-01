var header = document.getElementById("welcome-screen-header").style;
var bubbles = document.getElementById("bubbles-body").style;
var screen1Array = document.getElementsByClassName("screen-1");
var screen2Array = document.getElementsByClassName("screen-2");
var errorScreenArray = document.getElementsByClassName("error-screen");
var resetBtn = document.getElementsByClassName("close")[0];
var searchInput = document.getElementById("searchText")
var responseBody = document.getElementsByClassName("screen-2 body-text")[0]
var responsePrompt = document.getElementsByClassName("screen-2 results-question")[0]
var errorResponsePrompt = document.getElementsByClassName("error-screen results-question")[0]
var errorResponseBody = document.getElementsByClassName("error-screen body-text")[0]
var errorResponseBody2 = document.getElementsByClassName("error-screen body-text-header")[0]


searchInput.addEventListener('input', function (event) {
  if (searchInput.value.length > 0) {
  resetBtn.style.visibility = 'visible'
  } 
});

function resetSearch(){
  resetBtn.style.visibility = 'hidden'
}

let overlays = {},
  overlayBg = document.createElement("div");
overlayBg.classList.add("overlayBg");
overlayBg.onclick = closeOverlay;
document.body.appendChild(overlayBg);
document.querySelectorAll("[overlay]").forEach((el) => {
  overlays[el.getAttribute("overlay")] = el;
  // el.innerHTML += '<button class="close" onclick="closeOverlay()">&times;</button>';
});

let width = window.innerWidth;



function openOverlay(names) {
  document.body.style.overflow = "hidden";
  overlayBg.classList.add("open");
  names.map((name) => overlays[name].classList.add("open"));
  resetBtn.style.visibility = 'hidden'
  if (searchInput.value.length > 0) {
    resetBtn.style.visibility = 'visible'
  }

}
function closeOverlay() {
  document.body.style.overflow = "visible";
  Object.values(overlays).forEach((el) => el.classList.remove("open"));
  overlayBg.classList.remove("open");

  for (let item of screen1Array) {
    item.style.display = "inline";
    item.style.opacity = 1;
  }

  for (let item of screen2Array) {
    item.style.display = "none";
  }

  for (let item of errorScreenArray) {
    item.style.display = "none";
  }
}

function fadeInResultsScreen() {
  //  test.style.display = 'inline'

  for (let item of screen2Array) {
    item.style.display = "inline";
  }
}

function fadeOutWelcomeScreen() {
  header.opacity = 1;
  (function fade() {
    (header.opacity -= 0.1) < 0
      ? (header.display = "none")
      : setTimeout(fade, 40);
  })();

  bubbles.opacity = 1;
  (function fade() {
    (bubbles.opacity -= 0.1) < 0
      ? (bubbles.display = "none")
      : setTimeout(fade, 40);
  })();
  setTimeout(() => {
    fadeInResultsScreen();
  }, 800);
}

const searchText = document.querySelector("#searchText");
console.log('Koca: searchText ', searchText);

function generateResponse() {

    console.log("searchInput", searchInput.value)
    console.log("responseBody.innerHTML", responseBody.innerHTML)

  event.preventDefault()
  fadeOutWelcomeScreen();

const url = "https://us-central1-fair-cdo-prj-6e5b.cloudfunctions.net/cf-fr-rss-qry";
const headers = {
  "Content-Type": "application/json",
};

//What are the top 10 priorities for CDOs?
// What is 3-Step Guide for Data Leaders to Move from Hype to Results?


const data = {
  "prompt": `${searchInput.value}`,
};

async function fetchData() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify(data),
    });

    // Check if the response is successful (status code 200-299)
    if (response.ok) {
      const responseData = await response.json(); // Parse the JSON response
      console.log("Response data:", responseData);
      responseBody.innerHTML = responseData.content;
      responsePrompt.innerHTML = responseData.prompt;

    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch
    errorResponsePrompt.innerHTML = searchInput.value;
    errorResponseBody2.innerHTML = `No results found for: <b>"${searchInput.value}"</b>`

    for (let item of screen2Array) {
      item.style.display = "none";
    }

    for (let item of errorScreenArray) {
      item.style.display = "inline";
    }
    
    console.error("Error:", error);
  }
}

fetchData();

}
