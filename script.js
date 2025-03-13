let searchInputVal = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createInterface(Obj) {
  let { title, imageLink, author } = Obj;
  let box = document.createElement("div");
  box.classList.add("book-card");

  let bookImg = document.createElement("img");
  bookImg.setAttribute("src", imageLink);
  box.appendChild(bookImg);

  let bookTitle = document.createElement("p");
  bookTitle.textContent = title;
  box.appendChild(bookTitle);

  let bookAuthor = document.createElement("p");
  bookAuthor.textContent = "Author: " + author;
  box.appendChild(bookAuthor);

  searchResultsEl.appendChild(box);
}

function searchResults(searchResultObj) {
  searchResultsEl.innerHTML = "";
  if (searchResultObj.length === 0) {
    searchResultsEl.innerHTML =
      "<h3 class='text-center text-danger'>No Results Found</h3>";
    return;
  }
  searchResultObj.forEach(createInterface);
}

searchInputVal.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let query = searchInputVal.value.trim();
    if (query === "") return;

    searchResultsEl.innerHTML = "";
    spinnerEl.style.display = "flex";

    let url = "https://apis.ccbp.in/book-store?title=" + query;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((jsonData) => {
        spinnerEl.style.display = "none";
        searchResults(jsonData.search_results);
        searchInputVal.value = "";
      })
      .catch(() => {
        spinnerEl.style.display = "none";
        searchResultsEl.innerHTML =
          "<h3 class='text-center text-danger'>Failed to fetch data</h3>";
      });
  }
});
