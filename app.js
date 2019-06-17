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
    const list = document.getElementById('book-list');

    // Create table row element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a> </td>
    `;

    list.appendChild(row);
}

// Clear UI fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
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

        // Clear UI fields
        ui.clearFields();
        
        e.preventDefault();
    });