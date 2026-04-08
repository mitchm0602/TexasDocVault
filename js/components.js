/* ── CART STATE ───────────────────────────────── */
let cartItems = JSON.parse(localStorage.getItem('tdv_cart') || '[]');

function saveCart() {
  localStorage.setItem('tdv_cart', JSON.stringify(cartItems));
}

function addToCart(id, name, price) {
  const existing = cartItems.find(i => i.id === id);
  if (existing) {
    showToast(`"${truncate(name, 30)}" is already in your cart.`);
    return;
  }
  cartItems.push({ id, name, price });
  saveCart();
  updateCartCount();
  showToast(`Added to cart: ${truncate(name, 34)}`);
  renderCartPanel();
}

function removeFromCart(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  saveCart();
  updateCartCount();
  renderCartPanel();
}

function cartTotal() {
  return cartItems.reduce((sum, i) => sum + i.price, 0);
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cartItems.length;
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}

/* ── TOAST ────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('cart-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── CART PANEL ───────────────────────────────── */
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
}

function renderCartPanel() {
  const body = document.getElementById('cart-body');
  if (!body) return;
  if (cartItems.length === 0) {
    body.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Browse documents to get started.</div>';
    document.getElementById('cart-total').textContent = '$0';
    return;
  }
  body.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
      <div class="cart-item-price">$${item.price}</div>
    </div>
  `).join('');
  document.getElementById('cart-total').textContent = `$${cartTotal()}`;
}

function proceedToCheckout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty. Add some templates first!');
    return;
  }
  alert(`Stripe checkout coming soon!\n\nYour total: $${cartTotal()}\nItems: ${cartItems.length}\n\nWe'll redirect you to secure payment when live.`);
}

/* ── HEADER HTML ──────────────────────────────── */
function headerHTML() {
  return `
  <header class="site-header">
    <a href="index.html" class="logo">
      <svg class="logo-icon" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="38" rx="7" fill="#bf4e0a"/>
        <polygon points="19,5 22.5,14.5 33,14.5 24.5,20.5 27.5,30.5 19,24.5 10.5,30.5 13.5,20.5 5,14.5 15.5,14.5" fill="white" opacity="0.92"/>
      </svg>
      <span class="logo-text">Texas<span>Doc</span>Vault</span>
    </a>
    <div class="header-right">
      <span class="header-tagline">Texas Construction Document Templates</span>
      <button class="cart-btn" onclick="openCart()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h1.5l1.8 7.5h7l1.2-5H4.5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="13.5" r="1.1" fill="white"/><circle cx="12" cy="13.5" r="1.1" fill="white"/></svg>
        Cart <span class="cart-count" id="cart-count">0</span>
      </button>
    </div>
  </header>`;
}

/* ── SIDEBAR HTML ─────────────────────────────── */
function sidebarHTML(activePage) {
  const links = [
    { page: 'home',     href: 'index.html',    label: 'Home',                icon: '<path d="M2 7L8 2l6 5v7H2V7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>' },
    { page: 'lien',     href: 'lien.html',     label: 'Lien Paperwork',      icon: '<rect x="3" y="1.5" width="10" height="13" rx="1" stroke="currentColor" stroke-width="1.3"/><line x1="5.5" y1="6" x2="10.5" y2="6" stroke="currentColor" stroke-width="1"/><line x1="5.5" y1="9" x2="10.5" y2="9" stroke="currentColor" stroke-width="1"/><line x1="5.5" y1="12" x2="8.5" y2="12" stroke="currentColor" stroke-width="1"/>' },
    { page: 'contract', href: 'contract.html', label: 'Contract Paperwork',  icon: '<rect x="3" y="1.5" width="10" height="13" rx="1" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5.5h5M5.5 8.5h5M5.5 11.5h3" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>' },
    { page: 'payment',  href: 'payment.html',  label: 'Payment Applications', icon: '<rect x="1.5" y="4" width="13" height="9" rx="1" stroke="currentColor" stroke-width="1.3"/><line x1="1.5" y1="7.5" x2="14.5" y2="7.5" stroke="currentColor" stroke-width="1"/><circle cx="5" cy="10.5" r="1" fill="currentColor"/>' },
    { page: 'safety',   href: 'safety.html',   label: 'Safety Paperwork',    icon: '<path d="M8 1.5l5.5 2.2V8c0 3.2-2.8 5.5-5.5 6C5.3 13.5 2.5 11.2 2.5 8V3.7l5.5-2.2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>' },
    { page: 'bundles',  href: 'bundles.html',  label: 'Bundles & Deals',     icon: '<rect x="1.5" y="1.5" width="5.5" height="5.5" rx=".5" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="1.5" width="5.5" height="5.5" rx=".5" stroke="currentColor" stroke-width="1.3"/><rect x="1.5" y="9" width="5.5" height="5.5" rx=".5" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="9" width="5.5" height="5.5" rx=".5" stroke="currentColor" stroke-width="1.3"/>' },
    { page: 'blog',     href: 'blog.html',     label: 'Blog',                icon: '<rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.3"/><line x1="5" y1="7" x2="11" y2="7" stroke="currentColor" stroke-width="1"/><line x1="5" y1="10" x2="9" y2="10" stroke="currentColor" stroke-width="1"/>' },
  ];

  const navLinks = links.map(l => {
    const isActive = l.page === activePage;
    const isDivider = l.page === 'bundles';
    return `${isDivider ? '<div class="sidebar-divider"></div><div class="sidebar-label" style="margin-top:.5rem">Resources</div>' : ''}
    <a href="${l.href}" class="nav-link${isActive ? ' active' : ''}">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">${l.icon}</svg>
      ${l.label}
    </a>`;
  });

  return `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-section">
      <div class="sidebar-label">Main</div>
      ${navLinks.slice(0,1).join('')}
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Documents</div>
      ${navLinks.slice(1,5).join('')}
    </div>
    ${navLinks.slice(5).join('')}
    <div class="sidebar-divider"></div>
    <div class="sidebar-promo">
      <div class="promo-title">Free Template</div>
      <div class="promo-body">Get a free Daily Work Log when you subscribe to updates.</div>
      <button class="promo-btn" onclick="alert('Newsletter signup coming soon! Enter your email to be notified at launch.')">Claim Free Template</button>
    </div>
  </aside>`;
}

