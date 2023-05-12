export function showSection(sectionId) {
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
  
  export const navLinks = document.querySelectorAll('nav a');
  export const contentSections = document.querySelectorAll('.content-section');
  