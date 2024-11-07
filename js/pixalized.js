document.addEventListener("DOMContentLoaded", () => {
    const pixalizedList = [
        { src: "./images/pixalized-images/pixalized-2.png", keywords: ["chat", "chat orange", "chat méchant"] },
        { src: "./images/pixalized-images/pixalized-1.png", keywords: ["etienne", "beau", "tienou"] },
        { src: "./images/pixalized-images/pixalized-3.png", keywords: ["girafe", "grande giraffe", "girafe dans la savane"] }
    ];

    let lastImage = null;
    let selectedImage = selectRandomImage();

    function selectRandomImage() {
        let randomImage;
        do {
            randomImage = pixalizedList[Math.floor(Math.random() * pixalizedList.length)];
        } while (randomImage === lastImage);

        lastImage = randomImage;

        const imageElement = document.getElementById("pixalized_image");

        if (imageElement) {
            imageElement.src = randomImage.src;
            imageElement.setAttribute("data-keywords", JSON.stringify(randomImage.keywords)); 
        }

        return randomImage;
    }

    const formElement = document.querySelector(".pixalized_game_container form");
    if (formElement) {
        formElement.addEventListener("submit", function(event) {
            event.preventDefault();

            const inputElement = document.getElementById("pixalized_input");
            if (!inputElement) {
                console.error("Input element not found");
                return;
            }

            const inputValue = inputElement.value.trim().toLowerCase();
            const responseDiv = document.createElement("div");
            responseDiv.classList.add("response_message");

            const keywords = JSON.parse(document.getElementById("pixalized_image").getAttribute("data-keywords") || "[]");

            if (keywords.includes(inputValue)) {
                responseDiv.textContent = "Bien joué!";
                responseDiv.classList.add("success");

                selectedImage = selectRandomImage();
            } else {
                responseDiv.textContent = "Essaye encore!";
                responseDiv.classList.add("error");
            }

            const container = document.querySelector(".pixalized_game_container");
            container.appendChild(responseDiv);
            inputElement.value = ""; // Clear input field

            const previousMessage = container.querySelector(".response_message");
            if (previousMessage) previousMessage.remove();
            container.appendChild(responseDiv);
        });
    }
});
