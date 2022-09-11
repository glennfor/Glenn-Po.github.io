
const select = (el, all=false)=>{
    if(all)return [...document.querySelectorAll(el)]
    return document.querySelector(el)
}

const menuButton = select('#mobile-menu')

const sideBar = select('#header')

menuButton.onclick = ()=>{
    if(menuButton.sideBarShowing){
        sideBar.style.left = "-300px"
        menuButton.sideBarShowing = false
        menuButton.classList.remove("bi-x")
        menuButton.classList.add("bi-list")
    }
    else{
        sideBar.style.left = "0"
        menuButton.sideBarShowing = true
        menuButton.classList.remove("bi-list")
        menuButton.classList.add("bi-x")
    }
}


// typing animatios

const typed = select('.typed')
if (typed) {
  let typed_strings = typed.getAttribute('data-typed-items')
  typed_strings = typed_strings.split(',')
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}


//back-to-top

let backtotop = select('#back-to-top')
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.style.opacity = 1;
    } else {
      backtotop.style.opacity = 0;
    }
  }
  window.addEventListener('load', toggleBacktotop)
  document.addEventListener('scroll', e=>toggleBacktotop())
}


//nav links active on scroll

let navbarlinks = select('#navbar a', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.parentElement.classList.add('navlink-active')
      } else {
        navbarlink.parentElement.classList.remove('navlink-active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  document.addEventListener('scroll', e=>navbarlinksActive())



  //preloader

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }


  //sample swiper for testimonials 


//   new Swiper('.super-container', {
//     speed: 800,
//     loop: true,
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false
//     },
//     slidesPerView: 1,
//     pagination: {
//       el: '.pagination',
//       type: 'bullets',
//       clickable: true
//     }
//   });



//implement working of the portfoilio sectio

const filterButtons = select("#portfolio #portfolio-filters li", true)

const portfoilioItems = select("#portfolio .container .portfolio-item", true)

function filterItems(filter){

  filterButtons.forEach(
    filterButton=>{
      if(filterButton.getAttribute("data-filter") == filter)
        filterButton.classList.add('filter-active')
      else
        filterButton.classList.remove('filter-active')
    }
  ) 
 
  portfoilioItems.forEach(item=>{
    if(item.getAttribute('filter') == filter || filter=="*")
    {
      if(item.style.display == "none")
        item.style.display = "inline-block"
      item.style.transform = "scale(1)"
    }
      
    else
    {
      item.style.transform = "scale(0)"
      setTimeout(()=>{item.style.display = "none"}, 390)
    }
      
  })
}

filterButtons.forEach(
  filterButton=>{
    filterButton.addEventListener("click", (ev)=>{
      filterItems(filterButton.getAttribute("data-filter"))
    })
  }
) 

// exposition container

let expositionContainer = select('#exposition')
const expoContentBox = select('#exposition .container')
const closeExpoButton = select('#exposition .close-expo')


console.log(expositionContainer, closeExpoButton)
closeExpoButton.onclick = ()=>expositionContainer.style.display = "none"


//skills expostion

const skillsButton = select("#skills button[data-skill]", true)

console.log(skillsButton)
const dataFile = '../data.json'

if(skillsButton)
skillsButton.forEach(
  button => {
    console.log(button.getAttribute('data-skill'))
    button.onclick = async ()=>{
    await fetch(dataFile).then(response => response.json()).then(data => {
      expoContentBox.innerHTML = ''
      const filter = button.getAttribute('data-skill')
      expositionContainer.getElementsByTagName('h5')[0].innerHTML = filter + ' Skill Categories';
      for(let item of data[filter]){
        const itemDOM = document.createElement('span')
        itemDOM.innerHTML = item
        expoContentBox.appendChild(itemDOM)
      }
    })

    expositionContainer.style.display = "block"

    }
  }
)



//Animation On Scroll
AOS.init(
  {
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  }
)
