const URL = "https://rickandmortyapi.com/api/character";
const charContainer = document.querySelector(".characters");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const counter = document.querySelector(".counter");
const headButton = document.querySelector(".headBtn");
let currentPage = 1;
//prikaz showliked-a u localstorage-u(ako ga nema na local storageu, setuj"showliked, vrednost-koja je ovde prazan string"")
if (!window.localStorage.getItem("showLiked")) {
  window.localStorage.setItem("showLiked", "");
}

function getCharacters(page = 1) {
  fetch(`${URL}?page=${page}`) //da bi mogli da ubacimo paginaciju
    .then((response) => response.json())
    .then((data) => {
      showCharacters(data);
      updatePagination(data.info);
    });
}

function showCharacters(data) {
  const newCharsArray = data.results.slice(0, 20);

  charContainer.innerHTML = ""; //bitno za paginaciju, na klik dugmeta za menjanje stranice pojavljuje se novih 20 karaktera

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

    //varijabla getLiked(prikazuje showLiked i splituje po zarezu),u for-u i if-u da nakon refresha ostane likeovano dugme(zelena boja)
    let getLiked = window.localStorage.getItem("showLiked");
    getLiked = getLiked.split(",");
    for (let i = 0; i < getLiked.length; i++) {
      if (parseInt(getLiked[i]) === e.id) {
        charBtn.style.backgroundColor = "rgb(7, 168, 77)";
      } else if (!charBtn.style.backgroundColor === "rgb(7, 168, 77)") {
        charBtn.style.backgroundColor = "";
      }
    }

    charContainer.append(charDiv);

    const infoBox = document.createElement("div");
    infoBox.className = "infoBox";
    infoBox.innerHTML = `ID: ${e.id}<br> Name: ${e.name} <br> Status: ${e.status} <br> Species: ${e.species} <br> Gender: ${e.gender}`;

    //uvodjenje pomocne varijable za getovanje i setovanje showLiked-a u local storage-u
    charBtn.addEventListener("click", function () {
      if (charBtn.style.backgroundColor === "rgb(7, 168, 77)") {
        let pom = window.localStorage.getItem("showLiked");
        pom = pom.split(",");
        for (let i = 0; i < pom.length; i++) {
          if (parseInt(pom[i]) === e.id) {
            pom.splice(i, 1);
          }
        }
        window.localStorage.removeItem("showLiked");
        window.localStorage.setItem("showLiked", pom);
        charBtn.style.backgroundColor = "";
      } else {
        let pom = window.localStorage.getItem("showLiked");
        pom += `${e.id},`;
        window.localStorage.removeItem("showLiked");
        window.localStorage.setItem("showLiked", pom);
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
