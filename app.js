// trigger JS availability after the page loads
document.addEventListener('DOMContentLoaded', pageCore);

// click or tap triggers
document.addEventListener('click', handleClick);

function pageCore() {
  // get current year
  const currentYear = new Date().getFullYear();

  // set the current year
  document.getElementById('thisYear').innerHTML = currentYear;
}

function handleClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.className === 'nav') {
    console.log(target.href);
  };
}

function myLoad(url, sourceContainer, targetContainer, replace) {
  var xhr = new XMLHttpRequest();
  xhr.onerror = function() {
    throw "Request failed. HTTP code " + xhr.status;
  };
  xhr.onload = function() {
    if (!xhr.status || (xhr.status >= 400)) {
      throw "Request failed. HTTP code " + xhr.status;
    }
    var temp = document.createElement("DIV");
    temp.innerHTML = xhr.responseText;
    var ele = temp.querySelector(sourceContainer);
    if (ele) {
      if (replace) {
        targetContainer.innerHTML = ele.outerHTML;
      } else {
        targetContainer.appendChild(ele);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}