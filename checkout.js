/* ================================================
   CHECKOUT — js/checkout.js
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const cart = LuxeCart.get();
  if (cart.length === 0) { window.location = 'cart.html'; return; }

  const subtotal = LuxeCart.subtotal();
  let shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.1;

  // ── RENDER ORDER SUMMARY ──
  function renderSummary() {
    const total = subtotal + shipping + tax;
    document.getElementById('checkoutSummary').innerHTML = `
      <div class="summary-items-header">Order Summary (${cart.length} items)</div>
      ${cart.map(item => `
        <div class="summary-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="summary-item-info">
            <span class="summary-item-brand">${item.brand}</span>
            <div class="summary-item-name">${item.name}</div>
            <div class="summary-item-meta">
              ${item.size !== 'One Size' ? item.size : ''}
              ${item.color !== 'Default' ? `· ${item.color}` : ''}
              · Qty: ${item.qty}
            </div>
          </div>
          <span class="summary-item-price">${fmt(item.price * item.qty)}</span>
        </div>
      `).join('')}
      <div class="summary-totals">
        <div class="summary-line"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--gold)">FREE</span>' : fmt(shipping)}</span></div>
        <div class="summary-line"><span>Tax (10%)</span><span>${fmt(tax)}</span></div>
        <div class="summary-grand">
          <span>Total</span><span>${fmt(total)}</span>
        </div>
      </div>`;
  }

  renderSummary();

  // ── SHIPPING METHOD ──
  document.querySelectorAll('input[name="shipping"]').forEach(r => {
    r.addEventListener('change', () => {
      shipping = r.value === 'express' ? 25 : (subtotal > 500 ? 0 : 25);
      renderSummary();
    });
  });

  // ── PAYMENT TABS ──
  const forms = { card: 'cardForm', paypal: 'paypalForm', bank: 'bankForm', cod: 'codForm' };
  document.querySelectorAll('.payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(forms).forEach(f => document.getElementById(f).style.display = 'none');
      document.getElementById(forms[tab.dataset.method]).style.display = 'block';
    });
  });

  // ── CARD NUMBER FORMAT ──
  document.getElementById('cardNum')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
  });

  // ── PLACE ORDER ──
  document.getElementById('placeOrderBtn')?.addEventListener('click', () => {
    if (!document.getElementById('agreeTerms').checked) {
      luxeToast('Please agree to Terms & Conditions', 'info'); return;
    }
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    for (const field of required) {
      if (!document.getElementById(field)?.value.trim()) {
        luxeToast('Please fill in all required fields', 'info');
        document.getElementById(field)?.focus();
        return;
      }
    }

    const btn = document.getElementById('placeOrderBtn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    // Simulate processing
    setTimeout(() => {
      const orderId = 'LX' + Date.now().toString().slice(-6);
      localStorage.setItem('luxe_last_order', JSON.stringify({
        id: orderId,
        items: cart,
        subtotal, shipping, tax,
        total: subtotal + shipping + tax,
        name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value + ', ' + document.getElementById('city').value,
        date: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
      }));
      LuxeCart.clear();
      window.location = 'order-success.html';
    }, 2000);
  });
});