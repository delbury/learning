const clock = document.getElementById('clock');
getTime();

function getTime() {
  clock.innerHTML = new Date().toLocaleString();
  return window.setTimeout(getTime, 1000);
}