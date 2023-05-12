class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

const bookManager = {
  books: [],
  tableBody: document.querySelector('#book-table tbody'),
  form: document.querySelector('#add-book-form'),
  init() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
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
      removeCell.innerHTML = `<button onclick="bookManager.removeBook('${book.id}')">Remove</button>`;
    });
  },
};

bookManager.init();

const navLinks = document.querySelectorAll('nav a');
const contentSections = document.querySelectorAll('.content-section');

function showSection(sectionId) {
  contentSections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
  if (sectionId === 'add-book-form') {
    document.querySelector('#book-app').classList.add('add-book-form');
  } else {
    document.querySelector('#book-app').classList.remove('add-book-form');
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    showSection(sectionId);
  });
});

showSection('books-list');
