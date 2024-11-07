// Load the header content and initialize autocomplete
fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
        
        // The list of words for autocomplete suggestions
        const loulouList = [
            "Loulou", "Drôle", "Folle", "Génante", "Flopesque", "Love", "Loulou+Tienou=<3"
        ];
        
        // Initialize autocomplete with the input element and list
        autocomplete(document.getElementById("myInput"), loulouList);
    })
    .catch(error => console.error("Erreur lors du chargement du header:", error));

// Autocomplete function
function autocomplete(inp, arr) {
    let currentFocus;

    // Triggered when the user types in the input field
    inp.addEventListener("input", function() {
        const val = this.value;
        closeAllLists();  // Close any already open suggestion lists
        if (!val) return false;  // Exit if the input field is empty
        currentFocus = -1;

        // Create a container for autocomplete items
        const listContainer = document.createElement("DIV");
        listContainer.setAttribute("id", this.id + "autocomplete-list");
        listContainer.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(listContainer);

        // Filter and display the list items that match the input value
        arr.forEach(item => {
            if (item.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                // Create a div for each matching item
                const itemElement = document.createElement("DIV");
                itemElement.innerHTML = "<strong>" + item.substr(0, val.length) + "</strong>";
                itemElement.innerHTML += item.substr(val.length);
                itemElement.innerHTML += `<input type='hidden' value='${item}'>`;

                // Handle click on an autocomplete item
                itemElement.addEventListener("click", function() {
                    inp.value = this.getElementsByTagName("input")[0].value;  // Insert selected item into input
                    closeAllLists();  // Close the autocomplete list
                });

                listContainer.appendChild(itemElement);  // Append item to the list
            }
        });
    });

    // Handle keyboard navigation within the autocomplete list
    inp.addEventListener("keydown", function(e) {
        let items = document.getElementById(this.id + "autocomplete-list");
        if (items) items = items.getElementsByTagName("div");

        if (e.keyCode === 40) { // Arrow DOWN key
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) { // Arrow UP key
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13) { // ENTER key
            e.preventDefault();
            if (currentFocus > -1 && items) items[currentFocus].click();
        }
    });

    // Highlight the current active item in the list
    function addActive(items) {
        if (!items) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("autocomplete-active");
    }

    // Remove the active class from all items
    function removeActive(items) {
        Array.from(items).forEach(item => item.classList.remove("autocomplete-active"));
    }

    // Close all autocomplete lists
    function closeAllLists(elmnt) {
        Array.from(document.getElementsByClassName("autocomplete-items")).forEach(item => {
            if (elmnt !== item && elmnt !== inp) item.parentNode.removeChild(item);
        });
    }

    // Close the autocomplete list when clicking outside of it
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

// Display a custom response when a specific term is entered
function displayResponseText(inputValue) {
    const responseDiv = document.querySelector(".form_response_txt");

    if (inputValue === "Folle") {
        responseDiv.textContent = "C'est vraiment une folle!";
    } else if (inputValue === "Génante") {
        responseDiv.textContent = "Ah oui parfois t'es génante!";
    } else if (inputValue === "Loulou+Tienou=<3") {
        responseDiv.innerHTML = "<img src='some-image.jpg' alt='Loulou+Tienou'>";
    } else {
        responseDiv.textContent = "";
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const inputValue = document.getElementById("myInput").value;
    displayResponseText(inputValue);

    // Optionally clear the input field after form submission
    document.getElementById("myInput").value = "";
    closeAllLists();  // Close autocomplete suggestions
}
