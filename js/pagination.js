//지정된 페이지에서
//시작점 종료점 계산
function updateFirstlast(targetPage) {
  console.log(`지금 보고있는 페이지 ${targetPage}`);
  currentPage = targetPage;
  //페이지 마다 최대 게시글 개수
  const limit = parseInt(document.getElementById("limitSize").value);

  //페이지 버튼 몇개식 볼거냐
  const pageCount = parseInt(document.getElementById("pagingSize").value);

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
    pageNumberButtons[i].style.backgroundColor = "lightsteelblue";
  }
}

function onClickNumberButton(e) {
  currentPage = parseInt(e.target.innerHTML);

  console.log(`${currentPage}으로 이동하기`);

  //그 페이지를 만들기
  setPageOf(currentPage);
}

function setPageOf(current) {
  const contentList = document.getElementById("post-content-list");
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
    const li = document.createElement("li");
    li.className = "post-content";

    li.innerHTML = `
    <div class="post-container">
    <h4 class="post-title"> ${database[i].id} </h4>
    <p class="post-title"> ${database[i].title} </p>
    </div>`;

    contentList.appendChild(li);
  }

  const pageNumberButtons = document.querySelectorAll(".number-button");
  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].style.backgroundColor = "lightsteelblue";
  }

  const currentBtn = document.getElementById(`number-button-${current}`);
  currentBtn.style.backgroundColor = "red";
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
