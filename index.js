//Select elements from html file
const addBookBtn = document.getElementById("addBookBtn");
const bookFormModal = document.getElementById("book-form");
const bookForm = document.getElementById("bookForm");
const addBookToLibBtn = document.getElementById("addBookToLibBtn");
const mainDisplay = document.getElementById("main");
const searchInput = document.getElementById("search-box");
const searchBtn = document.getElementById("searchBtn");

//myLibrary array for storing books data
const myLibrary = [
    {
        title: 'Harry Potter 1',
        author: 'J.K. Rowling',
        noOfPages: 350,
        readStatus: 'Read'
    },
    {
        title: 'Harry Potter 2',
        author: 'J.K. Rowling',
        noOfPages: 350,
        readStatus: 'Read'
    },
    {
        title: 'Harry Potter 3',
        author: 'J.K. Rowling',
        noOfPages: 350,
        readStatus: 'Read'
    }
];

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

function createCard(bookCard, book) {
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
    
    titleLabel.textContent = 'Title';
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(Title);

    authorLabel.textContent = 'Author';
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(Author);

    noOfPagesLabel.textContent = 'No. of Pages';
    pagesDiv.appendChild(noOfPagesLabel);
    pagesDiv.appendChild(NoOfPages);

    readStatusLabel.textContent = 'Read Status';
    statusDiv.appendChild(readStatusLabel);
    statusDiv.appendChild(ReadStatus);

    Title.textContent = book.title;
    Author.textContent = book.author;
    NoOfPages.textContent = book.noOfPages;
    ReadStatus.textContent = book.readStatus;

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(statusDiv);
    return mainDisplay.appendChild(bookCard);
}

// diaplay book on the main section in html page
function displayBook() {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    for (const book of myLibrary) {
        return createCard(bookCard, book);
    }
}

// Display the searched book
function displaySearchedBook(searchedInput) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    for (const book of myLibrary) {
        if (book.title === searchedInput) {
            return createCard(bookCard, book);
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
    displayBook();
});

searchBtn.addEventListener('click', () => {
    const searchedInput = searchInput.value;
    displaySearchedBook(searchedInput);
});
