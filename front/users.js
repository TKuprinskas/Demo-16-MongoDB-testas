const url = "http://localhost:3000/users";
const addMemberBTN = document.getElementById("addBTN");
addMemberBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "adduser.html";
});

let orderSelection = "ASC";

function getData() {
  fetch(`${url}/${orderSelection}`)
    .then((res) => res.json())
    .then((data) => {
      showUser(data);
    });
}

getData();

function showUser(data) {
  const output = document.getElementById("users");
  output.innerHTML = "";
  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "users";
    const userName = document.createElement("h4");
    userName.textContent = `${item.name} ${item.surname}`;

    const email = document.createElement("p");
    email.textContent = `Email address: `;
    const emailGet = document.createElement("span");
    emailGet.className = "emailGet";
    emailGet.textContent = item.email;
    email.appendChild(emailGet);

    const membership = document.createElement("p");
    membership.textContent = `Membership: `;
    const membershipGet = document.createElement("span");
    membershipGet.className = "membershipGet";
    membershipGet.textContent = `${item.planname} (${item.plancurrency}${item.plancost})`;
    membership.appendChild(membershipGet);

    const userIP = document.createElement("p");
    userIP.textContent = `IP address: `;
    const ipGet = document.createElement("span");
    ipGet.className = "ipGet";
    ipGet.textContent = `${item.registration_ip}`;
    userIP.appendChild(ipGet);

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
            alert("The user has been deleted!");
          });
      }
    });

    div.append(userName, email, membership, userIP, btndiv);
    btndiv.append(delBTN);
    output.append(div);
  });
}

document.getElementById("sortOrderSpan").addEventListener("click", (e) => {
  const text = e.target.textContent;
  if (text.includes("ASC")) {
    e.target.textContent = text.replace("ASC", "DSC");
    orderSelection = "dsc";
  } else {
    e.target.textContent = text.replace("DSC", "ASC");
    orderSelection = "asc";
  }

  getData();
});
