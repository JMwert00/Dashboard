        // Formular-Element und Aufgabenliste aus HTML abrufen
        var todoForm = document.getElementById("todoForm");
        var taskList = document.getElementById("taskList");
  
        // Variable zur Verfolgung des zu bearbeitenden Elements
        var editableItem = null;
  
        // Load stored list items on page load
        window.addEventListener("load", function() {
            loadListItems();
        });
  
        // Formular absenden
        todoForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Verhindert das Neuladen der Seite
  
            var dateInput = document.getElementById("dateInput").value;
            var taskInput = document.getElementById("taskInput").value;
  
            if (editableItem) {
                // Bearbeiten des vorhandenen Elements
                var dateSpan = editableItem.querySelector(".dateSpan");
                var taskSpan = editableItem.querySelector(".taskSpan");
                dateSpan.innerText = dateInput;
                taskSpan.innerText = taskInput;
                editableItem = null;
            } else {
                // Neuen Eintrag zur Aufgabenliste hinzufügen
                var li = document.createElement("li");
                li.innerHTML = "<strong>Datum:</strong> <span class='dateSpan'>" + dateInput + "</span>, <strong>Aufgabe:</strong> <span class='taskSpan'>" + taskInput + "</span>" +
                    ' <button class="editBtn" onclick="editItem(this)">Edit</button>' +
                    ' <button class="deleteBtn" onclick="deleteItem(this)">Löschen</button>';
  
                // Highlight the list item when clicked
                li.addEventListener("click", function() {
                    li.classList.toggle("completed");
                });
  
                taskList.appendChild(li);
            }
            
            // Textfelder im Formular leeren
            document.getElementById("dateInput").value = "";
            document.getElementById("taskInput").value = "";
  
            saveListItems();
        });
  
        // Editieren eines Elements
        function editItem(editButton) {
            var listItem = editButton.parentNode;
            var dateSpan = listItem.querySelector(".dateSpan");
            var taskSpan = listItem.querySelector(".taskSpan");
  
            var dateInput = document.getElementById("dateInput");
            var taskInput = document.getElementById("taskInput");
  
            dateInput.value = dateSpan.innerText;
            taskInput.value = taskSpan.innerText;
            // Das zu bearbeitende Element verfolgen
            editableItem = listItem; 
        }
  
        // Löschen eines Elements
        function deleteItem(deleteButton) {
            var listItem = deleteButton.parentNode;
            listItem.remove();
            saveListItems();
        }
  
        // Speichern der Listenelemente in Local Storage
        function saveListItems() {
            var listItems = taskList.innerHTML;
            localStorage.setItem("taskListItems", listItems);
        }
  
        // Laden der Listenelemente aus Local Storage
        function loadListItems() {
            var storedItems = localStorage.getItem("taskListItems");
            if (storedItems) {
                taskList.innerHTML = storedItems;
            }
        }