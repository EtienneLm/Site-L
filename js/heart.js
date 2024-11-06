document.addEventListener("DOMContentLoaded", function () {
    const mainHeart = document.getElementById("main-heart");
    let holdInterval;

    // Function to create and animate small hearts around the main heart
    function createHeart() {
        const smallHeart = document.createElement("div");
        smallHeart.classList.add("small-heart");
        smallHeart.textContent = "❤️";

        // Random angle and distance for scattered effect
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const distance = 20 + Math.random() * 30; // Random distance

        // Calculate x and y offset based on the angle and distance
        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        // Apply offsets as CSS custom properties
        smallHeart.style.setProperty('--x-offset', `${xOffset}px`);
        smallHeart.style.setProperty('--y-offset', `${yOffset}px`);

        // Append to main heart container
        mainHeart.parentNode.appendChild(smallHeart);

        // Remove heart after animation ends
        smallHeart.addEventListener("animationend", () => {
            smallHeart.remove();
        });
    }

    // Start creating hearts when mouse is held down
    mainHeart.addEventListener("mousedown", () => {
        holdInterval = setInterval(createHeart, 200);
    });

    // Stop creating hearts when mouse is released
    document.addEventListener("mouseup", () => {
        clearInterval(holdInterval);
    });

    // For touch devices (optional)
    mainHeart.addEventListener("touchstart", (e) => {
        e.preventDefault();
        holdInterval = setInterval(createHeart, 200);
    });

    document.addEventListener("touchend", () => {
        clearInterval(holdInterval);
    });
});
