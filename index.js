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


class library {

    //myLibrary array for storing books data
    static myLibrary = [];

    // function to add new book object into myLibrary array
    addBookToLibrary(book) {
        library.myLibrary.push(book);
    };

    // diaplay book on the main section in html page
    displayBook() {
        for (let book of library.myLibrary) {
            this.createCard(book);
        };
    };

    // Display the searched book
    displaySearchedBook(searchedInput) {

        for (const book of library.myLibrary) {
            if (book.title === searchedInput) {
                mainDisplay.textContent = '';
                return this.createCard(book);
            }
        }
        this.bookCard.textContent = 'No Book found.';
        mainDisplay.appendChild(this.bookCard);
    };

};

// class based constructor function for creating new book objectc
class Book extends library {
    constructor (title, author, noOfPages, readStatus) {
        super();
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.readStatus = readStatus;
    }

    // create a new card div for storing a book's info
    createCard(book) {
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
    
        ReadStatus.setAttribute("id", "readingStatus");
        
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
        ReadStatus.textContent = book.readStatus + 	' 📚';
    
        ReadStatus.addEventListener('click', () => {
            book.readStatus = "Read";
            mainDisplay.textContent = "";
            this.displayBook();
        });
    
        const editDeleteCard = document.createElement("div");
        editDeleteCard.setAttribute("class", "card-buttons");;
        const deleteCard = document.createElement("button");
        deleteCard.textContent = "Delete";
        
        deleteCard.addEventListener('click', () => {
            const index = library.myLibrary.indexOf(book);
            library.myLibrary.splice(index, 1);
            bookCard.remove();
        });
    
        editDeleteCard.appendChild(deleteCard);
    
        bookCard.appendChild(titleDiv);
        bookCard.appendChild(authorDiv);
        bookCard.appendChild(pagesDiv);
        bookCard.appendChild(statusDiv);
        bookCard.appendChild(editDeleteCard);
        return mainDisplay.appendChild(bookCard);
    }
    
};

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

    const book = new Book(title, author, noOfPages, readStatus);
    book.addBookToLibrary(book);
    bookFormModal.close();
    bookForm.reset();
    mainDisplay.innerHTML = '';
    book.displayBook();

    // gets the searched input and calls the display search book function 
    searchBtn.addEventListener('click', () => {
        const searchedInput = searchInput.value;
        if (!searchInput.value) {
            mainDisplay.textContent = "";
            book.displayBook();
        } 
        book.displaySearchedBook(searchedInput);
    });

    // Option to enable searching even the ENTER key is pressed instead of the search button
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBtn.click();
        }
    });

});
