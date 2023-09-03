var header = document.getElementById("welcome-screen-header").style;
var bubbles = document.getElementById("bubbles-body").style;
var screen1Array = document.getElementsByClassName("screen-1");
var screen2Array = document.getElementsByClassName("screen-2");
// var errorScreenArray = document.getElementsByClassName("error-screen");
var resetBtn = document.getElementsByClassName("close")[0];
var charCount = document.getElementById('char-count-overlay')
var form = document.getElementsByClassName("search-bar-content")[0]
console.log('Koca: form ', form);
var searchInput = document.getElementById("searchText")
var loader = document.getElementById("loader")
var resultsContent = document.getElementsByClassName("results-content")[0]




searchInput.addEventListener('input', function (event) {
  console.log("DSJFLDSJFJL")
  if (searchInput.value.length > 0) {
  resetBtn.style.visibility = 'visible'
  } 
  charCount.innerHTML = `${searchInput.value.length}/1000`
  resultsContent.insertAdjacentHTML("afterbegin", finalChat)
});


// document.getElementsByClassName('search-icon')[0].addEventListener('click', function (event) {
// generateResponse()
// });

// document.getElementsByClassName("search-bar-content")[0].addEventListener('submit', (event) => {
//   generateResponse()
// })

function resetSearch(){
  resetBtn.style.visibility = 'hidden'
  charCount.innerHTML = '0/1000'
}

let overlays = {},
  overlayBg = document.createElement("div");
overlayBg.classList.add("overlayBg");
overlayBg.onclick = closeOverlay;
document.body.appendChild(overlayBg);
document.querySelectorAll("[overlay]").forEach((el) => {
  overlays[el.getAttribute("overlay")] = el;
});

let width = window.innerWidth;



function openOverlay(names) {
  document.body.style.overflow = "hidden";
  loader.style.display = 'none'
  overlayBg.classList.add("open");
  names.map((name) => overlays[name].classList.add("open"));
  resetBtn.style.visibility = 'hidden'
  if (searchInput.value.length > 0) {
    resetBtn.style.visibility = 'visible'
  }

}
function closeOverlay() {
  form.reset()
  resetSearch()
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


function fadeInLoader() {
  loader.style.display = 'block';
  // var opacity = 0;
  // loader.style.display = 'block';
  // loader.style.opacity = 0;

  // var fadeInterval = setInterval(function () {
  //   if (opacity < 1) {
  //     opacity += 0.1;
  //     loader.style.opacity = opacity;
  //   } else {
  //     clearInterval(fadeInterval);
  //   }
  // }, 100); // Adjust the interval for smoother or faster fading
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
  fadeInLoader()
  // THE CODE BELOW ONLY WORKS IF THE API IS DELAYED
  // setTimeout(() => {
  //   // loader.style.display = 'block';
  //   fadeInLoader()
  // }, 800);
}




function chatTemplate(data) {
  return `
  <h5 class='screen-2 results-question'>${data.prompt}</h5>
  <hr id="divider" class="screen-2" />
  <div class="screen-2-body">
  <p class="screen-2 body-text">${data.content}</p>
  <div class="vl screen-2"></div>
  <div class="screen-2 references-section">
    <h5 class="references-header">References</h5>
    <div class="link-list">
      <a href="https://www.w3schools.com"> <a href="https://www.w3schools.com">The Top 10 Tasks</a></a>
      <a href="https://www.w3schools.com"> <a href="https://www.w3schools.com">Training for new CDOS</a></a>
    </div>
  </div>
</div>
  `
}

function generateResponse() {

  event.preventDefault()
  fadeOutWelcomeScreen();


  const url = "https://javascripttest-s45m7n7ksq-uc.a.run.app";
  // const url = "https://us-central1-fair-cdo-prj-6e5b.cloudfunctions.net/cf-fair-rss-query"
// const url = "https://us-central1-fair-cdo-prj-6e5b.cloudfunctions.net/cf-fr-rss-qry";
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
      loader.style.display = 'none';
      console.log('Koca: loader ', loader);
     
      const responseData = await response.json(); // Parse the JSON response

      const finalChat =  chatTemplate(responseData)
      resultsContent.insertAdjacentHTML("afterbegin", finalChat)

    } else {
      loader.style.display = 'none';
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    loader.style.display = 'none';
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
  }
}

fetchData();

}
