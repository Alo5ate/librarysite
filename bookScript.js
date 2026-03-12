const params = new URLSearchParams(window.location.search);
const workId = params.get("work");

async function loadBook() {
    try {
        const response = await fetch(`https://openlibrary.org${workId}.json`);
        const book = await response.json();

        displayBook(book);
    } catch (err) {
        console.error("Failed to load book:", err);
    }
}

async function displayBook(book) {
    document.getElementById("bookTitle").textContent = book.title;


    const cover = book.covers
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : "https://via.placeholder.com/200x300";
    document.getElementById("bookCover").src = cover;


    const descriptionText = book.description
        ? (book.description.value || book.description)
        : "No description available.";
    document.getElementById("bookDescription").textContent = descriptionText;


    let authorNames = "Unknown author";
    if (book.authors && book.authors.length > 0) {
        const authorPromises = book.authors.map(async (a) => {
            const cached = sessionStorage.getItem(a.author.key);
            if (cached) return cached;

            const res = await fetch(`https://openlibrary.org${a.author.key}.json`);
            const data = await res.json();
            sessionStorage.setItem(a.author.key, data.name);
            return data.name;
        });

        const names = await Promise.all(authorPromises);
        authorNames = names.join(", ");
    }

    document.getElementById("bookAuthors").textContent = `by ${authorNames}`;
}


loadBook();

function goBack(){
    window.history.back();
}


function goHome(){
    window.location.href = "index.html";
}

document.getElementById("readingButton").addEventListener("click", saveReading);

function saveReading(){

    const book = {
        title: document.getElementById("bookTitle").textContent,
        cover: document.getElementById("bookCover").src,
        workId: workId
    };

    let readingList = JSON.parse(sessionStorage.getItem("readingBooks")) || [];

    const exists = readingList.some(b => b.workId === book.workId);
    if(!exists){
        readingList.unshift(book);
    }

    sessionStorage.setItem("readingBooks", JSON.stringify(readingList));
}