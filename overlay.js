// const open = document.querySelector('[data-open-modal]');
// const close = document.querySelector('[data-close-modal]');
// const modal = document.querySelector('[data-modal]');

// open.addEventListener('click',()=>{
//   modal.showModal()
// });
// // no key listeners used
// close.addEventListener('click',()=>{
//   modal.close()
// });

let overlays = {},
    overlayBg = document.createElement('div');
overlayBg.classList.add('overlayBg');
overlayBg.onclick = closeOverlay;
document.body.appendChild(overlayBg);
document.querySelectorAll('[overlay]').forEach(el => {
  overlays[el.getAttribute('overlay')] = el;
  el.innerHTML += '<button class="close" onclick="closeOverlay()">&times;</button>';
});

function openOverlay(name) {
  overlayBg.classList.add('open');
  overlays[name].classList.add('open');
}
function closeOverlay() {
  Object.values(overlays).forEach(el => el.classList.remove('open'));
  overlayBg.classList.remove('open');
}