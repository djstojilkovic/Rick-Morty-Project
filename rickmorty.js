const URL = "https://rickandmortyapi.com/api/character";
const charContainer = document.querySelector(".characters");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const counter = document.querySelector(".counter");
const headButton = document.querySelector(".headBtn");
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

    const infoBox = document.createElement("div");
    infoBox.className = "infoBox";
    infoBox.innerHTML = `ID: ${e.id}<br> Name: ${e.name} <br> Status: ${e.status} <br> Species: ${e.species} <br> Gender: ${e.gender}`;

    charBtn.addEventListener("click", function () {
      if (charBtn.style.backgroundColor === "rgb(7, 168, 77)") {
        charBtn.style.backgroundColor = "";
      } else {
        charBtn.style.backgroundColor = "rgb(7, 168, 77)";
      }
    });

    charImg.addEventListener("click", function () {
      //prikaz infoboxa na click
      if (infoBox.style.display === "block") {
        infoBox.style.display = "none";
      } else {
        infoBox.style.display = "block";
      }
    });
    charDiv.append(infoBox);

    charDiv.addEventListener("mouseenter", function () {
      charDiv.style.width = "20%";
    });
    charDiv.addEventListener("mouseleave", function () {
      charDiv.style.width = "19%";
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
headButton.addEventListener("click", function () {
  return (
    getCharacters((currentPage = 1)), (counter.textContent = currentPage = 1)
  );
});

window.addEventListener("load", getCharacters);
