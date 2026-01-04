// ----------------- SIGNUP -----------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function(e){
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if username exists
        if(users.find(u => u.username === username)){
            alert("Username already exists");
            return;
        }

        users.push({username, password});
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful! Please login.");
        window.location.href = "index.html";
    });
}

// ----------------- LOGIN -----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.username === username && u.password === password);
        if(user){
            localStorage.setItem("loggedInUser", username);
            window.location.href = "menu.html";
        } else {
            alert("Invalid username or password");
        }
    });
}
// ----------------- LOGIN -----------------

if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.username === username && u.password === password);
        if(user){
            // save logged in user
            localStorage.setItem("loggedInUser", username);
            window.location.href = "menu.html";  // redirect to menu page
        } else {
            alert("Invalid username or password");
        }
    });
}
// ----------------- MENU + ADD TO CART -----------------
// ----------------- MENU + ADD TO CART -----------------
const menuItemsDiv = document.getElementById("menuItems");

if (menuItemsDiv) {
    let adminMenu = JSON.parse(localStorage.getItem("adminMenu")) || [
        { name: "Pizza", price: 250 },
        { name: "Burger", price: 120 },
        { name: "Pasta", price: 180 },
        { name: "Dal Rice", price: 150 }
    ];

    localStorage.setItem("adminMenu", JSON.stringify(adminMenu));
    menuItemsDiv.innerHTML = "";

    adminMenu.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("food-item");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <button class="addBtn">Add to Cart</button>
        `;

        menuItemsDiv.appendChild(div);

        div.querySelector(".addBtn").addEventListener("click", () => {
            addToCart(index);
        });
    });
}

// ----------------- GLOBAL ADD TO CART -----------------
window.addToCart = function(index) {
    const adminMenu = JSON.parse(localStorage.getItem("adminMenu")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedItem = adminMenu[index];
    if (!selectedItem) {
        alert("Item not found");
        return;
    }

    const existingItem = cart.find(item => item.name === selectedItem.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${selectedItem.name} added to cart`);
};

// ----------------- CART PAGE -----------------
const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const orderNowBtn = document.getElementById("orderNowBtn");

if (cartItemsDiv && totalPriceEl && orderNowBtn) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartItemsDiv.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
            totalPriceEl.textContent = "Total: ₹0";
            orderNowBtn.style.display = "none";
            return;
        }

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <p>
                    Quantity:
                    <button class="decreaseBtn">-</button>
                    ${item.quantity}
                    <button class="increaseBtn">+</button>
                </p>
                <p>Item Total: ₹${itemTotal}</p>
                <button class="removeBtn">Remove</button>
            `;

            cartItemsDiv.appendChild(div);

            div.querySelector(".increaseBtn").addEventListener("click", () => {
                cart[index].quantity += 1;
                updateCart();
            });

            div.querySelector(".decreaseBtn").addEventListener("click", () => {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    updateCart();
                }
            });

            div.querySelector(".removeBtn").addEventListener("click", () => {
                cart.splice(index, 1);
                updateCart();
            });
        });

        totalPriceEl.textContent = `Total: ₹${total}`;
        orderNowBtn.style.display = "inline-block";
    }

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    orderNowBtn.addEventListener("click", () => {
        if(cart.length === 0) {
            alert("Cart is empty");
            return;
        }
        localStorage.setItem("lastOrder", JSON.stringify(cart));
        localStorage.removeItem("cart");
        window.location.href = "order-confirmation.html";
    });

    renderCart();
}

