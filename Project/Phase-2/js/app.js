/**
 * Navigation bar
 */
const navItem = document.querySelector("header .container nav");
const items = document.querySelectorAll("header .container nav a");
const barIcon = document.querySelector(".bar-icon");
const closeIcon = document.querySelector(".close-icon");
const overlay = document.querySelector(".overlay");

items.forEach((item) => {
    item.addEventListener("click", () => {
        items.forEach((item) => {
            item.classList.remove("active");
        });
    });
    item.addEventListener("click", () => {
        item.classList.add("active");
    });
});

barIcon.addEventListener("click", () => {
    navItem.classList.toggle("active");
    overlay.classList.toggle("active");
});

closeIcon.addEventListener("click", () => {
    navItem.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    navItem.classList.toggle("active");
    overlay.classList.toggle("active");
});

/**
 * Sections
 */

function openSection(evt, sectionName) {
    var i, sectioncontent, navlinks;
    sectioncontent = document.getElementsByClassName("section-content");
    for (i = 0; i < sectioncontent.length; i++) {
        sectioncontent[i].style.display = "none";
    }
    navlinks = document.getElementsByClassName("navlinks");
    for (i = 0; i < navlinks.length; i++) {
        navlinks[i].className = navlinks[i].className.replace(" active", "");
    }
    document.getElementById(sectionName).style.display = "block";
    evt.currentTarget.className += " active";
}

// tabs

var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");


tabLinks.forEach(function(el) {
    el.addEventListener("click", openTabs);
});


function openTabs(el) {
    var btnTarget = el.currentTarget;
    var country = btnTarget.dataset.country;

    tabContent.forEach(function(el) {
        el.classList.remove("active");
    });

    tabLinks.forEach(function(el) {
        el.classList.remove("active");
    });

    document.querySelector("#" + country).classList.add("active");

    btnTarget.classList.add("active");
}