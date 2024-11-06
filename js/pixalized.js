document.addEventListener("DOMContentLoaded", () => {
    const pixelizedList = [
        { src: "images/pixalized-images/pixalized-2.png", keywords: ["chat", "chat orange", "chat méchant"] },
        { src: "images/pixalized-images/pixalized-1.png", keywords: ["etienne", "beau", "tienou"] },
        { src: "images/pixalized-images/pixalized-3.png", keywords: ["girafe", "grande giraffe", "giraffe dans la savane"] }
    ];

    let selectedImage = selectRandomImage();

    function selectRandomImage() {
        const randomImage = pixelizedList[Math.floor(Math.random() * pixelizedList.length)];
        const imageElement = document.getElementById("pixelized_image");

        if (imageElement) {
            imageElement.src = randomImage.src;
            imageElement.setAttribute("data-keywords", JSON.stringify(randomImage.keywords)); 
        }

        return randomImage;
    }

    const formElement = document.querySelector(".pixelized_game_container form");
    if (formElement) {
        formElement.addEventListener("submit", function(event) {
            event.preventDefault();

            const inputValue = document.getElementById("pixalized_imput").value.trim().toLowerCase();
            const responseDiv = document.createElement("div");
            responseDiv.classList.add("response_message");

            const keywords = JSON.parse(document.getElementById("pixelized_image").getAttribute("data-keywords") || "[]");

            if (keywords.includes(inputValue)) {
                responseDiv.textContent = "Bien joué!";
                responseDiv.classList.add("success");

                selectedImage = selectRandomImage();
            } else {
                responseDiv.textContent = "Essaye encore!";
                responseDiv.classList.add("error");
            }

            const container = document.querySelector(".pixelized_game_container");
            container.appendChild(responseDiv);
            document.getElementById("pixalized_imput").value = ""; 

            const previousMessage = container.querySelector(".response_message");
            if (previousMessage) previousMessage.remove();
            container.appendChild(responseDiv);
        });
    }
});
