/* ================================================
   SHOP PAGE — js/shop.js
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  let filtered = [...LUXE_PRODUCTS];
  let currentPage = 1;
  const PER_PAGE = 9;

  // URL param category
  const urlCat = new URLSearchParams(location.search).get('cat');
  if (urlCat) {
    document.querySelector(`input[name="cat"][value="${urlCat}"]`).checked = true;
    document.getElementById('breadcrumbCat').textContent =
      urlCat.charAt(0).toUpperCase() + urlCat.slice(1);
  }

  // ── FILTER & SORT ──
  function applyFilters() {
    const cat = document.querySelector('input[name="cat"]:checked')?.value || 'all';
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || 0);
    const search = document.getElementById('shopSearch').value.toLowerCase();
    const sort = document.getElementById('sortSelect').value;
    const inStockOnly = document.getElementById('inStockOnly').checked;
    const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')].map(c => c.value);

    filtered = LUXE_PRODUCTS.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && !p.inStock) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (search && !p.name.toLowerCase().includes(search) &&
          !p.brand.toLowerCase().includes(search)) return false;
      return true;
    });

    // Sort
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    currentPage = 1;
    renderGrid();
    renderPagination();
    updateActiveFilters();
    document.getElementById('resultsCount').textContent = `${filtered.length} Product${filtered.length !== 1 ? 's' : ''}`;
    document.getElementById('noResults').style.display = filtered.length ? 'none' : 'block';
  }

  // ── RENDER GRID ──
  function renderGrid() {
    const grid = document.getElementById('shopGrid');
    const start = (currentPage - 1) * PER_PAGE;
    const page = filtered.slice(start, start + PER_PAGE);

    grid.innerHTML = page.map(p => `
      <div class="prod-card reveal" data-id="${p.id}">
        ${p.badge ? `<div class="prod-card-badge ${p.badge === 'SALE' ? 'sale' : p.badge === 'NEW' ? 'new' : p.badge === 'EXCLUSIVE' ? 'ex' : ''}">${p.badge}</div>` : ''}
        <div class="prod-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="prod-card-actions">
            <button class="prod-action-btn wl-btn ${LuxeWishlist.has(p.id) ? 'wishlisted' : ''}"
              data-id="${p.id}" title="Wishlist">
              <i class="fa-${LuxeWishlist.has(p.id) ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <button class="prod-action-btn" onclick="window.location='product.html?id=${p.id}'" title="Quick View">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button class="prod-action-btn cart-quick" data-id="${p.id}" title="Add to Cart">
              <i class="fa-solid fa-bag-shopping"></i>
            </button>
          </div>
        </div>
        <div class="prod-card-info">
          <span class="prod-card-brand">${p.brand}</span>
          <h3 class="prod-card-name">
            <a href="product.html?id=${p.id}">${p.name}</a>
          </h3>
          <div class="prod-card-rating">
            ${stars(p.rating)}
            <span>(${p.reviews.toLocaleString()})</span>
          </div>
          <div class="prod-card-price">
            <span class="prod-price-now">${fmt(p.price)}</span>
            ${p.originalPrice ? `<span class="prod-price-was">${fmt(p.originalPrice)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Reveal
    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 50);

    // Wishlist buttons
    grid.querySelectorAll('.wl-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const added = LuxeWishlist.toggle(id);
        btn.innerHTML = `<i class="fa-${added ? 'solid' : 'regular'} fa-heart"></i>`;
        btn.classList.toggle('wishlisted', added);
        luxeToast(added ? 'Added to Wishlist ♥' : 'Removed from Wishlist');
      });
    });

    // Quick add to cart
    grid.querySelectorAll('.cart-quick').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const p = LUXE_PRODUCTS.find(p => p.id === parseInt(btn.dataset.id));
        if (p) {
          LuxeCart.add(p.id, p.sizes[0] || 'One Size', p.colors[0] || 'Default');
          luxeToast(`${p.name} added to cart 🛒`);
        }
      });
    });

    // Card click → product page
    grid.querySelectorAll('.prod-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        window.location = `product.html?id=${card.dataset.id}`;
      });
    });
  }

  // ── PAGINATION ──
  function renderPagination() {
    const total = Math.ceil(filtered.length / PER_PAGE);
    const pag = document.getElementById('pagination');
    if (total <= 1) { pag.innerHTML = ''; return; }
    pag.innerHTML = '';
    for (let i = 1; i <= total; i++) {
      const btn = document.createElement('button');
      btn.className = `page-btn${i === currentPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => {
        currentPage = i;
        renderGrid();
        renderPagination();
        window.scrollTo({ top: 300, behavior: 'smooth' });
      });
      pag.appendChild(btn);
    }
  }

  // ── ACTIVE FILTER TAGS ──
  function updateActiveFilters() {
    const container = document.getElementById('activeFilters');
    container.innerHTML = '';
    const cat = document.querySelector('input[name="cat"]:checked')?.value;
    if (cat && cat !== 'all') addTag(container, cat, () => {
      document.querySelector('input[name="cat"][value="all"]').checked = true;
      applyFilters();
    });
    const brands = [...document.querySelectorAll('input[name="brand"]:checked')];
    brands.forEach(b => addTag(container, b.value, () => { b.checked = false; applyFilters(); }));
    const maxP = document.getElementById('priceRange').value;
    if (maxP < 50000) addTag(container, `Under ${fmt(maxP)}`, () => {
      document.getElementById('priceRange').value = 50000;
      applyFilters();
    });
  }

  function addTag(container, label, onRemove) {
    const t = document.createElement('div');
    t.className = 'filter-tag';
    t.innerHTML = `${label} <button>×</button>`;
    t.querySelector('button').addEventListener('click', onRemove);
    container.appendChild(t);
  }

  // ── EVENTS ──
  document.querySelectorAll('input[name="cat"], input[name="brand"], input[name="rating"], #inStockOnly, #sortSelect')
    .forEach(el => el.addEventListener('change', applyFilters));

  document.getElementById('shopSearch').addEventListener('input', applyFilters);

  document.getElementById('priceRange').addEventListener('input', e => {
    document.getElementById('priceVal').textContent = fmt(e.target.value);
    applyFilters();
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    document.querySelector('input[name="cat"][value="all"]').checked = true;
    document.getElementById('priceRange').value = 50000;
    document.getElementById('priceVal').textContent = '$50,000';
    document.getElementById('shopSearch').value = '';
    document.getElementById('sortSelect').value = 'featured';
    document.getElementById('inStockOnly').checked = false;
    document.querySelectorAll('input[name="brand"]').forEach(c => c.checked = false);
    document.querySelectorAll('input[name="rating"]')[0].checked = true;
    applyFilters();
  });

  // View toggle (grid/list)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('shopGrid').className = `shop-grid${btn.dataset.view === 'list' ? ' list-view' : ''}`;
    });
  });

  // Mobile sidebar toggle
  document.getElementById('filterToggle')?.addEventListener('click', () => {
    document.getElementById('shopSidebar').classList.toggle('open');
  });

  // Init
  applyFilters();
});