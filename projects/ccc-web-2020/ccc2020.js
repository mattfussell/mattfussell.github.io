// vars
const eventList = '/json/events.json',
      mensBreak = 'stubs/mens-breakfast.html'

/* ui */
const copyYr = document.querySelector('.curYr'),
      mainSection = document.getElementById('main'),
      actionBtns = document.querySelector('.btnContainer-h'),
      navLinks = document.querySelector('.navLinks')


/* site functions */

// send page to top of page automatically
const toTop = _ => window.scrollTo(0,0)

// set current year in the copyright
const setYear = _ => copyYr.innerText = new Date().getFullYear()

// hide the main element on page load
const hideMain = _ => mainSection.classList.add('hidden')

// make main element available for content
const revealMain = _ => mainSection.classList.remove('hidden')

// respond to user interactions with the links
const btnActionHandler = function(e) {
  let sender = ''

  e.target.classList.contains('l-woven') ?
  sender = 'Woven' :
  e.target.classList.contains('l-breakfast') ?
  sender = 'Breakfast' :
  e.target.classList.contains('l-give') ?
  sender = 'Giving' :
  e.target.classList.contains('l-event') ?
  (sender = 'Events', populateEvents()) :
  e.target.classList.contains('l-life') ?
  sender = 'Life Groups' :
  e.target.classList.contains('l-serve') ?
  sender = 'Get Involved' :
  e.target.classList.contains('l-live') ?
  sender = 'Giving' :
  e.target.classList.contains('l-watch') ?
  sender = 'Media' :
  sender = 'Get Help'

  if (e.target.classList.contains('btn') || e.target.classList.contains('nav')) {
    revealMain()
    mainSection.innerHTML = `
    <h2>${sender}</h2>
    <p>${demoText}</p>
    ${demoBtns}`
  }
}

// retrieve and populate the event list
const populateEvents = async function() {
  const response = await fetch(eventList)
  // console.log(response)
  eventJSON = await response.json()
  // console.log(eventJSON)
  eventJSON.events.forEach((event) => {
    console.log(event)
  })
}

// load men's breakfast
const loadStub = async function(stub) {
  const response = await fetch(stub)
  //console.log(response)
  const textResult = await response.text();
  console.log(textResult)
}

loadStub(mensBreak);


/* listeners */

// onload functions
window.addEventListener('DOMContentLoaded', _ => {
  toTop()
  setYear()
  hideMain() 
})

// button listener
actionBtns.addEventListener('click', e => {
  btnActionHandler(e)
})

// main event listener
mainSection.addEventListener('click', e => {
  btnActionHandler(e)
})

// nav links listener
navLinks.addEventListener('click', e => {
  btnActionHandler(e)
})


// demo text - var used to ensure hoisting

var demoText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus at nemo aperiam voluptatum autem natus eveniet esse vitae, fuga molestias quo consequatur iure rerum vel architecto rem. Beatae quisquam dicta repudiandae ex, voluptatem expedita eveniet architecto temporibus fugit placeat est, quis maiores fuga laborum non iusto suscipit nemo quaerat aut. Nesciunt consectetur alias pariatur! Enim facere cumque deleniti neque recusandae totam beatae quisquam incidunt assumenda corrupti quae, accusamus reiciendis in doloribus exercitationem soluta? Minus, dignissimos asperiores. Nisi delectus totam maxime, culpa id ad iusto laudantium, autem esse nihil praesentium amet quos incidunt sequi necessitatibus soluta eligendi obcaecati aspernatur quibusdam, illum aperiam eos asperiores hic eum? Vero, soluta nisi deserunt enim natus officia obcaecati, doloribus deleniti quod dolorum laborum odit impedit libero nemo necessitatibus. Placeat magnam, tenetur reiciendis animi ea nostrum eius? Error repudiandae ut cupiditate, a alias voluptatum vero dolorum exercitationem atque reprehenderit, voluptas deserunt molestiae eius sequi tempore? Earum quaerat cumque reprehenderit, quisquam iusto aperiam consequatur pariatur quidem dolore ex tempore. Tempora eligendi voluptate voluptatem dolore expedita, obcaecati architecto officiis voluptates ab consequatur harum nemo similique quos eos. Saepe fuga itaque distinctio alias omnis est hic magni! Saepe, enim ullam veniam ut soluta harum facilis corporis itaque aspernatur cum ea consectetur officia ad in minima molestiae provident quam magni a perspiciatis maxime, delectus ipsam? Quis animi voluptatem sed minus id natus nihil ex enim exercitationem vero quia similique accusantium alias quod omnis voluptas doloremque labore nemo voluptates quisquam vel totam, doloribus officia! Hic deserunt sint magni possimus eligendi facilis.'

var demoBtns =`
<div class="btnContainer-m">
<a href="#main" class="btn l-event">Events</a>
<a href="#main" class="btn l-life">Life Together</a>
<a href="#main" class="btn l-serve">Serve</a>
<a href="#main" class="btn l-give">Give</a>
<a href="#main" class="btn l-watch">Watch</a>
<a href="#main" class="btn l-help">Get Help</a>
</div>`

// get involved Google form
// link: https://forms.gle/v4DbmMmnpEAeCmX87
// embed: <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSedNsE5OxsDCNTT3LQt5hK4JBzj3hcpIr-jH7zVKon5pbEEqQ/viewform?embedded=true" width="640" height="1213" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

