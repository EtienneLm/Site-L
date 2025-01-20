document.addEventListener("DOMContentLoaded", function () {
    const mainHeart = document.getElementById("main-heart");
    let holdInterval;

    function createHeart() {
        const smallHeart = document.createElement("div");
        smallHeart.classList.add("small-heart");
        smallHeart.textContent = "❤️";

        const angle = Math.random() * 2 * Math.PI;
        const distance = 20 + Math.random() * 30; 

        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        smallHeart.style.setProperty('--x-offset', `${xOffset}px`);
        smallHeart.style.setProperty('--y-offset', `${yOffset}px`);

        mainHeart.parentNode.appendChild(smallHeart);

        smallHeart.addEventListener("animationend", () => {
            smallHeart.remove();
        });
    }

    mainHeart.addEventListener("mousedown", () => {
        holdInterval = setInterval(createHeart, 200);
    });

    document.addEventListener("mouseup", () => {
        clearInterval(holdInterval);
    });

    mainHeart.addEventListener("touchstart", (e) => {
        e.preventDefault();
        holdInterval = setInterval(createHeart, 200);
    });

    document.addEventListener("touchend", () => {
        clearInterval(holdInterval);
    });
});
