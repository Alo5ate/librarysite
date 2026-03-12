const params = new URLSearchParams(window.location.search);
const query = params.get("q");
if(query){
    document.querySelector(".search-bar input").value = query;
}

async function searchBooks(){
    const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=20`
    );

    const data = await response.json();
    displayResults(data.docs);
}
function displayResults(books){

const container = document.getElementById("searchResults");

container.innerHTML = "";

books.forEach(book => {

const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "book-placeholder.png";

    const card = `
    <a href="book.html?work=${book.key}" class="book">

    <img src="${cover}" alt="${book.title}">
    <p>${book.title}</p> 

    </a>
    `;
    container.innerHTML += card;
    });

}
searchBooks();





function goBack(){
    window.history.back();
}
function goHome(){
    window.location.href = "index.html";
}

