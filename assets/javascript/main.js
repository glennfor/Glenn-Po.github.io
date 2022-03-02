
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