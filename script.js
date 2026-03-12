

async function loadFeaturedBooks(){

    const response = await fetch(
        "https://openlibrary.org/search.json?q=fiction&limit=20"
    );

    const data = await response.json();

    const books = data.docs;
    const container = document.getElementById("featuredBooks");

    container.innerHTML = "";

    books.slice(0,10).forEach(book => {

        const cover = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/120x180?text=No+Cover";

        const bookCard = `
        <a href="book.html?work=${book.key}" class="book">
            <img src="${cover}" alt="${book.title}">
            <p>${book.title}</p>
        </a>
        `;

        container.innerHTML += bookCard;
    });
}
loadFeaturedBooks();



function goHome(){
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-bar input");
    if(searchInput){
        searchInput.value = ""; 
    }
});

function loadRecentBooks(){

    const container = document.getElementById("recentBooks");

    const books = JSON.parse(sessionStorage.getItem("readingBooks")) || [];

    container.innerHTML = "";

    books.slice(0,6).forEach(book => {

        const bookCard = `
        <a href="book.html?work=${book.workId}" class="book">
            <img src="${book.cover}" alt="${book.title}">
        </a>
        `;

        container.innerHTML += bookCard;
    });

}

loadRecentBooks();