import { Book } from './book.js';

export const bookManager = {
  books: [],
  tableBody: document.querySelector('#book-table tbody'),
  form: document.querySelector('#add-book-form'),
  init() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
    });
    this.tableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-button')) {
        const id = event.target.getAttribute('data-id');
        this.removeBook(id);
      }
    });
    window.addEventListener('load', () => {
      if (localStorage.getItem('books')) {
        this.books = JSON.parse(localStorage.getItem('books')).map(
          (book) => new Book(book.id, book.title, book.author),
        );
        this.displayBooks();
      }
    });
    window.addEventListener('unload', () => {
      localStorage.setItem('books', JSON.stringify(this.books));
    });
  },
  addBook() {
    const titleInput = document.querySelector('#title-input');
    const authorInput = document.querySelector('#author-input');
    const id = Date.now().toString(); // generate a unique ID
    const book = new Book(id, titleInput.value, authorInput.value);
    this.books.push(book);
    this.displayBooks();
    titleInput.value = '';
    authorInput.value = '';
  },
  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.displayBooks();
    localStorage.setItem('books', JSON.stringify(this.books));
  },
  displayBooks() {
    this.tableBody.innerHTML = '';
    this.books.forEach((book) => {
      const row = this.tableBody.insertRow();
      const titleCell = row.insertCell();
      const removeCell = row.insertCell();
      removeCell.classList.add('align-rm-btn');
      const bookTitle = `${book.title} by ${book.author}`;
      titleCell.innerText = bookTitle;
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.setAttribute('data-id', book.id);
      removeButton.innerText = 'Remove';
      removeCell.appendChild(removeButton);
    });
  },
};
