const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

const url = "http://localhost:3000/memberships";

const form = document.getElementById("createMember");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  const price = Number(e.target.elements.price.value);
  const currency = e.target.elements.currency.value.trim();
  const description = e.target.elements.description.value.trim();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      description,
      currency,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (name && price && description && currency) {
        alert("You have created a new membership!");
        form.reset();
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        alert("Error has occured. Please try again");
      }
    });
});
