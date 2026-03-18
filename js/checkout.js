/* ============================================================
   CHECKOUT.JS — Platform fee, no hardcoded values
============================================================ */

const PLATFORM_FEE = 7;

let cartItems = [], savedAddresses = [], selectedAddressId = null, currentStep = 2;

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
    loadCartFromLocalStorage();
    loadSampleData();
    initFeesToggle();
    showLoggedInUser();
    setTimeout(() => { renderOrderItems(); updatePriceDetails(); }, 0);
});

/* ── Show logged-in user in Step 1 ── */
function showLoggedInUser() {
    const user = localStorage.getItem('user');
    const loginInfo = document.querySelector('.login-info p');
    if (loginInfo) {
        loginInfo.innerHTML = user
            ? `<strong>${user}</strong>`
            : `<strong>Guest</strong> — <a href="login.html" style="color:#2874f0;">Login</a>`;
    }
}

/* ── LocalStorage ── */
function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('cart');
    if (!saved) { cartItems = []; return; }
    try {
        cartItems = JSON.parse(saved);
        if (!Array.isArray(cartItems)) throw new Error('Not array');
    } catch (err) { cartItems = []; }
}

function saveCartToLocalStorage() {
    try { localStorage.setItem('cart', JSON.stringify(cartItems)); }
    catch (e) { console.error('Save cart error:', e); }
}

function loadAddressesFromLocalStorage() {
    try { return JSON.parse(localStorage.getItem('savedAddresses') || '[]'); }
    catch (e) { return []; }
}

function saveAddressesToLocalStorage() {
    try { localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses)); }
    catch (e) { console.error('Save addresses error:', e); }
}

/* ── Init ── */
function initCheckout() {
    document.getElementById('add-address-btn').addEventListener('click', showAddressForm);
    document.getElementById('cancel-address-btn').addEventListener('click', hideAddressForm);
    document.getElementById('address-form').addEventListener('submit', handleAddressSave);
    document.getElementById('continue-btn').addEventListener('click', proceedToPayment);
    document.getElementById('change-login-btn').addEventListener('click', handleChangeLogin);
    const addressChangeBtn = document.getElementById('address-change-btn');
    if (addressChangeBtn) addressChangeBtn.addEventListener('click', handleChangeAddress);
}

function loadSampleData() {
    const loaded = loadAddressesFromLocalStorage();
    if (loaded.length > 0) savedAddresses = loaded;
    renderSavedAddresses();
    renderOrderItems();
    updatePriceDetails();
}

/* ── Address Management ── */
function renderSavedAddresses() {
    const container = document.getElementById('saved-addresses');
    container.innerHTML = '';
    if (savedAddresses.length === 0) return;

    savedAddresses.forEach((addr, i) => {
        const card = document.createElement('div');
        card.className = 'address-card' + (i === 0 ? ' selected' : '');
        if (i === 0) selectedAddressId = addr.id;

        card.innerHTML = `
            <div class="address-radio">
                <input type="radio" name="address" id="addr-${addr.id}" ${i === 0 ? 'checked' : ''} data-address-id="${addr.id}">
                <div class="address-details">
                    <span class="address-type-badge">${addr.type.toUpperCase()}</span>
                    <div class="address-name">${addr.name} ${addr.phone}</div>
                    <div class="address-text">${addr.address}<br>${addr.city}, ${addr.state} - ${addr.pincode}</div>
                    ${i === 0 || selectedAddressId === addr.id ? '<button class="deliver-here-btn">DELIVER HERE</button>' : ''}
                </div>
            </div>
            <button class="edit-address-btn">EDIT</button>
        `;
        container.appendChild(card);

        card.querySelector('input[type="radio"]').addEventListener('change', () => handleAddressSelect(addr.id));
        const btn = card.querySelector('.deliver-here-btn');
        if (btn) btn.addEventListener('click', () => confirmAddress(addr.id));
    });
}

function handleAddressSelect(addressId) {
    selectedAddressId = addressId;
    document.querySelectorAll('.address-card').forEach(c => {
        c.classList.remove('selected');
        const btn = c.querySelector('.deliver-here-btn');
        if (btn) btn.remove();
    });
    const card = document.querySelector(`input[data-address-id="${addressId}"]`).closest('.address-card');
    card.classList.add('selected');
    const btn = document.createElement('button');
    btn.className = 'deliver-here-btn';
    btn.textContent = 'DELIVER HERE';
    btn.addEventListener('click', () => confirmAddress(addressId));
    card.querySelector('.address-details').appendChild(btn);
}

function confirmAddress(addressId) {
    const elements = {
        header:    document.getElementById('address-header'),
        content:   document.getElementById('address-content'),
        tick:      document.getElementById('address-tick'),
        changeBtn: document.getElementById('address-change-btn'),
    };

    elements.header.classList.remove('active');
    elements.header.classList.add('completed');
    elements.content.classList.remove('active');
    elements.content.style.display = 'none';
    if (elements.tick)      elements.tick.style.display      = 'inline';
    if (elements.changeBtn) elements.changeBtn.style.display = 'inline-block';

    document.getElementById('order-header').classList.add('active');
    const orderContent = document.getElementById('order-content');
    orderContent.classList.add('active');
    orderContent.style.display = 'block';

    currentStep = 3;
    renderOrderItems();
    updatePriceDetails();
    updateStepIndicator();

    const selectedAddress = savedAddresses.find(a => a.id === addressId);
    if (selectedAddress) localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
}

function showAddressForm() {
    document.getElementById('address-form-wrapper').style.display = 'block';
    document.getElementById('add-address-btn').style.display = 'none';
}

