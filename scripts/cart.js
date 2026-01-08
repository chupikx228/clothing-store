const cartBox = document.getElementById("cart-items");
const subtotalText = document.getElementById("subtotal-text");
const cartText = document.querySelector(".cart-page__text-container");
const checkoutBtn = document.querySelector(".checkout-container");
const subtotalBox = document.querySelector(".cart-page__total");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateSubtotal() {
    let totalPrice = 0;
    cart.forEach(item => {
        const quantity = item.quantity || 1;
        const price = parseFloat(item.price);
        totalPrice += price * quantity;
    });
    subtotalText.textContent = `${totalPrice} UAH`;
}

function checkEmptyCart() {
    if (cart.length === 0) {
        cartBox.innerHTML = "<div class='empty-cart-text-container'><p class='empty-cart-text'>CART IS EMPTY</p></div>";
        cartText.style.display = "none";
        subtotalBox.style.display = "none";
        checkoutBtn.style.display = "none";
    } else {
        cartText.style.display = "flex";
        subtotalBox.style.display = "flex";
    }
}

if (cart.length > 0) {
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item-box";

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">Price: ${item.price} UAH</p>

                <div class="count">
                    <div class="count_box">
                        <button class="btn_minus">-</button>
                        <input type="number" class="count_input" min="1" value="${item.quantity || 1}">
                        <button class="btn_plus">+</button>
                    </div>
                    <div class="remove-container">
                    <button class="remove">
                        <span>REMOVE</span>
                        <img src="../assets/trash.png" alt="trash">
                    </button>
                    </div>
                </div>
            </div>
        `;
        cartBox.appendChild(itemDiv);

        const btnPlus = itemDiv.querySelector(".btn_plus");
        const btnMinus = itemDiv.querySelector(".btn_minus");
        const input = itemDiv.querySelector(".count_input");
        const removeBtn = itemDiv.querySelector(".remove");
        btnMinus.addEventListener("click", () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                item.quantity = value - 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateSubtotal();
            }
        });

        btnPlus.addEventListener("click", () => {
            let value = parseInt(input.value);
            input.value = value + 1;
            item.quantity = value + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateSubtotal();
        });

        input.addEventListener("input", () => {
            let value = parseInt(input.value);
            if (isNaN(value) || value < 1) value = 1;
            input.value = value;
            item.quantity = value;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateSubtotal();
        });

        removeBtn.addEventListener("click", () => {
            const index = cart.findIndex(el => el.name === item.name && el.size === item.size);
            if (index > -1) cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            itemDiv.remove();
            updateSubtotal();
            checkEmptyCart();
        });
    });

    updateSubtotal();
}

checkEmptyCart();// test change
