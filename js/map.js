var map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const locations = [
  { name: "Santorini", coords: [36.3932, 25.4615], type: "trophy" },
  { name: "Normandie", coords: [49.1829, -0.3707], type: "trophy" },
  { name: "Paris", coords: [48.8566, 2.3522], type: "trophy" },
  { name: "Seville", coords: [37.3891, -5.9845], type: "pin-question" },
  { name: "Rodez", coords: [44.35, 2.5667], type: "pin-question" },
  { name: "Rome", coords: [41.9028, 12.4964], type: "pin-question" },
  { name: "Venise", coords: [45.4408, 12.3155], type: "pin-question" },
  { name: "Canada", coords: [56.1304, -106.3468], type: "pin-question" },
  { name: "Switzerland", coords: [46.8182, 8.2275], type: "pin-question" },
];

const locationImages = {
  Paris: "../images/popup-images/popup-1.png",
  Venise: "../images/img-3.png",
  Canada: "../images/img-2.png",
};

locations.forEach((location) => {
  let iconClass;

  if (location.type === "trophy") {
    iconClass = "trophy";
  } else if (location.type === "pin-question") {
    iconClass = "pin-question";
  }

  const customIcon = L.divIcon({
    className: iconClass,
    iconSize: [20, 20],
  });

  const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);

  const imageSrc = locationImages[location.name] || "../images/default-image.png";

  marker.on("click", () => showImagePopup(imageSrc));
});

function showImagePopup(imageUrl) {
  const popup = document.getElementById("image-popup");
  const imgElement = document.getElementById("popup-img");
  imgElement.src = imageUrl;
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("image-popup");
  popup.style.display = "none";
}
