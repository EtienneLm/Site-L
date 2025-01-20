var countDownDate = new Date("Nov 29, 2024 17:07:00").getTime();
// var countDownDate = new Date("Dec 19, 2024 00:00:00").getTime(); // the actual countdown date

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
    
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("countdown_date").innerHTML = days + "J " + hours + "H "
    + minutes + "min " + seconds + "sec ";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown_date").innerHTML = "Joyeux anniversaire";
    document.getElementById("appearing_btn").style.display = "block";
  }
}, 1000);
