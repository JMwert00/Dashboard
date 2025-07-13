// Retrieve stored list items on page load
window.addEventListener('load', function() {
    var storedItems = localStorage.getItem('taskItems');
    if (storedItems) {
      document.getElementById('taskList').innerHTML = storedItems;
      addEventListenersToItems();
    }
  });
  
  // Add event listeners to the list items
  function addEventListenersToItems() {
    var listItems = document.querySelectorAll('ul li');
    listItems.forEach(function(item) {
      item.addEventListener('click', toggleChecked);
      addCloseButtonToElement(item);
    });
  }
  
  // Toggle checked status of list items
  function toggleChecked() {
    this.classList.toggle('checked');
    saveListItems();
  }
  
  // Add close button to a list item
  function addCloseButtonToElement(element) {
    var closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.appendChild(document.createTextNode('\u00D7'));
    element.appendChild(closeButton);
    closeButton.addEventListener('click', deleteItem);
  }
  
  // Delete a list item
  function deleteItem() {
    var listItem = this.parentElement;
    listItem.style.display = 'none';
    saveListItems();
  }
  
  // Save list items to local storage
  function saveListItems() {
    var list = document.getElementById('taskList').innerHTML;
    localStorage.setItem('taskItems', list);
  }
  
  // Create a new list item
  function newElement() {
    var inputValue = document.getElementById('taskInput').value;
    if (inputValue === '') {
      alert('Leere Eingaben werden nicht akzeptiert!');
      return;
    }
  
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(inputValue));
    document.getElementById('aufgabeList').appendChild(listItem);
    document.getElementById('taskInput').value = '';
  
    addEventListenersToItems(); // Add event listeners to the new item
    saveListItems(); // Save list items after adding a new item
  }
  