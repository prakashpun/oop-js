// ES5 Object Oriented Programming

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI constructor -  Add, Delete, Show books on UI
function UI() { }

// Prototype function for UI class to add book to list;
UI.prototype.addBookToList = function(book) {
    
}

// Event listeners
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

        // Instaantiate a book
        const book = new Book(title, author, isbn);

        // Instantiate UI object
        const ui = new UI();

        // Add book to list
        ui.addBookToList(book)    

        
        e.preventDefault();
    });