document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    })
    .catch((error) => console.error("Error loading footer:", error));
});

const qrcode = new QRCode(document.querySelector(".qrcode"));
qrcode.makeCode("https://etiennelm.github.io/Site-L/");
