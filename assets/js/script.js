/* 'use strict' statement enables strict mode in JavaScript,
 which enforces stricter parsing and error handling rules,
  helping to write cleaner and more secure code. */

'use strict';

/*  the "document" object represents the HTML document loaded in the current window */

/* Pre Loader

Loading will end once the documnet is loaded

*/
// Select the preloader element using a data attribute
const preloader = document.querySelector("[data-preaload]");

// Add an event listener to the window object for the 'load' event.
//  This event is fired when the entire page has loaded,including all its dependent resources (images, stylesheets, scripts, etc.).
window.addEventListener( "load",function(){
    // Once the window is fully loaded, add the 'loaded' class to the preloader element
    preloader.classList.add("loaded");
    // Additionally, add the 'loaded' class to the body element
    document.body.classList.add('loaded');
});



/* Add event listener on multiple elements */

/* The provided JavaScript function addEventOnElements takes an array of HTML elements,
 an event type (e.g., "click", "mouseover", etc.), and a callback function as parameters */

const addEventOnElements = function(elements,eventType,callback){
    for (let i = 0;i<elements.length;i++){
        elements[i].addEventListener(eventType,callback);
    }
};


/* Navbar */
/* querySelectorAll returns a NodeList containing all elements that match the specified selector. */


const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

/*  Toggles a class on the element. 
If the class is present, it will be removed; if it's absent, it will be added */

const togglerNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navToggler,"click",togglerNavbar);


/* Header and back top btn */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]")

let lastScrollPos = 0;

const hideHeader = function(){
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom){
        header.classList.add("hide");
    }
    else{
        header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll",function(){
    if(this.window.scrollY >= 50){
        header.classList.add('active');
        backTopBtn.classList.add('active');
        hideHeader();
    }
    else{
        header.classList.remove('active');
        backTopBtn.classList.remove('active');
    }
})


/* 
    Hero 
*/

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSLiderItem = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidesPos = 0;
let lastActiveSlidePos = heroSLiderItem[0];

const updateSlidePos = function(){
    lastActiveSlidePos.classList.remove('active');
    heroSLiderItem[currentSlidesPos].classList.add('active');
    lastActiveSlidePos = heroSLiderItem[currentSlidesPos];
}

const slideNext = function(){
    if (currentSlidesPos >= heroSLiderItem.length - 1){
        currentSlidesPos = 0;
    }
    else{
        currentSlidesPos++;
    }

    updateSlidePos();
}

heroSliderNextBtn.addEventListener('click',slideNext);

const slidePrev = function(){
    if (currentSlidesPos <= 0){
        currentSlidesPos = heroSLiderItem.length - 1;
    }
    else{
        currentSlidesPos--;
    }

    updateSlidePos();
}

heroSliderPrevBtn.addEventListener('click',slidePrev);

/* Auto slide */

let autoSlideInterval;

const autoSlide = function(){
    autoSlideInterval = setInterval(function(){
        slideNext();
    },7000);
}

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],"mouseover",function(){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],"mouseout",autoSlide);

window.addEventListener('load',autoSlide);

/* Parallax effect */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x,y;

window.addEventListener("mousemove",function(event){
     // Calculate the position of the mouse relative to the window size
    x = (event.clientX / window.innerWidth * 10)-5 ;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20-> -20 ,-5 -> 5

    x = x - (x*2);
    y = y - (y*2);
    // Loop through all elements with the class 'parallaxItems'
    for (let i = 0 ;i < parallaxItems.length ; i++){
        // Adjust the movement based on the parallax speed of each element
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        // Apply the transform using translate3d to create a 3D effect
        parallaxItems[i].style.transform = `translate3d(${x}px,${y}px,0px)`;
    }
});