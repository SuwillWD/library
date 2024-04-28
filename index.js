const addBookBtn = document.getElementById("addBookBtn");
const bookFormModal = document.getElementById("book-form");
const bookForm = document.getElementById("bookForm");
const addBookToLibBtn = document.getElementById("addBookToLibBtn");
const mainDisplay = document.getElementById("main");

const myLibrary = [
    {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        noOfPages: 350,
        readStatus: 'Read'
    }
];

function Book(title, author, noOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, noOfPages, readStatus) {
    const book = new Book(title, author, noOfPages, readStatus);
    myLibrary.push(book);
}

function displayBook() {
    const bookCard = document.createElement("div");
    const Title = document.createElement("p");
    const Author = document.createElement("p");
    const NoOfPages = document.createElement("p");
    const ReadStatus = document.createElement("p");
    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const statusDiv = document.createElement("div");
    
    const titleLabel = document.createElement("p");
    titleLabel.textContent = 'Title';
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(Title);
    const authorLabel = document.createElement("p");
    authorLabel.textContent = 'Author';
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(Author);
    const noOfPagesLabel = document.createElement("p");
    noOfPagesLabel.textContent = 'No. of Pages';
    pagesDiv.appendChild(noOfPagesLabel);
    pagesDiv.appendChild(NoOfPages);
    const readStatusLabel = document.createElement("p");
    readStatusLabel.textContent = 'Read Status';
    statusDiv.appendChild(readStatusLabel);
    statusDiv.appendChild(ReadStatus);

    for (const book of myLibrary) {
        Title.textContent = book.title;
        Author.textContent = book.author;
        NoOfPages.textContent = book.noOfPages;
        ReadStatus.textContent = book.readStatus;
        bookCard.appendChild(titleDiv);
        bookCard.appendChild(authorDiv);
        bookCard.appendChild(pagesDiv);
        bookCard.appendChild(statusDiv);
        mainDisplay.appendChild(bookCard);
    }
}

addBookBtn.addEventListener('click', () => {
    bookFormModal.showModal();
});

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
})