function hideAddressForm() {
    document.getElementById('address-form-wrapper').style.display = 'none';
    document.getElementById('add-address-btn').style.display = 'block';
    document.getElementById('address-form').reset();
}

function handleAddressSave(e) {
    e.preventDefault();
    const get = id => document.getElementById(id).value;
    let fullAddr = get('address');
    const locality = get('locality'), landmark = get('landmark');
    if (locality) fullAddr += ', ' + locality;
    if (landmark) fullAddr += ', ' + landmark;

    const newAddr = {
        id: savedAddresses.length + 1,
        name: get('name'), phone: get('phone'), address: fullAddr,
        locality, city: get('city'), state: get('state'),
        pincode: get('pincode'), landmark, altPhone: get('alt-phone'),
        type: document.querySelector('input[name="address-type"]:checked').value,
    };

    savedAddresses.push(newAddr);
    saveAddressesToLocalStorage();
    renderSavedAddresses();
    hideAddressForm();
    selectedAddressId = newAddr.id;
    handleAddressSelect(newAddr.id);
}

/* ── Order Summary ── */
function renderOrderItems() {
    const container = document.getElementById('order-items');
    if (!container) return;

    container.innerHTML = '';
    if (cartItems.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:40px;color:#878787;">Your cart is empty</p>';
        return;
    }

    cartItems.forEach(item => {
        item.quantity    ??= 1;
        item.originalPrice ??= Math.round(item.price * 1.25);
        item.seller      ??= 'E-Commerce Retail';
        item.delivery    ??= 'Within 3–5 days';
        item.variant     ??= item.color || '';

        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                ${item.variant ? `<div class="item-variant">${item.variant}</div>` : ''}
                <div class="item-seller">Seller: ${item.seller}
                    <span class="seller-badge"><i class="fa-solid fa-shield-halved"></i> Assured</span>
                </div>
                <div class="item-price">
                    <span class="current-price">₹${item.price.toLocaleString('en-IN')}</span>
                    <span class="original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div class="item-emi">Or Pay ₹${Math.ceil(item.price / 6).toLocaleString('en-IN')}/month (6 EMIs)</div>
                <div class="delivery-options">
                    <div class="delivery-option">
                        <input type="radio" checked>
                        <label>Delivery by ${item.delivery}</label>
                    </div>
                </div>
                <div class="item-quantity">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
                        <span class="qty-value" id="qty-${item.id}">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem('${item.id}')">REMOVE</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function updateQuantity(itemId, change) {
    const el = document.getElementById(`qty-${itemId}`);
    let qty = parseInt(el.textContent) + change;
    if (qty >= 1 && qty <= 10) {
        el.textContent = qty;
        const item = cartItems.find(i => i.id === itemId);
        if (item) { item.quantity = qty; saveCartToLocalStorage(); }
        updatePriceDetails();
    }
}

function removeItem(itemId) {
    if (!confirm('Remove this item?')) return;
    const idx = cartItems.findIndex(i => i.id === itemId);
    if (idx > -1) {
        cartItems.splice(idx, 1);
        saveCartToLocalStorage();
        renderOrderItems();
        updatePriceDetails();
        if (cartItems.length === 0) alert('Your cart is empty');
    }
}
window.updateQuantity = updateQuantity;
window.removeItem     = removeItem;

/* ── Price Details ── */
function updatePriceDetails() {
    let totalItems = 0, totalPrice = 0, totalOriginalPrice = 0;

    cartItems.forEach(item => {
        const q = item.quantity || 1;
        totalItems         += q;
        totalPrice         += item.price * q;
        totalOriginalPrice += (item.originalPrice || Math.round(item.price * 1.25)) * q;
    });

    const discount  = totalOriginalPrice - totalPrice;
    const platform  = cartItems.length > 0 ? PLATFORM_FEE : 0;
    const payable   = totalPrice + platform;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set('item-count',    totalItems);
    set('price-total',   `₹${totalOriginalPrice.toLocaleString('en-IN')}`);
    set('platform-fee',  `₹${platform}`);
    set('total-payable', `₹${payable.toLocaleString('en-IN')}`);
    set('total-savings', `₹${discount.toLocaleString('en-IN')}`);
}

/* ── Fees toggle ── */
function initFeesToggle() {
    const toggle    = document.getElementById('fees-toggle');
    const breakdown = document.getElementById('fees-breakdown');
    if (!toggle || !breakdown) return;
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('collapsed');
        breakdown.classList.toggle('hidden');
    });
}

/* ── Navigation ── */
function updateStepIndicator() {
    document.querySelectorAll('.checkout-steps-indicator .step-item').forEach((s, i) => {
        s.classList.toggle('active', i <= currentStep - 1);
    });
}

function handleChangeLogin() {
    window.location.href = 'login.html';
}

function handleChangeAddress() {
    document.getElementById('address-header').className  = 'step-header active';
    document.getElementById('address-content').className = 'step-content active';
    document.getElementById('address-content').style.display = 'block';
    document.getElementById('order-header').className    = 'step-header';
    document.getElementById('order-content').style.display  = 'none';

    const tick = document.getElementById('address-tick');
    const btn  = document.getElementById('address-change-btn');
    if (tick) tick.style.display = 'none';
    if (btn)  btn.style.display  = 'none';

    currentStep = 2;
    updateStepIndicator();
}

function proceedToPayment() {
    const input = document.getElementById('order-email');
    const email = input ? input.value.trim() : '';
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email');
        if (input) input.focus();
        return;
    }
    localStorage.setItem('checkoutEmail', email);
    localStorage.setItem('checkoutStep', 'payment');
    window.location.href = 'payment.html';
}