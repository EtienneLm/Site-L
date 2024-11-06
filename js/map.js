var map = L.map("map").setView([20, 0], 2); 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const locations = [
  {
    name: "Santorini",
    coords: [36.3932, 25.4615],
    type: "star",
    imageUrl: "images/popup-images/popup-1.png", 
  },
  {
    name: "Paris",
    coords: [48.8566, 2.3522],
    type: "star",
    imageUrl: "images/popup-images/popup-1.png", 
  },
  {
    name: "Canada",
    coords: [56.1304, -106.3468],
    type: "circle",
    imageUrl: "",
  },
  {
    name: "Switzerland",
    coords: [46.8182, 8.2275],
    type: "circle",
    imageUrl: "",
  },
  { name: "Spain", coords: [40.4637, -3.7492], type: "circle", imageUrl: "" },
  {
    name: "La Réunion",
    coords: [-21.1151, 55.5364],
    type: "circle",
    imageUrl: "",
  },
];

// Function to show the image popup
function showImagePopup(imageUrl) {
  const popup = document.getElementById("image-popup");
  const imgElement = document.getElementById("popup-img");
  imgElement.src = imageUrl;
  popup.style.display = "block";
}

// Function to create markers
locations.forEach((location) => {
  if (location.type === "star") {
    // Create star marker
    const starIcon = L.divIcon({
      className: "star",
      iconSize: [32, 32],
    });
    const marker = L.marker(location.coords, { icon: starIcon }).addTo(map);

    // Add click event to star marker
    marker.on("click", () => {
      showImagePopup(location.imageUrl);
    });
  } else {
    // Create circle marker
    const circleIcon = L.divIcon({
      className: "circle",
      iconSize: [20, 20],
    });
    L.marker(location.coords, { icon: circleIcon }).addTo(map);
  }
});

// Close image popup when clicked
document.getElementById("image-popup").addEventListener("click", function () {
  this.style.display = "none";
});
