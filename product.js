/* ================================================
   PRODUCT DETAIL — js/product.js
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const p = LUXE_PRODUCTS.find(x => x.id === id);

  if (!p) { window.location = 'shop.html'; return; }

  // Set page title
  document.title = `${p.name} — LUXE`;

  // Breadcrumb
  document.getElementById('prodBreadcrumbCat').textContent =
    p.category.charAt(0).toUpperCase() + p.category.slice(1);

  // ── RENDER PRODUCT ──
  let selSize = p.sizes[0] || 'One Size';
  let selColor = p.colors[0] || 'Default';
  let qty = 1;
  let mainImg = p.image;

  document.getElementById('productLayout').innerHTML = `
    <div class="prod-gallery">
      <div class="prod-main-img">
        <img src="${mainImg}" alt="${p.name}" id="mainImg">
        <div class="prod-zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> Hover to zoom</div>
      </div>
      <div class="prod-thumbs">
        ${p.images.map((img, i) => `
          <div class="prod-thumb ${i === 0 ? 'active' : ''}" data-img="${img}">
            <img src="${img}" alt="${p.name} ${i+1}">
          </div>
        `).join('')}
      </div>
    </div>

    <div class="prod-info">
      <span class="prod-info-brand">${p.brand}</span>
      <h1 class="prod-info-name">${p.name}</h1>

      <div class="prod-info-rating">
        <div class="stars">${stars(p.rating)}</div>
        <span>${p.rating} (${p.reviews.toLocaleString()} reviews)</span>
        <button class="write-review" onclick="switchTab('reviews')">Write a Review</button>
      </div>

      <div class="prod-info-price">
        <span class="prod-price-big">${fmt(p.price)}</span>
        ${p.originalPrice ? `
          <span class="prod-price-original">${fmt(p.originalPrice)}</span>
          <span class="prod-price-save">Save ${fmt(p.originalPrice - p.price)}</span>
        ` : ''}
      </div>

      ${p.sizes.length > 1 ? `
      <div class="prod-option">
        <span class="prod-option-label">Size <span id="selSizeLabel">${selSize}</span></span>
        <div class="size-grid">
          ${p.sizes.map((s, i) => `
            <button class="size-btn ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
          `).join('')}
        </div>
      </div>` : ''}

      ${p.colors.length > 0 ? `
      <div class="prod-option">
        <span class="prod-option-label">Color <span id="selColorLabel">${selColor}</span></span>
        <div class="color-grid">
          ${p.colors.map((c, i) => `
            <button class="color-btn ${i === 0 ? 'active' : ''}" data-color="${c}">${c}</button>
          `).join('')}
        </div>
      </div>` : ''}

      <div class="prod-option">
        <span class="prod-option-label">Quantity</span>
        <div class="qty-row">
          <div class="qty-control">
            <button class="qty-btn" id="qtyMinus">−</button>
            <input class="qty-input" type="number" value="1" min="1" max="10" id="qtyInput" readonly>
            <button class="qty-btn" id="qtyPlus">+</button>
          </div>
          <span style="font-size:0.75rem; color:var(--grey);">${p.inStock ? '✓ In Stock' : '✗ Out of Stock'}</span>
        </div>
      </div>

      <div class="prod-cta">
        <button class="btn-add-cart" id="addToCartBtn">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
        <button class="btn-buy-now" id="buyNowBtn">
          Buy Now — Checkout Instantly
        </button>
      </div>

      <div class="trust-badges">
        <div class="trust-item">
          <i class="fa-solid fa-shield-halved"></i>
          <span>100% Authentic Guarantee</span>
        </div>
        <div class="trust-item">
          <i class="fa-solid fa-rotate-left"></i>
          <span>30-Day Free Returns</span>
        </div>
        <div class="trust-item">
          <i class="fa-solid fa-truck-fast"></i>
          <span>Express Worldwide Delivery</span>
        </div>
      </div>
    </div>
  `;

  // ── THUMBNAIL CLICKS ──
  document.querySelectorAll('.prod-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.prod-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      document.getElementById('mainImg').src = thumb.dataset.img;
    });
  });

  // ── SIZE SELECTION ──
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selSize = btn.dataset.size;
      const lbl = document.getElementById('selSizeLabel');
      if (lbl) lbl.textContent = selSize;
    });
  });

  // ── COLOR SELECTION ──
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selColor = btn.dataset.color;
      const lbl = document.getElementById('selColorLabel');
      if (lbl) lbl.textContent = selColor;
    });
  });

  // ── QTY ──
  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    document.getElementById('qtyInput').value = qty;
  });
  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    document.getElementById('qtyInput').value = qty;
  });

  // ── ADD TO CART ──
  document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    LuxeCart.add(p.id, selSize, selColor, qty);
    luxeToast(`${p.name} added to cart 🛒`);
    const btn = document.getElementById('addToCartBtn');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Cart!';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
      btn.style.background = '';
    }, 2000);
  });

  // ── BUY NOW ──
  document.getElementById('buyNowBtn')?.addEventListener('click', () => {
    LuxeCart.add(p.id, selSize, selColor, qty);
    window.location = 'checkout.html';
  });

  // ── TABS ──
  const tabContents = {
    description: `<p style="max-width:700px">${p.description}</p>`,
    details: `<ul style="list-style:none;display:flex;flex-direction:column;gap:10px;">
      ${p.details.map(d => `<li style="display:flex;align-items:center;gap:10px;">
        <i class="fa-solid fa-check" style="color:var(--gold);font-size:0.7rem"></i> ${d}
      </li>`).join('')}
    </ul>`,
    reviews: renderReviews(p),
    shipping: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:700px">
        <div><h4 style="font-family:var(--font-heading);margin-bottom:8px;font-size:1.1rem">Standard Delivery</h4>
          <p style="color:var(--grey);font-size:0.82rem">5–7 business days<br><strong style="color:var(--gold)">Free over $200</strong></p></div>
        <div><h4 style="font-family:var(--font-heading);margin-bottom:8px;font-size:1.1rem">Express Delivery</h4>
          <p style="color:var(--grey);font-size:0.82rem">2–3 business days<br><strong style="color:var(--gold)">$25 flat rate</strong></p></div>
        <div><h4 style="font-family:var(--font-heading);margin-bottom:8px;font-size:1.1rem">Returns</h4>
          <p style="color:var(--grey);font-size:0.82rem">Free 30-day returns<br>Original packaging required</p></div>
      </div>`
  };

  function switchTab(tab) {
    document.querySelectorAll('.prod-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.getElementById('prodTabContent').innerHTML = tabContents[tab];
  }

  document.querySelectorAll('.prod-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  window.switchTab = switchTab;
  switchTab('description');

  // ── RELATED ──
  const related = LUXE_PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById('relatedGrid').innerHTML = related.map(r => `
    <div class="prod-card" onclick="window.location='product.html?id=${r.id}'" style="cursor:pointer">
      ${r.badge ? `<div class="prod-card-badge">${r.badge}</div>` : ''}
      <div class="prod-card-img" style="height:220px">
        <img src="${r.image}" alt="${r.name}" loading="lazy">
      </div>
      <div class="prod-card-info">
        <span class="prod-card-brand">${r.brand}</span>
        <h4 class="prod-card-name">${r.name}</h4>
        <div class="prod-card-price">
          <span class="prod-price-now">${fmt(r.price)}</span>
        </div>
      </div>
    </div>
  `).join('');
});

function renderReviews(p) {
  const reviewsData = [
    { name: 'Ahmed K.', city: 'Lahore', rating: 5, date: 'March 2025', text: 'Absolutely stunning quality. Every detail is perfect. Worth every penny.' },
    { name: 'Marcus R.', city: 'Dubai', rating: 5, date: 'February 2025', text: 'Delivered in impeccable condition. LUXE packaging is itself a luxury experience.' },
    { name: 'James A.', city: 'London', rating: 4, date: 'January 2025', text: 'Exactly as described. Authenticity verified. Will order again without hesitation.' },
  ];
  return `
    <div style="display:flex;flex-direction:column;gap:28px;max-width:700px">
      ${reviewsData.map(r => `
        <div style="padding:24px;background:var(--dark-2);border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div>
              <div style="display:flex;gap:4px;margin-bottom:6px">
                ${stars(r.rating)}
              </div>
              <strong style="font-size:0.85rem">${r.name}</strong>
              <span style="color:var(--grey);font-size:0.75rem;margin-left:8px">${r.city}</span>
            </div>
            <span style="font-size:0.72rem;color:var(--grey)">${r.date}</span>
          </div>
          <p style="font-size:0.85rem;color:var(--white-80);line-height:1.7">${r.text}</p>
        </div>
      `).join('')}
    </div>
  `;
}