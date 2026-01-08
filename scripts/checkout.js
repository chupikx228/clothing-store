document.addEventListener('DOMContentLoaded', () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDiv = document.getElementById('cart_');

    cartDiv.innerHTML = `
    <div class="checkout-wrapper">
      <div class="checkout-second">
        <h3 id="order">Your Order</h3>
        <div id="cart-items"></div>
        <div id="delivery-cost">Delivery: 0 ₴</div>
        <div class="cart-total-container">
          Total: <span id="cart-total">0</span> ₴
        </div>
      </div>
    </div>
  `;

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const deliveryCostBox = document.getElementById('delivery-cost');
    const countrySelect = document.getElementById('country');

    function getDeliveryPrice() {
        if (countrySelect.value === "По Украине") return 100;
        if (countrySelect.value === "Европа") return 600;
        if (countrySelect.value === "Остальная часть мира") return 1200;
        return 0;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (!cart.length) {
            cartItemsContainer.innerHTML = '<p>The cart is empty</p>';
            cartTotal.textContent = '0';
            deliveryCostBox.textContent = 'Доставка: 0 ₴';
            return;
        }

        cart.forEach(item => {
            const qty = item.quantity || 1;
            const price = Number(item.price);

            const div = document.createElement('div');
            div.className = 'cart-item-container';
            div.innerHTML = `
        <img src="${item.image || 'placeholder.png'}">
        <div class="checkout-clothes">
          <div class="item-name"><strong>${item.name}</strong></div>
          <div class="item-size">Size: ${item.size || '-'}</div>
          <div class="quantity-item">Quantity: ${qty}</div>
          <div class="item-price">Price: ${price * qty} ₴</div>
        </div>
        </div>
      `;
            cartItemsContainer.appendChild(div);
            total += price * qty;
        });

        const delivery = getDeliveryPrice();
        deliveryCostBox.textContent = `Delivery: ${delivery} ₴`;
        cartTotal.textContent = total + delivery;
    }

    countrySelect.addEventListener('change', renderCart);
    renderCart();
});
