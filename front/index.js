const url = "http://localhost:3000/memberships";
const addMemberBTN = document.getElementById("addBTN");
addMemberBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "addmember.html";
});

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createPlan(data);
    });
}

getData();

function createPlan(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "plans";
    const output = document.getElementById("membership");
    const planTitle = document.createElement("h2");
    planTitle.textContent = `$${item.price} ${item.name}`;

    const planInfo = document.createElement("p");
    planInfo.textContent = item.description;
    planInfo.className = "planInfo";

    const btndiv = document.createElement("div");
    btndiv.className = "btndiv";

    const delBTN = document.createElement("button");
    delBTN.className = "delBTN";
    delBTN.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    delBTN.addEventListener("click", () => {
      const delConfirm = confirm("Do you want to delete this item?");

      if (delConfirm) {
        fetch(`${url}/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            div.remove();
            alert("Membership has been deleted!");
          });
      }
    });

    div.append(planTitle, planInfo, btndiv);
    btndiv.append(delBTN);
    output.append(div);
  });
}
