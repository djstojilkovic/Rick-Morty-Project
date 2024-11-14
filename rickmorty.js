const URL = "https://rickandmortyapi.com/api/character";
const charContainer = document.querySelector(".characters");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const counter = document.querySelector(".counter");
let currentPage = 1;

function getCharacters(page = 1) {
  fetch(`${URL}?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      showCharacters(data);
      updatePagination(data.info);
    });
}

function showCharacters(data) {
  console.log(data.results);
  const newCharsArray = data.results.slice(0, 20);

  charContainer.innerHTML = "";

  newCharsArray.forEach((e) => {
    const charImg = document.createElement("img");
    charImg.setAttribute("src", e.image);
    const charDiv = document.createElement("div");
    charDiv.append(charImg);
    const charTxt = document.createElement("p");
    charTxt.innerHTML = e.name;
    charDiv.append(charTxt);
    const charBtn = document.createElement("button");
    charBtn.innerHTML = "Like";
    charDiv.append(charBtn);

    charContainer.append(charDiv);
    charBtn.addEventListener("click", function () {
      if (charBtn.style.backgroundColor === "green") {
        charBtn.style.backgroundColor = "";
      } else {
        charBtn.style.backgroundColor = "green";
      }
    });
    charDiv.addEventListener("click", function () {
      console.log(e);
    });
  });
}
function updatePagination(info) {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === info.pages;
}
nextBtn.addEventListener("click", function () {
  if (currentPage < 42) {
    currentPage++;
    getCharacters(currentPage);
    counter.textContent = currentPage;
  }
});
prevBtn.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    getCharacters(currentPage);
    counter.textContent = currentPage;
  }
});

window.addEventListener("load", getCharacters);
