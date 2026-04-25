/* ================================================
   LUXE STORE — Shared Data & Cart Engine
   store.js — Include on EVERY page
   ================================================ */

// ─── REAL PRODUCT DATA WITH UNSPLASH IMAGES ───
const LUXE_PRODUCTS = [

  // ── SHOES ──
  {
    id: 1, category: 'shoes',
    brand: 'Christian Louboutin', name: 'Louis Flat Loafer',
    price: 1250, originalPrice: null, badge: 'BESTSELLER',
    rating: 4.9, reviews: 1024,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=700&q=80',
    ],
    sizes: ['UK 7','UK 8','UK 9','UK 10','UK 11','UK 12'],
    colors: ['Midnight Black','Classic Brown','Nude Beige'],
    description: 'The iconic red-sole loafer. Handcrafted in full-grain Italian calfskin leather with the signature red lacquered outsole. A timeless investment in luxury footwear.',
    details: ['Full-grain Italian calfskin','Hand-stitched upper','Signature red sole','Leather lining','Rubber grip heel'],
    inStock: true, featured: true, hot: true
  },
  {
    id: 2, category: 'shoes',
    brand: 'Gucci', name: 'Horsebit 1953 Loafer',
    price: 990, originalPrice: 1200, badge: 'SALE',
    rating: 4.7, reviews: 632,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80',
    ],
    sizes: ['UK 7','UK 8','UK 9','UK 10','UK 11'],
    colors: ['Black','Cognac','Dark Brown'],
    description: 'The Gucci Horsebit loafer — a symbol of Italian style since 1953. Now crafted in rich leather with gold-toned metal hardware.',
    details: ['Smooth leather upper','Signature horsebit hardware','Leather sole','Made in Italy'],
    inStock: true, featured: true, hot: true
  },
  {
    id: 3, category: 'shoes',
    brand: 'Bottega Veneta', name: 'Intrecciato Mule',
    price: 820, originalPrice: null, badge: 'NEW',
    rating: 4.6, reviews: 289,
    image: 'https://images.unsplash.com/photo-1518894781321-630e638d0742?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1518894781321-630e638d0742?w=700&q=80',
    ],
    sizes: ['UK 8','UK 9','UK 10','UK 11'],
    colors: ['Espresso','Black','Caramel'],
    description: 'The iconic Intrecciato weave rendered in buttery calfskin. Effortlessly refined for the modern gentleman.',
    details: ['Intrecciato woven calfskin','Block heel','Leather lining','Rubber sole'],
    inStock: true, featured: false, hot: true
  },

  // ── PERFUMES ──
  {
    id: 4, category: 'perfumes',
    brand: 'Tom Ford', name: 'Oud Wood EDP 100ml',
    price: 320, originalPrice: null, badge: 'HOT',
    rating: 5.0, reviews: 2048,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683702?w=700&q=80',
    ],
    sizes: ['50ml','100ml','250ml'],
    colors: [],
    description: 'Rare oud wood is blended with sandalwood, Chinese pepper, and amber. An intoxicating composition that transcends gender and definition.',
    details: ['Top: Chinese Pepper, Oud Wood','Heart: Sandalwood, Rosewood','Base: Amber, Vetiver','Concentration: EDP','Longevity: 12+ hours'],
    inStock: true, featured: true, hot: true
  },
  {
    id: 5, category: 'perfumes',
    brand: 'Creed', name: 'Aventus EDP 100ml',
    price: 525, originalPrice: null, badge: 'BESTSELLER',
    rating: 4.9, reviews: 3201,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683702?w=700&q=80',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&q=80',
    ],
    sizes: ['50ml','100ml','250ml'],
    colors: [],
    description: 'Celebrating strength, vision, and success, Aventus features fruity top notes with a rich, smoky base for the modern warrior.',
    details: ['Top: Blackcurrant, Bergamot, Pineapple','Heart: Birch, Rose, Jasmine','Base: Oakmoss, Ambergris, Musk'],
    inStock: true, featured: true, hot: true
  },
  {
    id: 6, category: 'perfumes',
    brand: 'Maison Margiela', name: 'Replica Jazz Club',
    price: 185, originalPrice: 220, badge: 'SALE',
    rating: 4.7, reviews: 891,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&q=80',
    ],
    sizes: ['30ml','100ml'],
    colors: [],
    description: 'The smell of a jazz club: rum, tobacco leaf, and vetiver evoke the atmosphere of a smoky underground bar.',
    details: ['Top: Pink Pepper, Neroli, Lemon','Heart: Clary Sage, Musk','Base: Tobacco Leaf, Vanilla, Vetiver'],
    inStock: true, featured: false, hot: false
  },

  // ── WATCHES ──
  {
    id: 7, category: 'watches',
    brand: 'Rolex', name: 'Submariner Date',
    price: 12500, originalPrice: 14200, badge: 'SALE',
    rating: 5.0, reviews: 512,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&q=80',
      'https://images.unsplash.com/photo-1533139143976-30918502d57a?w=700&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Black Dial','Blue Dial','Green Dial'],
    description: 'The Submariner Date — the ultimate diver\'s watch. Water-resistant to 300m, with self-winding movement and Oyster bracelet.',
    details: ['Oystersteel case','Unidirectional rotatable bezel','Water-resistant 300m','Perpetual movement','Certified Superlative Chronometer'],
    inStock: true, featured: true, hot: true
  },
  {
    id: 8, category: 'watches',
    brand: 'Patek Philippe', name: 'Calatrava 5196',
    price: 32000, originalPrice: null, badge: 'EXCLUSIVE',
    rating: 5.0, reviews: 198,
    image: 'https://images.unsplash.com/photo-1533139143976-30918502d57a?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1533139143976-30918502d57a?w=700&q=80',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=700&q=80',
    ],
    sizes: ['One Size'],
    colors: ['White Gold','Yellow Gold','Rose Gold'],
    description: 'The Calatrava embodies Patek Philippe\'s purist philosophy. Clean dial, ultra-thin case — a masterclass in watchmaking.',
    details: ['18k White Gold case','Manual-winding Caliber 215 PS','38mm diameter','Sapphire crystal','Alligator strap'],
    inStock: true, featured: true, hot: false
  },
  {
    id: 9, category: 'watches',
    brand: 'Audemars Piguet', name: 'Royal Oak 15500',
    price: 28000, originalPrice: null, badge: 'NEW',
    rating: 4.9, reviews: 342,
    image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=700&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Blue','Silver','Black'],
    description: 'The iconic Royal Oak — Gerald Genta\'s revolutionary 1972 design. The octagonal bezel with exposed screws redefined luxury watchmaking.',
    details: ['Stainless steel case','Self-winding Caliber 4302','41mm diameter','Integrated bracelet','200m water resistant'],
    inStock: true, featured: false, hot: true
  },

  // ── ACCESSORIES ──
  {
    id: 10, category: 'accessories',
    brand: 'Cartier', name: 'Santos Sunglasses',
    price: 890, originalPrice: null, badge: null,
    rating: 4.6, reviews: 156,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Gold/Black','Silver/Grey','Gold/Brown'],
    description: 'The Santos sunglasses draw inspiration from the legendary Santos watch collection. Premium acetate frame with gold-toned hardware.',
    details: ['Premium acetate frame','Gold-toned metal hardware','UV400 protection','Scratch-resistant lenses','Includes luxury case'],
    inStock: true, featured: false, hot: false
  },
  {
    id: 11, category: 'accessories',
    brand: 'Hermès', name: 'Silk Pocket Square',
    price: 185, originalPrice: null, badge: 'HOT',
    rating: 4.8, reviews: 423,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Navy Blue','Burgundy','Forest Green','Ivory'],
    description: '100% pure silk twill, hand-rolled hem. Each Hermès square is designed by an artist and printed with exceptional precision.',
    details: ['100% silk twill','Hand-rolled edges','Printed in France','45x45cm','Comes in iconic orange box'],
    inStock: true, featured: false, hot: true
  },
  {
    id: 12, category: 'accessories',
    brand: 'Louis Vuitton', name: 'Damier Card Holder',
    price: 345, originalPrice: null, badge: 'NEW',
    rating: 4.7, reviews: 287,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Ebene','Graphite'],
    description: 'The Damier Graphite canvas card holder — understated luxury for the discerning gentleman. Slim profile, maximum impact.',
    details: ['Damier Graphite canvas','4 card slots','Microfiber lining','Gilded finishes','Comes with dustbag'],
    inStock: true, featured: false, hot: false
  },
];

