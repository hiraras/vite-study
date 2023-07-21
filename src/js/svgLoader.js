// import src from "@/assets/svgs/hamburger.svg";
import src from "@assets/svgs/hamburger.svg?raw";

document.body.innerHTML += src;

const svgElement = document.getElementsByTagName("svg")[0];

svgElement.onmouseenter = function () {
  this.style.fill = "red";
};

// const img = document.createElement("img");

// img.src = src;

// document.body.appendChild(img);
