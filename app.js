// trigger JS availability after the page loads
document.addEventListener('DOMContentLoaded', pageCore);

function pageCore() {
  // nav controls
  let navArea = document.querySelector('nav ul');
  let navControl = document.getElementById('navToggle');
  // hide the nav items on page load

  function toggleNav() {
    navArea.classList.toggle('collapsed');
  }


  // click or tap triggers
  document.addEventListener('click', handleClick);
  navControl.addEventListener('click', toggleNav);

  // get current year
  const currentYear = new Date().getFullYear();
  // set the current year
  document.getElementById('thisYear').innerHTML = currentYear;
}

function handleClick(event) {
  // get the target of the event
  const target = event.target;
  
  if (target.className === 'nav') {
    // close the nav menu
    document.querySelector('nav ul').classList.toggle('collapsed');

    // if JS is supported, pull content via AJAX
    // if not, pass as normal
    event.preventDefault();
    
    // get the section to be swapped out
    const dataTarget = document.getElementById('ajaxTarget');

    // retrieve the target page and get it's contents
    let targetURL = target.getAttribute('href');
    ajaxSwap(targetURL, dataTarget);
  };
}

function ajaxSwap(url, localTarget) {
  let xhr = new XMLHttpRequest();
  xhr.onerror = function() {
    throw "Request failed -  HTTP code: " + xhr.status;
  };
  xhr.onload = function() {
    if (!xhr.status || (xhr.status >= 400)) {
      throw "Request failed - HTTP code: " + xhr.status;
    }
      // capture reply, convert to searchable document      
      let parseHTML = new DOMParser();
      let remoteSource = parseHTML.parseFromString(xhr.responseText, 'text/html');
      // get the remote section to be swapped in
      let remoteTarget = remoteSource.getElementById('ajaxTarget');

      // capture the parent container
      let targetContainer = localTarget.parentNode;
      // remove the child element
      localTarget.parentNode.removeChild(localTarget);
      // append the new child element
      targetContainer.appendChild(remoteTarget);
  };
  xhr.open("GET", url, true);
  xhr.send();
}