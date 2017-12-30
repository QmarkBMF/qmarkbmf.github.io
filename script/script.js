var remainingTime;

function set_time(t) {
  if (t){
    if (remainingTime != 0){
      var days = Math.floor(remainingTime / 86400);
      var hours = Math.floor((remainingTime % 86400) / 3600)
      var minutes = Math.floor((remainingTime % 3600) / 60)
      var seconds = Math.floor(remainingTime % 60)
      document.getElementById("title").innerText = "Надя вернется через";
      document.getElementById("test").innerText = days + " д.  " + hours + " ч.  " + minutes + " мин.  ";
    }
    else {
      document.getElementById("title").innerText = " ";
      document.getElementById("test").innerText = "Надя вернулась!";
    }
  }// + seconds + "c. "
}

function getTimeFromServer() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://homecoming.azurewebsites.net/', true)
  xhr.send()

  xhr.onreadystatechange = processRequest;

  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      remainingTime = response.difference;
      //if (remainingTime){
      //  set_time(remainingTime);
      set_time(remainingTime);    
    }
  }
}

function syncTime(){
  setInterval(getTimeFromServer(), 10000);
  console.log("Time synced")
}

window.onload = function () {
  getTimeFromServer();
  setInterval(function () {
    remainingTime--;
    set_time(remainingTime);
  }, 1000)
  setInterval(function(){
    getTimeFromServer();
    console.log("Time Synced")
  }, 30000)
} //document.getElementById("test").innerText = remainingTime;
