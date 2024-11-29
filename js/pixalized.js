document.addEventListener("DOMContentLoaded", () => {
    const pixalizedImgList = [
        { id: 1, src: "./images/pixalized/pix-1.png", keywords: ["plage", "bouteille", "allongé"] },
        { id: 2, src: "./images/pixalized/pix-2.png", keywords: ["masque", "lycée", "début"] },
        { id: 3, src: "./images/pixalized/pix-3.png", keywords: ["masque", "collier", "coeur", "lego", "lycée"] },
        { id: 4, src: "./images/pixalized/pix-4.png", keywords: ["lola", "soirée", "sac à dos"] },
        { id: 5, src: "./images/pixalized/pix-5.png", keywords: ["disney", "lunettes", "3d"] },
        { id: 6, src: "./images/pixalized/pix-6.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] },
        { id: 7, src: "./images/pixalized/pix-7.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] },
        { id: 8, src: "./images/pixalized/pix-8.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] },
        { id: 9, src: "./images/pixalized/pix-9.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] },
        { id: 10, src: "./images/pixalized/pix-10.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] },
        { id: 11, src: "./images/pixalized/pix-11.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] }
    ];

    const normalImgList = [
        { id: 1, src: "./images/normal/normal-1.jpg" },
        { id: 2, src: "./images/normal/normal-2.jpg" },
        { id: 3, src: "./images/normal/normal-3.jpg" },
        { id: 4, src: "./images/normal/normal-4.jpg" },
        { id: 5, src: "./images/normal/normal-5.jpg" },
        { id: 6, src: "./images/normal/normal-6.jpg" },
        { id: 7, src: "./images/normal/normal-7.jpg" },
        { id: 8, src: "./images/normal/normal-8.jpg" },
        { id: 9, src: "./images/normal/normal-9.JPG" },
        { id: 10, src: "./images/normal/normal-10.JPG" },
        { id: 11, src: "./images/normal/normal-11.png" }
    ];

    let lastImage = null;

    function selectRandomImage() {
        let randomImage;
        do {
            randomImage = pixalizedImgList[Math.floor(Math.random() * pixalizedImgList.length)];
        } while (randomImage === lastImage);

        lastImage = randomImage;

        const imageElement = document.getElementById("pixalized_image");

        if (imageElement) {
            imageElement.src = randomImage.src;
            imageElement.setAttribute("data-id", randomImage.id);
            imageElement.setAttribute("data-keywords", JSON.stringify(randomImage.keywords));
            // imageElement.setAttribute("loading", "lazy"); // should allow the image to be loaded only when the user scrolls to the game
        }

        return randomImage;
    }

    function showNormalImage() {
        const currentId = parseInt(document.getElementById("pixalized_image").getAttribute("data-id"), 10);
        const normalImage = normalImgList.find(img => img.id === currentId);

        if (normalImage) {
            const modal = document.createElement("div");
            modal.classList.add("modal");

            const imgElement = document.createElement("img");
            imgElement.src = normalImage.src;
            imgElement.alt = "Non-pixalized image";
            // imgElement.setAttribute("loading", "lazy");

            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.classList.add("close-button");
            closeButton.addEventListener("click", () => {
                document.body.removeChild(modal);
                selectRandomImage();
            });

            modal.appendChild(imgElement);
            modal.appendChild(closeButton);
            document.body.appendChild(modal);
        }
    }

    document.querySelector(".pixalized_game_container form").addEventListener("submit", (event) => {
        event.preventDefault();

        const inputElement = document.getElementById("pixalized_input");
        const inputValue = inputElement.value.trim().toLowerCase();
        const responseDiv = document.createElement("div");
        responseDiv.classList.add("response_message");

        const keywords = JSON.parse(document.getElementById("pixalized_image").getAttribute("data-keywords") || "[]");

        if (keywords.includes(inputValue)) {
            responseDiv.textContent = "Bien joué!";
            responseDiv.classList.add("success");
            showNormalImage();
        } else {
            responseDiv.textContent = "Essaye encore!";
            responseDiv.classList.add("error");
        }

        const container = document.querySelector(".pixalized_game_container");
        const previousMessage = container.querySelector(".response_message");
        if (previousMessage) previousMessage.remove();

        container.appendChild(responseDiv);
        inputElement.value = "";
    });

    selectRandomImage();
});
