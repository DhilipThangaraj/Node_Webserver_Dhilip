console.log("Client javascript got loaded!!");

const weatherForm = document.querySelector("form");
const searchVal = document.querySelector("input");
let msg1 = document.querySelector(".m1");
let msg2 = document.querySelector(".m2");

msg1.textContent = "";
msg2.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchVal.value;
  msg1.textContent = "Loading....";
  msg2.textContent = "";
  fetch(`/weather?address=${location}`).then((response, err) => {
    msg1.textContent = "";
    response.json().then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg2.textContent = data.location + " . " + data.forecast.summary;
      }
    });
  });
});
