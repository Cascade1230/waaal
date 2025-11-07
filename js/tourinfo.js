import { config } from "./config.js";
import { fetchJson } from "./data.js";

let database = [];

let limit = 5;
let pageCount = 5;

let currentPage = 1; //현재 페이지
let totalPage = 0; //총 페이지 수
let pageGroup = 0; //페이지 그룹 수
let firstNumber = 1; //숫자 시작점
let lastNumber = 5; //숫자 종료점

window.onload = async () => {
  database = (await fetchJson(config.originUrl.tourinfo, 19)).filter(el => el.images?.length >=1 );
  console.log(database);

  document.getElementById("allCount").innerHTML = database.length;

  document.getElementById("limitSize").addEventListener("change", (e) => {
    limitSizeOnChange(e.target.value);
  });

  document.getElementById("pagingSize").addEventListener("change", (e) => {
    pagingSizeonChange(e.target.value);
  });

  //시작번호와 종료번호 계산하기
  updateFirstlast(1);

  //이걸 토대로 버튼 만들기
  setPageButtons();

  //만들어진 숫자 버튼에다 이벤트 달기
  addNumberButtonListner();

  //이전, 이후 버튼 이벤트
  addMovingButtonListner();

  setPageOf(1);
};

//지정된 페이지에서
//시작점 종료점 계산
function updateFirstlast(targetPage) {
  console.log(`지금 보고있는 페이지 ${targetPage}`);
  currentPage = targetPage;
  //페이지 마다 최대 게시글 개수
  limit = parseInt(document.getElementById("limitSize").value);

  //페이지 버튼 몇개식 볼거냐
  pageCount = parseInt(document.getElementById("pagingSize").value);

  //총 페이지 수
  totalPage = Math.ceil(database.length / limit);

  //현재 페이지가 몇번째 그룹이냐
  pageGroup = Math.ceil(targetPage / pageCount);

  console.log(`총 페이지 수 ${totalPage} 몇번째 그룹이냐 ${pageGroup}`);

  //데이터가 완벽하다는 가정
  //마지막 번호
  lastNumber = pageGroup * pageCount;
  //시작 번호
  firstNumber = lastNumber - pageCount + 1;
  console.log(`시작${firstNumber}, 마지막 ${lastNumber}`);

  //보정식1
  if (lastNumber > totalPage) {
    lastNumber = totalPage;
  }

  if (firstNumber < 1) {
    firstNumber = 1;
  }

  console.log(`보정 후 => 시작 ${firstNumber} 마지막 ${lastNumber}`);
}

function setPageButtons() {
  const numberButtonWrapper = document.getElementsByClassName(
    "number-button-wrapper"
  )[0];

  //기존에 있던 버튼을 소거
  numberButtonWrapper.innerHTML = "";
  for (let i = firstNumber; i <= lastNumber; i++) {
    const html = `<button class="number-button" id="number-button-${i}">${i}</button>`;

    console.log(`test ${html}`);
    numberButtonWrapper.innerHTML += html;
  }
}

//이벤트 달기
function addNumberButtonListner() {
  const pageNumberButtons = document.querySelectorAll(".number-button");

  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].addEventListener("click", onClickNumberButton);
    pageNumberButtons[i].style.backgroundColor = "whilte";
  }
}

function onClickNumberButton(e) {
  currentPage = parseInt(e.target.innerHTML);

  console.log(`${currentPage}으로 이동하기`);

  //그 페이지를 만들기
  setPageOf(currentPage);
}

function setPageOf(current) {
  const contentList = document.getElementById("pagination-content");
  //페이지 마다 최대 게시글 개수
  const limitSize = parseInt(document.getElementById("limitSize").value);

  //내용물 비우기
  contentList.innerHTML = "";

  //데이터의 시작점
  const start = limitSize * (current - 1);

  //데이터의 종료점
  const end = limitSize * (current - 1) + limitSize;

  console.log(`배열의 시작점 ${start} 종료점 ${end}`);

  for (let i = start; i < end; i++) {
    const imageSrc =
      database[i].images && database[i].images.length > 0
        ? database[i].images[0]
        : "../img/no-image.png";

    contentList.innerHTML += `
    <div class="pagination-content-item">
      <img src="${imageSrc}" alt="" />
      <div class="item-details">
        <div class="item-title">
          <div class="item-number">${i + 1}</div>
          <h3 class="item-name"> ${database[i].name} </h3>
        </div>
        <div class="item-info">
          <p>
            <span>주소 : </span> ${database[i].address}
          </p>
          <p>
            <span>기관 : </span> ${database[i].name}
          </p>
          <p>
            <span>전화번호 : </span> ${database[i].phone}
          </p>
        </div>
      </div>
      <div class="item-ratings">
        <div>
          <p>별점 (총 0개의 후기)</p>
          <p>☆☆☆☆☆</p>
          <div class="item-ratings-buttns">
            <button class="action-btn-blue">스크랩하기</button>
            <button class="action-btn">길찾기</button>
          </div>
        </div>
      </div>
    </div>
    `;

    // const li = document.createElement("li");
    // li.className = "post-content";

    // li.innerHTML = `
    // <div class="post-container">
    // <h4 class="post-title"> ${database[i].id} </h4>
    // <p class="post-title"> ${database[i].title} </p>
    // </div>`;

    // contentList.appendChild(li);
  }

  const pageNumberButtons = document.querySelectorAll(".number-button");
  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].style.backgroundColor = "white";
  }

  const currentBtn = document.getElementById(`number-button-${current}`);

  currentBtn.style.backgroundColor = "red";
  console.log("끝");
}

function addMovingButtonListner() {
  const preBtn = document.getElementById("pre-button");
  const nextBtn = document.getElementById("next-button");

  preBtn.addEventListener("click", onClickPre);
  nextBtn.addEventListener("click", onClickNext);
}

function onClickPre(e) {
  const delta = currentPage - 1;

  if (delta >= firstNumber) {
    console.log(`${currentPage}에서 ${delta}으로는 정상`);
  } else if (delta > 1) {
    updateFirstlast(delta);
    setPageButtons();
    addNumberButtonListner();
  }

  if (1 > delta) {
    currentPage = 1;
  } else {
    currentPage = delta;
  }

  setPageOf(currentPage);
}

function onClickNext(e) {
  const delta = currentPage + 1;

  if (delta <= lastNumber) {
    console.log(`${currentPage}에서 ${delta}으로는 정상`);
  } else if (delta <= totalPage) {
    updateFirstlast(delta);
    setPageButtons();
    addNumberButtonListner();
  }

  if (totalPage <= delta) {
    currentPage = totalPage;
  } else {
    currentPage = delta;
  }

  setPageOf(currentPage);
}

function limitSizeOnChange(value) {
  limit = value;

  //시작번호와 종료번호 계산하기
  updateFirstlast(1);

  //이걸 토대로 버튼 만들기
  setPageButtons();

  //만들어진 숫자 버튼에다 이벤트 달기
  addNumberButtonListner();

  //이전, 이후 버튼 이벤트
  addMovingButtonListner();

  setPageOf(1);
}

function pagingSizeonChange(value) {
  pageCount = value;

  //시작번호와 종료번호 계산하기
  updateFirstlast(1);

  //이걸 토대로 버튼 만들기
  setPageButtons();

  //만들어진 숫자 버튼에다 이벤트 달기
  addNumberButtonListner();

  //이전, 이후 버튼 이벤트
  addMovingButtonListner();

  setPageOf(1);
}
