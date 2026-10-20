// Privacy page behavior. These functions are called from inline links in the
// generated pages, so they stay global.

function isMobile() {
  // index.html records its width so pages loaded in its iframe can ask.
  var windowSize = window.parent.screenSize;
  if (typeof windowSize === "undefined") {
    windowSize = document.documentElement.clientWidth;
  }
  return windowSize <= 767;
}

function setDisplay(selector, value) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = value;
  }
}

function showSection(page) {
  if (isMobile()) {
    location.href = page + ".html";
  } else {
    document.getElementById("iframe").setAttribute("src", page + ".html");
  }
}

function closeContact() {
  setDisplay(".contactOptions", "none");
}

function showContact() {
  setDisplay(".contactOptions", "block");
}

function showItemDetails(id) {
  var arrow = document.getElementById("arrow-" + id);
  var details = document.getElementById("details-" + id);
  if (arrow.getAttribute("src") === "img/arrow-up.png") {
    arrow.setAttribute("src", "img/arrow-down.png");
    details.style.display = "block";
  } else {
    arrow.setAttribute("src", "img/arrow-up.png");
    details.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var mobile = isMobile();
  setDisplay(".showMobile", mobile ? "block" : "none");
  setDisplay(".showDesktop", mobile ? "none" : "block");
});
