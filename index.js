import bookManager from './modules/bookManager.js';

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

bookManager.init();
