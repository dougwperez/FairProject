var header = document.getElementById("welcome-screen-header").style;
var bubbles = document.getElementById("bubbles-body").style;
var screen1Array = document.getElementsByClassName("screen-1");
var screen2Array = document.getElementsByClassName("screen-2");
var resetBtn = document.getElementsByClassName("close")[0];
var charCount = document.getElementById('char-count-overlay')
var form = document.getElementsByClassName("search-bar-content")[0]
var searchInput = document.getElementById("searchText")
var loader = document.getElementById("loader")
var resultsContent = document.getElementsByClassName("results-content")[0]

searchInput.addEventListener('input', function (event) {
  if (searchInput.value.length > 0) {
  resetBtn.style.visibility = 'visible'
  } 
  charCount.innerHTML = `${searchInput.value.length}/1000`
  // resultsContent.insertAdjacentHTML("afterbegin", finalChat)
});

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
  for (let item of screen1Array) {
    item.style.display = "inline";
    item.style.opacity = 1;
  }

}
function closeOverlay() {
  form.reset()
  resetSearch()
  // document.body.style.overflow = "visible";
  Object.values(overlays).forEach((el) => el.classList.remove("open"));
  overlayBg.classList.remove("open");

  for (let item of screen1Array) {
    item.style.display = "none";
    item.style.opacity = 1;
  }

  for (let item of screen2Array) {
    item.style.display = "none";
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
  // Fade in Loader
  // setTimeout
  // loader.style.display = 'block';

  // TEST LOADER
  // loader.style.display = 'block';

  // PROD LOADER -NOTE, IF RESPONSE COMES IN EARLY, THIS COULD BREAK:
  setTimeout(function(){
    loader.style.display = 'block';
}, 800);
}

function errorTemplate(data) {

  return `
  <h5 class='screen-2 results-question'>${data}</h5>
  <hr id="divider" class="screen-2" />
  <div class="screen-2-body screen-2">
  <p class="screen-2 error-body-text">No information found for <b>${data}</b></p>
</div>
  `
}


function textToHTML(inputText) {

  const numericSplits = inputText.split(/\d+\./)
  const bulletSplits = inputText.split('*');

  const splitFactor = bulletSplits.length >= numericSplits.length ? '*' : /\d+\./

  let priorities = inputText.split(splitFactor).filter(item => item.trim() !== '');

  let html = `<div>${priorities[0]}`

  html += '<ul>';

  priorities.forEach((priority, index) => {
    if ( index === 0 ){
      return;
    }
      html += `<li>${priority.trim()}</li>`;
  });


  html += '</ul></div>';
  console.log('Koca: html ', html);
  return html;
}


function chatTemplate(data) {
  
  const referencesArray = data.references

  const isReferenceUnique = (reference, index, array) => {
    const jsonString = JSON.stringify(reference);
    return index === array.findIndex((obj) => JSON.stringify(obj) === jsonString);
  }
  
  const uniqueReferences = referencesArray.filter(isReferenceUnique);
  
  return `
  <h5 class='screen-2 results-question'>${data.prompt}</h5>
  <hr id="divider" class="screen-2" />
  <div class="screen-2-body screen-2">
  <div class="screen-2 body-text">${textToHTML(data.content)}</div>
  <div class="screen-2 references-section">
    <h5 class="references-header">References</h5>
    <div class="link-list">
    ${uniqueReferences.map((reference) =>{
      return `<a class="reference" href="${reference.link}">${reference.title}</a>`;
        }).join('')}
    </div>
  </div>
</div>
  `
}

function generateResponse() {

  event.preventDefault()
  fadeOutWelcomeScreen();

// TEST ENV !!!!!!!!!!!!!!!!!!!!!!!!!!!
// const url = "https://javascripttest-s45m7n7ksq-uc.a.run.app";

// PROD ENV ***************************
const url = 'https://cdomag.ice.rackspace.net'

// const url = "https://us-central1-fair-cdo-prj-6e5b.cloudfunctions.net/cf-fair-rss-query"

// ERROR ENV
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

      const responseData = await response.json(); // Parse the JSON response

      const modifiedMarkup =  chatTemplate(responseData)
      resultsContent.insertAdjacentHTML("afterbegin", modifiedMarkup)

    } else {
      loader.style.display = 'none';
      console.log("Error Screen")
      const modifiedErrorMarkup =  errorTemplate(searchInput.value)
      resultsContent.insertAdjacentHTML("afterbegin", modifiedErrorMarkup)
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
