const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "users.html";
});

const url = "http://localhost:3000/users";
const urlMemberships = "http://localhost:3000/memberships";

function showOptions(data) {
  const select = document.getElementById("chooseplan");
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item._id;
    option.textContent = item.name;
    select.append(option);
  });
}

function getData() {
  fetch(urlMemberships)
    .then((res) => res.json())
    .then((data) => {
      showOptions(data);
    });
}

getData();

var urlIP;
fetch("https://api.ipify.org?format=json")
  .then((result) => result.json())
  .then((data) => (urlIP = data))
  .then(() => console.log(urlIP))
  .catch((error) => {
    console.log(error);
  });

const form = document.getElementById("createUserForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  const surname = e.target.elements.surname.value.trim();
  const email = e.target.elements.email.value.trim();
  const service_id = e.target.elements.chooseplan.value.trim();
  const registration_ip = urlIP.ip;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      surname,
      email,
      service_id,
      registration_ip,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (name && surname && email && service_id) {
        alert("You have created a new user!");
        form.reset();
        setTimeout(() => {
          window.location.href = "users.html";
        }, 1000);
      } else {
        alert("Error has occured. Please try again");
      }
    });
});