/* ================================================
   CART ENGINE
   ================================================ */
const LuxeCart = {
  get() {
    return JSON.parse(localStorage.getItem('luxe_cart') || '[]');
  },
  save(cart) {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  },
  add(productId, size, color, qty = 1) {
    const cart = this.get();
    const product = LUXE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const key = `${productId}-${size}-${color}`;
    const existing = cart.find(i => i.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ key, productId, size, color, qty,
        name: product.name, brand: product.brand,
        price: product.price, image: product.image });
    }
    this.save(cart);
    return true;
  },
  remove(key) {
    const cart = this.get().filter(i => i.key !== key);
    this.save(cart);
  },
  updateQty(key, qty) {
    const cart = this.get();
    const item = cart.find(i => i.key === key);
    if (item) { item.qty = Math.max(1, qty); this.save(cart); }
  },
  clear() { localStorage.removeItem('luxe_cart'); this.updateBadge(); },
  count() { return this.get().reduce((sum, i) => sum + i.qty, 0); },
  subtotal() { return this.get().reduce((sum, i) => sum + i.price * i.qty, 0); },
  updateBadge() {
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = this.count();
  }
};

/* ================================================
   WISHLIST ENGINE
   ================================================ */
const LuxeWishlist = {
  get() { return JSON.parse(localStorage.getItem('luxe_wishlist') || '[]'); },
  toggle(id) {
    let list = this.get();
    const idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1); else list.push(id);
    localStorage.setItem('luxe_wishlist', JSON.stringify(list));
    return idx === -1;
  },
  has(id) { return this.get().includes(id); }
};

/* ================================================
   SHARED NAVBAR HTML — paste into every page
   ================================================ */
function renderNavbar() {
  const nav = document.getElementById('header');
  if (!nav) return;
  LuxeCart.updateBadge();
}

// Init on every page
document.addEventListener('DOMContentLoaded', () => {
  LuxeCart.updateBadge();

  // Sticky header
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
  }

  // Back to top
  const btt = document.getElementById('backToTop');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Format price
function fmt(price) {
  return price >= 1000
    ? '$' + price.toLocaleString()
    : '$' + price.toFixed(0);
}

// Star HTML
function stars(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) s += '<i class="fa-solid fa-star"></i>';
    else if (i - rating < 1) s += '<i class="fa-solid fa-star-half-stroke"></i>';
    else s += '<i class="fa-regular fa-star"></i>';
  }
  return s;
}

// Toast
function luxeToast(msg, type = 'success') {
  const old = document.querySelector('.luxe-toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'luxe-toast';
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check' : 'info'}"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}