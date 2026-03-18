/* ============================================
   CART.JS — Shows only items added via
   "Add to Cart" from product detail page
============================================ */

// Read cart from localStorage — no hardcoded defaults
let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

document.addEventListener('DOMContentLoaded', () => {
    if (cartItems.length === 0) {
        showEmptyCart();
        updatePriceDetails();
        return;
    }
    renderCartItems();
    updatePriceDetails();
    initializeEventListeners();
});

/* ── Render all cart items ── */
function renderCartItems() {
    const container = document.getElementById('cartItemsList');
    if (!container) return;
    container.innerHTML = '';

    cartItems.forEach((item, index) => {
        const originalPrice = item.originalPrice || Math.round(item.price * 1.25);
        const discount      = Math.round(((originalPrice - item.price) / originalPrice) * 100);

        const card = document.createElement('div');
        card.className = 'cart-item-card';
        card.innerHTML = `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-color">${item.color || 'Default'}</p>
                    <p class="item-seller">
                        Seller: ${item.seller || 'E-Commerce Retail'}
                        <span class="assured-badge">✓ Assured</span>
                    </p>
                    <div class="item-pricing">
                        <span class="item-price">₹${item.price.toLocaleString('en-IN')}</span>
                        <span class="item-original-price">₹${originalPrice.toLocaleString('en-IN')}</span>
                        <span class="item-discount">${discount}% Off</span>
                    </div>
                    <p class="delivery-date">
                        Delivery by <strong>${item.delivery || 'Within 3–5 days'}</strong>
                    </p>
                </div>
            </div>
            <div class="item-actions">
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                    <input class="qty-value" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                </div>
                <button class="btn-save">SAVE FOR LATER</button>
                <button class="btn-remove" onclick="removeItem(${index})">REMOVE</button>
            </div>
        `;
        container.appendChild(card);
    });
}

/* ── Price summary ── */
function updatePriceDetails() {
    let totalItems         = 0;
    let totalPrice         = 0;
    let totalOriginalPrice = 0;

    cartItems.forEach(item => {
        totalItems         += item.quantity;
        totalPrice         += item.price * item.quantity;
        totalOriginalPrice += (item.originalPrice || Math.round(item.price * 1.25)) * item.quantity;
    });

    const platformFee = cartItems.length > 0 ? 7 : 0;
    const discount    = totalOriginalPrice - totalPrice;

    document.getElementById('itemCount').textContent       = totalItems;
    document.getElementById('itemPlural').style.display    = totalItems === 1 ? 'none' : 'inline';
    document.getElementById('totalPrice').textContent      = `₹${totalOriginalPrice.toLocaleString('en-IN')}`;
    document.getElementById('totalDiscount').textContent   = `−₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('platformFee').textContent     = `₹${platformFee}`;
    document.getElementById('totalAmount').textContent     = `₹${(totalPrice + platformFee).toLocaleString('en-IN')}`;
    document.getElementById('savingsMessage').textContent  = discount > 0
        ? `You will save ₹${discount.toLocaleString('en-IN')} on this order`
        : 'Enjoy your shopping!';
}

/* ── Quantity controls ── */
function increaseQty(index) {
    cartItems[index].quantity++;
    syncCart();
}

function decreaseQty(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        syncCart();
    }
}

/* ── Remove item ── */
function removeItem(index) {
    cartItems.splice(index, 1);
    syncCart();
    if (cartItems.length === 0) showEmptyCart();
}

/* ── Sync to localStorage and re-render ── */
function syncCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
    updatePriceDetails();
}

/* ── Empty cart UI ── */
function showEmptyCart() {
    const container = document.getElementById('cartItemsList');
    if (!container) return;
    container.innerHTML = `
        <div style="background:#fff;padding:60px 40px;border-radius:6px;
                    box-shadow:0 1px 1px rgba(0,0,0,.08);text-align:center;color:#878787;">
            <i class="fa-solid fa-cart-shopping" style="font-size:64px;color:#e0e0e0;margin-bottom:20px;display:block;"></i>
            <h3 style="font-size:20px;margin-bottom:8px;color:#212121;">Your cart is empty</h3>
            <p style="margin-bottom:24px;font-size:14px;">Add items to it now.</p>
            <button onclick="window.location.href='home.html'"
                style="padding:12px 40px;background:#2874f0;color:#fff;border:none;
                       border-radius:4px;cursor:pointer;font-size:15px;font-weight:600;">
                Shop Now
            </button>
        </div>`;
}

/* ── Pincode button ── */
function initializeEventListeners() {
    const pincodeBtn = document.querySelector('.btn-link');
    if (pincodeBtn) {
        pincodeBtn.onclick = () => {
            const pin = prompt('Enter delivery pincode');
            if (pin && pin.length === 6) alert(`Delivery available for ${pin}`);
        };
    }
}