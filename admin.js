const adminForm = document.getElementById("adminForm");
const adminMenuDiv = document.getElementById("adminMenu");

// Load menu from localStorage
let adminMenu = JSON.parse(localStorage.getItem("adminMenu")) || [];

function renderAdminMenu() {
    adminMenuDiv.innerHTML = "";
    adminMenu.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeItem(${index})">Remove</button>`;
        adminMenuDiv.appendChild(div);
    });
}

function removeItem(index) {
    adminMenu.splice(index, 1);
    localStorage.setItem("adminMenu", JSON.stringify(adminMenu));
    renderAdminMenu();
}

adminForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("foodName").value;
    const price = Number(document.getElementById("foodPrice").value);

    adminMenu.push({name, price});
    localStorage.setItem("adminMenu", JSON.stringify(adminMenu));

    renderAdminMenu();
    adminForm.reset();
});

// Initial render
renderAdminMenu();
