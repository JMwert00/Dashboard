document.addEventListener('DOMContentLoaded', function() {
    const contactList = document.getElementById('contact-list');
    const addContactBtn = document.getElementById('add-contact-btn');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
  
    // Laden der Kontakte aus dem Local Storage beim Seitenaufruf
    loadContacts();
  
    addContactBtn.addEventListener('click', function() {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
  
      if (name === '' || email === '') {
        alert('Bitte geben Sie einen Namen und eine E-Mail-Adresse ein.');
        return;
      }
  
      const contact = {
        name: name,
        email: email
      };
  
      // Hinzufügen des Kontakts zur Liste und zum Local Storage
      addContact(contact);
      saveContact(contact);
  
      // Zurücksetzen der Eingabefelder
      nameInput.value = '';
      emailInput.value = '';
    });
  
    function addContact(contact) {
        const listItem = document.createElement('li');
        listItem.className = 'contact-item';
      
        const contactInfo = document.createElement('div');
        contactInfo.innerText = `${contact.name}: ${contact.email}`;
      
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', function() {
          listItem.remove();
          deleteContact(contact);
        });
      
        contactInfo.appendChild(deleteBtn);
      
        // Drag-and-Drop-Funktionen hinzufügen
        listItem.draggable = true;
        listItem.addEventListener('dragstart', dragStart);
        listItem.addEventListener('dragend', dragEnd);
      
        listItem.appendChild(contactInfo);
        contactList.appendChild(listItem);
      }
      
      function deleteContact(contact) {
        let contacts = localStorage.getItem('contacts');
      
        if (contacts === null) {
          return;
        }
      
        contacts = JSON.parse(contacts);
        const index = contacts.findIndex(c => c.name === contact.name && c.email === contact.email);
      
        if (index !== -1) {
          contacts.splice(index, 1);
          localStorage.setItem('contacts', JSON.stringify(contacts));
        }
      }
      
  
    function dragStart(event) {
      event.dataTransfer.setData('text/plain', event.target.innerText);
    }
  
    function dragEnd(event) {
      event.dataTransfer.clearData();
    }
  
    function saveContact(contact) {
      let contacts = localStorage.getItem('contacts');
  
      if (contacts === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(contacts);
      }
  
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    function loadContacts() {
      const contacts = localStorage.getItem('contacts');
  
      if (contacts !== null) {
        const parsedContacts = JSON.parse(contacts);
  
        parsedContacts.forEach(function(contact) {
          addContact(contact);
        });
      }
    }
  });
  