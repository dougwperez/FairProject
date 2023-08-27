
let overlays = {},
    overlayBg = document.createElement('div');
overlayBg.classList.add('overlayBg');
overlayBg.onclick = closeOverlay;
document.body.appendChild(overlayBg);
document.querySelectorAll('[overlay]').forEach(el => {
  overlays[el.getAttribute('overlay')] = el;
  el.innerHTML += '<button class="close" onclick="closeOverlay()">&times;</button>';
});

function openOverlay(names) {
  overlayBg.classList.add('open');
  names.map((name)=> overlays[name].classList.add('open') )



}
function closeOverlay() {
  Object.values(overlays).forEach(el => el.classList.remove('open'));
  overlayBg.classList.remove('open');
}