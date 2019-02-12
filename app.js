// trigger JS availability after the page loads
document.addEventListener('DOMContentLoaded', function() {
  // click or tap triggers
  document.addEventListener('click', handleClick);

  // auto-execute functions
  setYear();

  // --------- //
  // Functions //
  // --------- //

  // establish intercept for local site navigation
  function handleClick(event) {
    // get the target of the event
    const target = event.target;
    // set required variables
    const navToggle = document.getElementById('navToggle');
    const navArea = document.querySelector('nav ul');

    // the navigation button is clicked, handle it
    if (target === navToggle) {
      navArea.classList.toggle('collapsed');
    }

    if (target !== navToggle && target.className !== 'nav' && navArea.className !== 'collapsed') {
      navArea.classList.toggle('collapsed');
    }

    // if a navigation option is selected, handle it
    if (target.className === 'nav') {
      // if JS is supported, pull content via AJAX
      // and close nav; if not, pass as normal
      event.preventDefault();
      navArea.classList.toggle('collapsed');
      
      // get the section to be swapped out
      const dataTarget = document.getElementById('ajaxTarget');

      // retrieve the target page and get it's contents
      let targetURL = target.getAttribute('href');
      ajaxSwap(targetURL, dataTarget);
    };
  }

  // pull local site resources via AJAX
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

  // set the year for the copyright
  function setYear() {
    // get current year
    const currentYear = new Date().getFullYear();
    // set the current year
    document.getElementById('thisYear').innerHTML = currentYear;
  }
});
