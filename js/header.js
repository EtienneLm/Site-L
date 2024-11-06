fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
        
        const loulouList = [
            "Loulou", "Drôle", "Folle", "Génante", "Flopesque", "Love", "Loulou+Tienou=<3",
        ];
        autocomplete(document.getElementById("myInput"), loulouList);
    })
    .catch(error => console.error("Erreur lors du chargement du header:", error));

function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function() {
        closeAllLists();
        if (!this.value) return false;
        currentFocus = -1;

        const listContainer = document.createElement("DIV");
        listContainer.setAttribute("id", this.id + "autocomplete-list");
        listContainer.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(listContainer);

        arr.forEach(item => {
            if (item.substr(0, this.value.length).toUpperCase() === this.value.toUpperCase()) {
                const itemElement = document.createElement("DIV");
                itemElement.innerHTML = "<strong>" + item.substr(0, this.value.length) + "</strong>";
                itemElement.innerHTML += item.substr(this.value.length);
                itemElement.innerHTML += `<input type='hidden' value='${item}'>`;
                itemElement.addEventListener("click", function() {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                listContainer.appendChild(itemElement);
            }
        });
    });

    inp.addEventListener("keydown", function(e) {
        let items = document.getElementById(this.id + "autocomplete-list");
        if (items) items = items.getElementsByTagName("div");

        if (e.keyCode == 40) { currentFocus++; addActive(items); }
        else if (e.keyCode == 38) { currentFocus--; addActive(items); }
        else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1 && items) items[currentFocus].click();
        }
    });

    function addActive(items) {
        if (!items) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(items) {
        Array.from(items).forEach(item => item.classList.remove("autocomplete-active"));
    }

    function closeAllLists(elmnt) {
        Array.from(document.getElementsByClassName("autocomplete-items")).forEach(item => {
            if (elmnt != item && elmnt != inp) item.parentNode.removeChild(item);
        });
    }

    document.addEventListener("click", function(e) { closeAllLists(e.target); });
}


function displayResponseText(inputValue) {
    const responseDiv = document.querySelector(".form_response_txt");

    if (inputValue === "Folle") {
        responseDiv.textContent = "C'est vraiment une folle!";
    } else if (inputValue === "Génante") {
        responseDiv.textContent = "Ah oui parfois t'es génante!";
    } else if (inputValue === "Loulou+Tienou=<3") {
        // displays an image 
    }else {
        responseDiv.textContent = "";
    }
}

function handleFormSubmit(event) {
    event.preventDefault();  
    const inputValue = document.getElementById("myInput").value;
    displayResponseText(inputValue); 
}