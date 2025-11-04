import { config } from "./config.js";
import { fetchJson } from "./data.js";

let carousel = null;
let index = 0;
let carouselSize = 0;
let data = "";

window.onload = async () => {
  mainCarousel();
  data = await getData();
  let imgExistedDatas = findImgExisted();
};

function mainCarousel() {
  const prev = document.getElementsByClassName("carousel-pre-button")[0];
  const next = document.getElementsByClassName("carousel-next-button")[0];

  carousel = document.getElementsByClassName("carousel")[0];
  carouselSize = document.getElementsByClassName("carousel-img").length;
  console.log(`carousel: ${carousel}`);
  console.log(`carouselSize: ${carouselSize}`);

  next.addEventListener("click", () => {
    console.log(carouselSize);

    if (index < carouselSize - 1) {
      index++;
      carousel.style.transform = `translate3d(-${1905 * index}px, 0, 0)`;
      console.log(carousel.style.transform);
    } else {
      index = 0;
      carousel.style.transform = `translate3d(-${1905 * index}px, 0, 0)`;
    }
  });
  prev.addEventListener("click", () => {
    console.log("click");
    if (index > 0) {
      index--;
      carousel.style.transform = `translate3d(-${1905 * index}px, 0, 0)`;
    }
  });
}

async function getData() {
  return await fetchJson(config.originUrl.restaurant, 30);
}
function findImgExisted() {
  let imgExistedDatas = [];
  data.forEach(element => {
    let imgExisted = element.images;
    if(imgExisted != null && imgExisted.length > 0){
      imgExistedDatas.push(element);
    }
  });

  
  return imgExistedDatas;
}
