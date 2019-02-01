// trigger JS availability after the page loads
document.addEventListener("DOMContentLoaded", pageCore);

function pageCore() {
  const currentYear = new Date().getFullYear();
  console.log(`current year: ${currentYear}`);

  // set the current year
  document.getElementById('thisYear').innerHTML = currentYear;

}