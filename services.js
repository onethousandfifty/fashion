// Add a click event listener to each service list item
const serviceItems = document.querySelectorAll('#services-list li');

serviceItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle the "active" class on the clicked item
    item.classList.toggle('active');
  });
