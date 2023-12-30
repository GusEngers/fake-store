const button = document.getElementById('button');
const nav = document.getElementById('nav');

button.onclick = function () {
  if (nav.classList.contains('expand-on')) {
    button.textContent = 'Ξ';
    nav.classList.replace('expand-on', 'expand-off');
  } else {
    button.textContent = 'X';
    nav.classList.replace('expand-off', 'expand-on');
  }
};
