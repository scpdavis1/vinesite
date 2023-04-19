window.onscroll = function() {stickyNavbar()};

//get navbar
var navbar = document.querySelector("nav");

//get offset position of navbar
var sticky = navbar.offsetTop;

// Sticky navbar function
function stickyNavbar() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
}
