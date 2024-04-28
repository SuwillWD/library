const addBookBtn = document.getElementById("addBookBtn");
const bookFormModal = document.getElementById("book-form");
const bookForm = document.getElementById("bookForm");
const addBookToLibBtn = document.getElementById("addBookToLibBtn");

const myLibrary = [];

function Book(title, author, noOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, noOfPages, readStatus) {
    const book = new Book(title, author, noOfPages, readStatus);
    myLibrary.push(book);
    console.log(myLibrary);
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
})

