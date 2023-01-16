// ES6 OOP classes

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    constructor(){
        this.uibtitle = "";
        this.uibauthor = "";
        this.uibisbn = "";
    }

    // function for UI class to add book to list;
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // Create table row element
        const row = document.createElement('tr');
        // Insert columns
        row.innerHTML = `
        <td class="mtitle">${book.title}</td>
        <td class="mauthor">${book.author}</td>
        <td class="misbn">${book.isbn}</td>
        <td>
        <a href="#" class="delete">X</a> 
        <button class="edit">Edit</button> 
        </td> `;

        list.appendChild(row);
    }

    // Show Alert
    showAlert(message, className) {
        // create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        //Add alert text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        const formDiv = document.querySelector('.addformdiv').style.display == 'block' ? document.querySelector('.addformdiv') : document.querySelector('.modal');
        // Insert alert
        container.insertBefore(div, formDiv);
        // Time out after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    // Edit 
    editBook(target) {
        if (target.className === 'edit') {
            // target.parentElement.parentElement.remove();
            let liEl = target.parentElement.parentElement;

            // Get book tile, author and isbn for that target
            this.uibtitle = liEl.querySelector('.mtitle').textContent;
            this.uibauthor = liEl.querySelector('.mauthor').textContent;
            this.uibisbn = liEl.querySelector('.misbn').textContent;

            // Callup modal and display
            this.showModal(this.uibtitle, this.uibauthor, this.uibisbn);
        }
    }

    // Clear inputs
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showModal(bt, ba, bi){
        const addFormDiv = document.querySelector('.addformdiv');
        addFormDiv.style.display = "none";

        let modal = document.querySelector('.modal')

        modal.style.display = "block";

        const mform = document.querySelector('#mform');
        mform.mtitle.value = bt;
        mform.mauthor.value = ba;
        mform.misbn.value = bi;
    }

    closeModal(){
        const addFormDiv = document.querySelector('.addformdiv');
        addFormDiv.style.display = "block";

        let modal = document.querySelector('.modal')

        modal.style.display = "none";
    }

    emptyBookList(){
        const booklist = document.querySelector('#book-list')

        booklist.innerHTML = '';
    }


}


// Local Storage class
class Store {

    // Get books from local storage
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    // Display books in UI
    static displayBooks() {
        const books = Store.getBooks();

        const ui = new UI;

        // Empty Booklist
        ui.emptyBookList();

        books.forEach(function(book) {
            // Add book to list
            ui.addBookToList(book);
        })
    }

    // Add book details to local storage
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        // Store to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
       const books = Store.getBooks();
       books.forEach(function(book,index){
           if(book.isbn === isbn){
               books.splice(index,1);
           }
       });
       localStorage.setItem('books', JSON.stringify(books));
    }

    static editBook(title, author, isbn) {
        const books = Store.getBooks();
        books.forEach(function(book){
            if(book.isbn === isbn){
                book.title = title;
                book.author = author;
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
     }
}


// DOM Load event 
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event listeners for Add book
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

        // Instantiate a book
        const book = new Book(title, author, isbn);

        // Instantiate UI object
        const ui = new UI();

        // Validate 
        if (title === '' || author === '' || isbn === '') {
            // Show Error alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {
            // Add book to list
            ui.addBookToList(book)

            // Show success alert
            ui.showAlert('Book Added', 'success');
            // Add to local storage
            Store.addBook(book);

            // Clear UI fields
            ui.clearFields();
        }

        e.preventDefault();
    });

// Event listener for Delete    
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI();

    if(e.target.className == "delete"){
    // Delete book
        ui.deleteBook(e.target);

        // Remove from local storage using ISBN number
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        // Show alert
        ui.showAlert('Book Removed', 'success');
    }
    else if(e.target.className === 'edit'){
        // Show modal and display data for selected book
        ui.editBook(e.target);

        ui.showModal(ui.uibtitle, ui.uibauthor, ui.uibisbn);
    }

    e.preventDefault();
})



// Event listeners for Edit book form submit
document.getElementById('mform').addEventListener('submit',
    function (e) {
        e.preventDefault();

        // Get form values
        const mtitle = document.querySelector('#mtitle').value;
        const mauthor = document.querySelector('#mauthor').value;
        const misbn = document.querySelector('#misbn').value;

        // Instantiate a book
        // const book = new Book(title, author, isbn);

        // Instantiate UI object
        const ui = new UI();

        // Validate 
        if (mtitle === '' || mauthor === '') {
            // Show Error alert
            ui.showAlert('Please fill in all fields', 'error');
            return;
        } else {
            // Add to local storage
            Store.editBook(mtitle, mauthor, misbn);

            // UI displays all books
            Store.displayBooks();

            // Show success alert
            ui.showAlert('Book Edited', 'success');

            // Close Modal
            ui.closeModal();

            // Clear UI fields
            ui.clearFields();
        }

    });