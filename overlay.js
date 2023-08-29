
let overlays = {},
    overlayBg = document.createElement('div');
overlayBg.classList.add('overlayBg');
overlayBg.onclick = closeOverlay;
document.body.appendChild(overlayBg);
document.querySelectorAll('[overlay]').forEach(el => {
  overlays[el.getAttribute('overlay')] = el;
  // el.innerHTML += '<button class="close" onclick="closeOverlay()">&times;</button>';
});

function openOverlay(names) {
  document.body.style.overflow = 'hidden';
  overlayBg.classList.add('open');
  names.map((name)=> overlays[name].classList.add('open') )
}
function closeOverlay() {
  document.body.style.overflow = 'visible';
  Object.values(overlays).forEach(el => el.classList.remove('open'));
  overlayBg.classList.remove('open');
}

function fadeOutWelcomeScreen(){
  let header = document.getElementById('welcome-screen-header').style;
  header.opacity = 1;
  (function fade(){(header.opacity-=.1)<0?header.display="none":setTimeout(fade,40)})();

  let bubbles = document.getElementById('bubbles-body').style;
  bubbles.opacity = 1;
  (function fade(){(bubbles.opacity-=.1)<0?bubbles.display="none":setTimeout(fade,40)})();

}


const searchText = document.querySelector("#searchText");

function generateResponse() {


fadeOutWelcomeScreen()



  const url = 'https://javascripttest-s45m7n7ksq-uc.a.run.app';
const headers = {
  'Content-Type': "application/json",
  "Access-Control-Allow-Origin":'*',
  'Access-Control-Allow-Methods':'POST, PATCH, OPTIONS'
};
const data = {
  "prompt": "What is",
};

// Create the fetch request
fetch(url, {
  method: 'POST',
  headers: headers,
  mode: 'no-cors',
  body: JSON.stringify(data),
})
  .then(response => {
    // Check if the response is successful (status code 200-299)
    console.log("response", response)
    if (response.ok) {
      console.log('Koca: response.json() ', response.json());
      return response.json(); // Parse the JSON response
      
    } else {
      throw new Error('Request failed with status: ' + response.status);
    }
  })
  .then(data => {
    // Handle the JSON data returned from the server
    console.log('Response data:', data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
  });

  

}

