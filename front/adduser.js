const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "users.html";
});

const url = "http://localhost:3000/users";

fetch("https://api.ipify.org?format=json")
  .then((result) => result.json())
  .then((ip) => console.log(ip))
  .catch((error) => {
    console.log(error);
  });

const form = document.getElementById("createUserForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  const surname = e.target.elements.surname.value.trim();
  const email = e.target.elements.email.value.trim();
  const service_id = e.target.elements.chooseplan.value;

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
