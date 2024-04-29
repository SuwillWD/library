//Select elements from html file
const addBookBtn = document.getElementById("addBookBtn");
const bookFormModal = document.getElementById("book-form");
const bookForm = document.getElementById("bookForm");
const addBookToLibBtn = document.getElementById("addBookToLibBtn");
const mainDisplay = document.getElementById("main");
const searchInput = document.getElementById("search-box");
const searchBtn = document.getElementById("searchBtn");
const deleteCard = document.querySelectorAll("delete-card");
const editCard = document.querySelectorAll("edit-card");


//myLibrary array for storing books data
const myLibrary = [];

// constructor function for creating new book object
function Book(title, author, noOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
}

// function to add new book object into myLibrary array
function addBookToLibrary(title, author, noOfPages, readStatus) {
    const book = new Book(title, author, noOfPages, readStatus);
    myLibrary.push(book);
}

function createCard(book) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");
    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const statusDiv = document.createElement("div");
    const Title = document.createElement("p");
    const Author = document.createElement("p");
    const NoOfPages = document.createElement("p");
    const ReadStatus = document.createElement("p");
    const titleLabel = document.createElement("p");
    const authorLabel = document.createElement("p");
    const noOfPagesLabel = document.createElement("p");
    const readStatusLabel = document.createElement("p");
    
    titleDiv.setAttribute("class", "card-row");
    titleLabel.textContent = 'Title';
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(Title);

    authorDiv.setAttribute("class", "card-row");
    authorLabel.textContent = 'Author';
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(Author);

    pagesDiv.setAttribute("class", "card-row");
    noOfPagesLabel.textContent = 'No. of Pages';
    pagesDiv.appendChild(noOfPagesLabel);
    pagesDiv.appendChild(NoOfPages);

    statusDiv.setAttribute("class", "card-row");
    readStatusLabel.textContent = 'Read Status';
    statusDiv.appendChild(readStatusLabel);
    statusDiv.appendChild(ReadStatus);

    Title.textContent = book.title;
    Author.textContent = book.author;
    NoOfPages.textContent = book.noOfPages;
    ReadStatus.textContent = book.readStatus;

    const editDeleteCard = document.createElement("div");
    editDeleteCard.setAttribute("class", "card-buttons");
    const editCard = document.createElement("button");
    editCard.textContent = "Edit";
    editCard.setAttribute("class", "edit-card");
    const deleteCard = document.createElement("button");
    deleteCard.textContent = "Delete";
    
    deleteCard.addEventListener('click', () => {
        const index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        bookCard.remove();
    });

    editDeleteCard.appendChild(editCard);
    editDeleteCard.appendChild(deleteCard);

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(statusDiv);
    bookCard.appendChild(editDeleteCard);
    return mainDisplay.appendChild(bookCard);
}

// diaplay book on the main section in html page
function displayBook() {
    for (let book of myLibrary) {
        createCard(book);
    }
}

// Display the searched book
function displaySearchedBook(searchedInput) {

    for (const book of myLibrary) {
        if (book.title === searchedInput) {
            mainDisplay.textContent = '';
            return createCard(book);
        }
    }
    bookCard.textContent = 'No Book found.';
    mainDisplay.appendChild(bookCard);
}

// Shows form for the user to add new book
addBookBtn.addEventListener('click', () => {
    bookFormModal.showModal();
});

// gets data from form, calls addBookToLibrary function to add book to library, and displayBook to update the main section with new book data   
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get('title');
    const author = data.get('author');
    const noOfPages = data.get('pages');
    const readStatus = data.get('status');

    addBookToLibrary(title, author, noOfPages, readStatus);
    bookFormModal.close();
    bookForm.reset();
    mainDisplay.innerHTML = '';
    displayBook();
});

searchBtn.addEventListener('click', () => {
    const searchedInput = searchInput.value;
    if (!searchInput.value) {
        mainDisplay.textContent = "";
        displayBook();
    } 
    displaySearchedBook(searchedInput);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
});

// deleteCard.forEach(card => {
//     console.log("click");
//     card.addEventListener('click', () => {
//         console.log('clicked');
//         const indexTitle = card.getAttribute("data-index-title");
//         for (let book of myLibrary) {
//             if (book.title === indexTitle) {
//                 const index = myLibrary.indexOf(book);
//                 myLibrary.splice(index, 1);
//             }
//         }
//     });
// });
