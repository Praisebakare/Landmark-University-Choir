const today = new Date();
const date = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

document.getElementById("printDateTime").innerHTML =
  "Printed on: " + date + " at " + time;