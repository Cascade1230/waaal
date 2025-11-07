import { config } from "./config.js";
import { fetchJson } from "./data.js";

let mainindex = 0;
let restourangData = [];
let tourData = [];

let tasteIndex = 0;

let healingIndex = 0;

window.onload = async () => {
  mainCarousel();

  restourangData = await fetchJson(config.originUrl.restaurant, 50);
  let testeImgExistedDatas = findImgExisted(restourangData);
  tasteCarousel(testeImgExistedDatas);

  tourData = await fetchJson(config.originUrl.tourinfo, 19);
  let tourImgExistedDatas = findImgExisted(tourData);
  tourCarousel(tourImgExistedDatas);
};

function findImgExisted(data) {
  return data.filter(el => el.images?.length >= 1);
}

function mainCarousel() {

  let carousel = document.getElementsByClassName("carousel")[0];
  let carouselSize = carousel.getElementsByClassName("carousel-img").length;

  funcCarousel("main-carousel-pre-button", "main-carousel-next-button", "carousel", carouselSize, mainindex, 1905);
}

function tasteCarousel(imgExistedDatas) {
  console.log(imgExistedDatas);
  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * imgExistedDatas.length);
    let randomValue = imgExistedDatas[random];

    const $container = document.getElementById("taste-cards");
    let $li = document.createElement("li");
    let $tasteCard = document.createElement("div");
    $tasteCard.setAttribute("class", "taste-card");
    let $img = document.createElement("img");
    $img.setAttribute("src", `${randomValue["images"][0]}`);
    let $tasteInfo = document.createElement("div");
    $tasteInfo.setAttribute("class", "taste-info");
    let $name = document.createElement("p");
    $name.setAttribute("class", "name");
    $name.innerText = randomValue["name"];
    let $desc = document.createElement("p");
    $desc.setAttribute("class", "desc");
    $desc.innerText = randomValue["menuprice"];
    let $location = document.createElement("p");
    $location.setAttribute("class", "location");
    $location.innerText = randomValue["address"];

    $container.appendChild($li);
    $li.appendChild($tasteCard);
    $tasteCard.appendChild($img);
    $tasteCard.appendChild($tasteInfo);
    $tasteInfo.appendChild($name);
    $tasteInfo.appendChild($desc);
    $tasteInfo.appendChild($location);
  };

  let carousel = document.getElementsByClassName("taste-cards")[0];
  let tastecarouselSize = carousel.getElementsByTagName("img").length / 4;
  funcCarousel("taste-carousel-pre-button", "taste-carousel-next-button", "taste-cards", tastecarouselSize, tasteIndex, 1100);
}

function tourCarousel(imgExistedDatas) {

  console.log(imgExistedDatas);
  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * imgExistedDatas.length);
    let randomValue = imgExistedDatas[random];

    const $container = document.getElementById("healing-carousel");
    let $li = document.createElement("li");
    let $div = document.createElement("div");
    let $img = document.createElement("img");
    let $name = document.createElement("p");
    let $desc = document.createElement("p");

    $div.setAttribute("class", "healing-card");
    $name.setAttribute("class", "name");
    $desc.setAttribute("class", "desc");

    $container.appendChild($li);
    $li.appendChild($div);
    $div.appendChild($img);
    $div.appendChild($name);
    $div.appendChild($desc);

    $img.setAttribute("src", `${randomValue["images"][0]}`);
    $name.innerText = `${randomValue["name"]}`;
    $desc.innerText = `${randomValue["copy"]}`;
  }
   let carousel = document.getElementsByClassName("healing-carousel")[0];
   let healingcarouselSize = carousel.getElementsByTagName("img").length / 3;

  funcCarousel("healing-carousel-pre-button", "healing-carousel-next-button", "healing-carousel", healingcarouselSize, healingIndex, 1280);
}

function funcCarousel(preBtn, nextBtn, carouselName, carouselSize, index, size) {
  const prev = document.getElementById(preBtn);
  const next = document.getElementById(nextBtn);

  let carousel4 = document.getElementsByClassName(carouselName)[0];
  carouselSize = document.getElementsByClassName("carousel-img").length;

  next.addEventListener("click", () => {
    console.log(carouselSize);

    if (index < carouselSize - 1) {
      index++;
      carousel4.style.transform = `translate3d(-${size * index}px, 0, 0)`;
      console.log(carousel4.style.transform);
    } else {
      index = 0;
      carousel4.style.transform = `translate3d(-${size * index}px, 0, 0)`;
    }
  });
  prev.addEventListener("click", () => {
    console.log("click");
    if (index > 0) {
      index--;
      carousel4.style.transform = `translate3d(-${size * index}px, 0, 0)`;
    }
  });
}