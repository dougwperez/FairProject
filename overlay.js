var header = document.getElementById("welcome-screen-header").style;
var bubbles = document.getElementById("bubbles-body").style;
var screen1Array = document.getElementsByClassName("screen-1");
var screen2Array = document.getElementsByClassName("screen-2");
var resetBtn = document.getElementsByClassName("close")[0];
var searchInput = document.getElementById("searchText")


searchInput.addEventListener('input', function (event) {
	// Do something...
  console.log("CONTACT", searchInput.value.length)
  if (searchInput.value.length > 0) {
  resetBtn.style.visibility = 'visible'
  } 
});

function resetSearch(){
  console.log("reset")
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
console.log('Koca: width ', width);


function callback(mutations) {
  console.log('Koca: mutations ', mutations);
  if (searchInput.value.length > 0) {
    resetBtn.style.visibility = 'visible'
  }
}

function openOverlay(names) {
  document.body.style.overflow = "hidden";
  overlayBg.classList.add("open");
  names.map((name) => overlays[name].classList.add("open"));
  resetBtn.style.visibility = 'hidden'
  if (searchInput.value.length > 0) {
    resetBtn.style.visibility = 'visible'
  }
  console.log("searchInput", searchInput.value)
  console.log('Koca: searchInput.value.length ', searchInput.value.length);

  let observer = new MutationObserver(callback);
  observer.observe(searchInput, characterData);

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

function generateResponse() {
  event.preventDefault()
  fadeOutWelcomeScreen();

  const url = "https://javascripttest-s45m7n7ksq-uc.a.run.app";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
  };
  const data = {
    prompt: "What is",
  };

  // Create the fetch request
  fetch(url, {
    method: "POST",
    headers: headers,
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Check if the response is successful (status code 200-299)
      console.log("response", response);
      if (response.ok) {
        console.log("Koca: response.json() ", response.json());
        return response.json(); // Parse the JSON response
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .then((data) => {
      // Handle the JSON data returned from the server
      console.log("Response data:", data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
}