/* ── CART OVERLAY HTML ────────────────────────── */
function cartOverlayHTML() {
  return `
  <div class="cart-overlay" id="cart-overlay" onclick="handleOverlayClick(event)">
    <div class="cart-panel">
      <h2>Your Cart <button class="cart-close" onclick="closeCart()">&#x2715;</button></h2>
      <div id="cart-body"></div>
      <div class="cart-total"><span>Total</span><span id="cart-total">$0</span></div>
      <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout →</button>
    </div>
  </div>`;
}

function handleOverlayClick(e) {
  if (e.target.id === 'cart-overlay') closeCart();
}

/* ── TOAST HTML ───────────────────────────────── */
function toastHTML() {
  return `<div class="cart-toast" id="cart-toast"></div>`;
}

/* ── FOOTER HTML ──────────────────────────────── */
function footerHTML() {
  return `
  <footer class="site-footer">
    <div>
      <div class="footer-brand">Texas<span>Doc</span>Vault</div>
      <div style="font-size:12px;margin-top:4px;opacity:.6">© ${new Date().getFullYear()} TexasDocVault.com · All Rights Reserved</div>
    </div>
    <div class="footer-links">
      <a href="index.html">Home</a>
      <a href="lien.html">Lien Paperwork</a>
      <a href="contract.html">Contracts</a>
      <a href="payment.html">Pay Apps</a>
      <a href="safety.html">Safety</a>
      <a href="bundles.html">Bundles</a>
      <a href="blog.html">Blog</a>
    </div>
    <p class="footer-note">All templates are for informational purposes only. These documents do not constitute legal advice. Consult a licensed Texas attorney for legal guidance specific to your situation.</p>
  </footer>`;
}

/* ── PRODUCT CARD RENDERER ────────────────────── */
function productCardHTML(p) {
  const isXL = p.fmt === 'XLSX';
  return `
  <div class="product-card">
    <div class="product-icon ${isXL ? 'icon-xlsx' : 'icon-pdf'}">${p.fmt}</div>
    <div class="product-name">${p.name}</div>
    <div class="product-desc">${p.desc}</div>
    <div class="product-footer">
      <span class="product-price">$${p.price} <span class="fmt-badge ${isXL ? 'fmt-xlsx' : 'fmt-pdf'}">${p.fmt}</span></span>
      <button class="btn-add" onclick="addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', ${p.price})">Add to Cart</button>
    </div>
  </div>`;
}

/* ── BUNDLE CARD RENDERER ─────────────────────── */
function bundleCardHTML(b) {
  return `
  <div class="bundle-card">
    <div class="bundle-badge">${b.badge}</div>
    <div class="bundle-name">${b.name}</div>
    <div class="bundle-includes">${b.includes}</div>
    <div class="bundle-footer">
      <div class="bundle-price">
        <div class="bundle-price-main">$${b.price}</div>
        <div class="bundle-price-save">Save $${b.was - b.price} vs. individual</div>
      </div>
      <button class="btn-bundle" onclick="addToCart('${b.id}', '${b.name.replace(/'/g, "\\'")}', ${b.price})">Buy Bundle</button>
    </div>
  </div>`;
}

/* ── BLOG CARD RENDERER ───────────────────────── */
function blogCardHTML(post) {
  return `
  <div class="blog-card">
    <div class="blog-card-img">
      <div class="blog-cat-badge">${post.cat}</div>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.12">
        <polygon points="30,5 36,22 54,22 40,33 45,50 30,40 15,50 20,33 6,22 24,22" fill="white"/>
      </svg>
    </div>
    <div class="blog-card-body">
      <div class="blog-card-title">${post.title}</div>
      <div class="blog-card-excerpt">${post.excerpt}</div>
      <div class="blog-card-meta">
        <span>${post.date} &middot; ${post.read} read</span>
        <a href="blog.html" class="read-more-link">Read more →</a>
      </div>
    </div>
  </div>`;
}

/* ── INIT ─────────────────────────────────────── */
function initPage(activePage) {
  // Inject shared components
  document.getElementById('site-header').innerHTML   = headerHTML();
  document.getElementById('site-sidebar').innerHTML  = sidebarHTML(activePage);
  document.getElementById('site-footer').innerHTML   = footerHTML();
  document.getElementById('cart-overlay-slot').innerHTML = cartOverlayHTML();
  document.getElementById('toast-slot').innerHTML    = toastHTML();

  updateCartCount();
  renderCartPanel();
}
