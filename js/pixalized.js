document.addEventListener("DOMContentLoaded", () => {
    const pixalizedImgList = [
        { id: 1, src: "./images/pixalized-images/pixalized/pix-1.png", keywords: ["etienne et louane", "couché de soleil", "santorin"] },
        { id: 2, src: "../images/pixalized-images/pixalized-1.png", keywords: ["etienne", "beau", "tienou"] },
        { id: 3, src: "images/pixalized-images/pixalized-3.png", keywords: ["girafe", "grande giraffe", "girafe dans la savane"] }
    ];

    const normalImgList = [
        { id: 1, src: "./images/pixalized-images/real/real-1.png" },
        { id: 2, src: "../images/pixalized-images/pixalized-1.png" },
        { id: 3, src: "images/pixalized-images/pixalized-3.png" }
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
