
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
  overlayBg.classList.add('open');
  names.map((name)=> overlays[name].classList.add('open') )



}
function closeOverlay() {
  Object.values(overlays).forEach(el => el.classList.remove('open'));
  overlayBg.classList.remove('open');
}


const searchText = document.querySelector("#searchText");

function generateResponse() {
  console.log('searchText', searchText.value)



  async function logMovies() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const movies = await response.json();
    console.log(movies);
  }

  logMovies()

  const url = 'https://javascripttest-s45m7n7ksq-uc.a.run.app';
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'POST, PATCH, OPTIONS'
};
const data = {
  prompt: 'What is',
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

