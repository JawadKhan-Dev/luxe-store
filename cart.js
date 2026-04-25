/* ================================================
   CART PAGE — js/cart.js
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  document.addEventListener('cartUpdated', renderCart);
});

function renderCart() {
  const cart = LuxeCart.get();
  const layout = document.getElementById('cartLayout');

  if (cart.length === 0) {
    layout.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h2>Your Cart is Empty</h2>
        <p>Discover our luxury collections and add your first piece.</p>
        <a href="shop.html" class="btn btn-primary">Explore Collections</a>
      </div>`;
    return;
  }

  const subtotal = LuxeCart.subtotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  layout.innerHTML = `
    <div class="cart-items">
      <div class="cart-header">
        <span>Product</span><span>Price</span><span>Quantity</span><span>Total</span>
      </div>
      ${cart.map(item => `
        <div class="cart-row" data-key="${item.key}">
          <div class="cart-prod">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-prod-info">
              <span class="cart-prod-brand">${item.brand}</span>
              <h4>${item.name}</h4>
              <div class="cart-prod-meta">
                ${item.size !== 'One Size' ? `<span>Size: ${item.size}</span>` : ''}
                ${item.color !== 'Default' ? `<span>Color: ${item.color}</span>` : ''}
              </div>
              <button class="cart-remove" data-key="${item.key}">
                <i class="fa-regular fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
          <div class="cart-price">${fmt(item.price)}</div>
          <div class="cart-qty">
            <div class="qty-control">
              <button class="qty-btn cart-qty-btn" data-key="${item.key}" data-action="minus">−</button>
              <input class="qty-input" value="${item.qty}" readonly>
              <button class="qty-btn cart-qty-btn" data-key="${item.key}" data-action="plus">+</button>
            </div>
          </div>
          <div class="cart-total">${fmt(item.price * item.qty)}</div>
        </div>
      `).join('')}
      <div class="cart-footer-row">
        <button class="btn btn-outline" onclick="window.location='shop.html'">
          <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </button>
        <button class="btn btn-outline" onclick="LuxeCart.clear();renderCart()">
          Clear Cart
        </button>
      </div>
    </div>

    <aside class="cart-summary">
      <h3>Order Summary</h3>

      <div class="coupon-field">
        <input type="text" placeholder="Coupon Code" id="couponInput">
        <button onclick="applyCoupon()">Apply</button>
      </div>

      <div class="summary-lines">
        <div class="summary-line">
          <span>Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)</span>
          <span>${fmt(subtotal)}</span>
        </div>
        <div class="summary-line">
          <span>Shipping</span>
          <span>${shipping === 0 ? '<span style="color:var(--gold)">FREE</span>' : fmt(shipping)}</span>
        </div>
        <div class="summary-line">
          <span>Tax (10%)</span>
          <span>${fmt(tax)}</span>
        </div>
        <div id="discountLine" style="display:none" class="summary-line">
          <span>Discount</span><span id="discountAmt" style="color:#27ae60"></span>
        </div>
      </div>

      <div class="summary-total">
        <span>Total</span>
        <span id="totalAmt">${fmt(total)}</span>
      </div>

      ${shipping > 0 ? `<p class="free-ship-note">Add ${fmt(500 - subtotal)} more for FREE shipping</p>` : '<p class="free-ship-note" style="color:var(--gold)">✓ You qualify for FREE shipping!</p>'}

      <a href="checkout.html" class="btn btn-primary checkout-btn">
        Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
      </a>

      <div class="cart-trust">
        <div><i class="fa-solid fa-lock"></i> Secure Checkout</div>
        <div><i class="fa-solid fa-shield-halved"></i> 100% Authentic</div>
        <div><i class="fa-solid fa-rotate-left"></i> Free Returns</div>
      </div>

      <div class="payment-methods">
        <i class="fa-brands fa-cc-visa"></i>
        <i class="fa-brands fa-cc-mastercard"></i>
        <i class="fa-brands fa-cc-paypal"></i>
        <i class="fa-brands fa-cc-apple-pay"></i>
      </div>
    </aside>
  `;

  // Remove
  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      LuxeCart.remove(btn.dataset.key);
      luxeToast('Item removed from cart');
    });
  });

  // Qty buttons
  document.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = LuxeCart.get();
      const item = cart.find(i => i.key === btn.dataset.key);
      if (!item) return;
      const newQty = btn.dataset.action === 'plus' ? item.qty + 1 : item.qty - 1;
      if (newQty < 1) { LuxeCart.remove(btn.dataset.key); }
      else { LuxeCart.updateQty(btn.dataset.key, newQty); }
    });
  });
}

function applyCoupon() {
  const code = document.getElementById('couponInput').value.toUpperCase();
  const discounts = { 'LUXE20': 0.20, 'VIP30': 0.30, 'WELCOME10': 0.10 };
  if (discounts[code]) {
    const pct = discounts[code];
    const sub = LuxeCart.subtotal();
    const save = sub * pct;
    document.getElementById('discountLine').style.display = 'flex';
    document.getElementById('discountAmt').textContent = `−${fmt(save)}`;
    const newTotal = sub - save + (sub > 500 ? 0 : 25) + sub * 0.1;
    document.getElementById('totalAmt').textContent = fmt(newTotal);
    luxeToast(`Coupon applied! ${pct*100}% off 🎉`);
  } else {
    luxeToast('Invalid coupon code', 'info');
  }
}