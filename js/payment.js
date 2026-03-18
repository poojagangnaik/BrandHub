/* ============================================
   PAYMENT.JS — Platform fee, no protect promise fee
============================================ */

const PLATFORM_FEE = 7;

let cartItems = [];

document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
    calculatePaymentTotals();
    initPaymentPage();
    initToggles();
    initCardFormatting();
});

/* ── Load Cart ── */
function loadCartFromStorage() {
    const saved = localStorage.getItem("cart");
    if (!saved) { cartItems = []; return; }
    try {
        cartItems = JSON.parse(saved);
        if (!Array.isArray(cartItems)) throw new Error("Invalid cart");
    } catch (err) { cartItems = []; }
}

/* ── Calculate Totals ── */
function calculatePaymentTotals() {
    let totalMRP   = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        item.quantity      ??= 1;
        item.originalPrice ??= Math.round(item.price * 1.25);

        totalMRP   += item.originalPrice * item.quantity;
        totalPrice += item.price         * item.quantity;
    });

    const discount    = totalMRP - totalPrice;
    const finalAmount = totalPrice + PLATFORM_FEE;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set("mrp-total",      `₹${totalMRP.toLocaleString('en-IN')}`);
    set("discount-total", `-₹${discount.toLocaleString('en-IN')}`);
    set("platform-fee",   `₹${PLATFORM_FEE}`);
    set("total-amount",   `₹${finalAmount.toLocaleString('en-IN')}`);

    // Update all Pay buttons
    document.querySelectorAll(".pay-btn").forEach(btn => {
        btn.textContent = `Pay ₹${finalAmount.toLocaleString('en-IN')}`;
    });
}

/* ── Payment Method Select ── */
function selectPaymentMethod(method) {
    document.querySelectorAll(".method-content").forEach(c => c.style.display = "none");
    document.querySelectorAll(".payment-method-card").forEach(c => c.classList.remove("active"));

    const content = document.getElementById(`${method}-content`);
    const card    = document.getElementById(`${method}-card`);
    if (content) content.style.display = "block";
    if (card)    card.classList.add("active");
}

/* ── Toggles ── */
function initToggles() {
    ["fees", "discounts"].forEach(type => {
        const toggle    = document.getElementById(`${type}-toggle`);
        const breakdown = document.getElementById(`${type}-breakdown`);
        if (toggle && breakdown) {
            toggle.addEventListener("click", () => {
                toggle.classList.toggle("collapsed");
                breakdown.classList.toggle("hidden");
            });
        }
    });
}

/* ── Card Input Formatting ── */
function initCardFormatting() {
    const cardNum = document.getElementById("card-number");
    const expiry  = document.getElementById("card-expiry");
    const cvv     = document.getElementById("card-cvv");

    if (cardNum) {
        cardNum.addEventListener("input", e => {
            let val = e.target.value.replace(/\s/g, "");
            e.target.value = val.match(/.{1,4}/g)?.join(" ") || val;
        });
    }
    if (expiry) {
        expiry.addEventListener("input", e => {
            let val = e.target.value.replace(/\D/g, "");
            if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
            e.target.value = val;
        });
    }
    if (cvv) {
        cvv.addEventListener("input", e => {
            e.target.value = e.target.value.replace(/\D/g, "");
        });
    }
}

/* ── Verify UPI ── */
function verifyUPI() {
    const input     = document.getElementById("upi-id");
    const verifyBtn = document.querySelector(".verify-btn");
    const payBtn    = document.getElementById("upi-pay-btn");

    if (!input.value.trim()) { alert("Enter a valid UPI ID"); return; }

    verifyBtn.textContent = "Verifying...";
    verifyBtn.disabled    = true;

    setTimeout(() => {
        verifyBtn.textContent      = "Verified ✓";
        verifyBtn.style.background = "#388e3c";
        payBtn.disabled            = false;
        payBtn.style.background    = "#ff9f00";
        payBtn.style.cursor        = "pointer";
    }, 1500);
}

/* ── Process Payment ── */
function processPayment(method) {
    const totalAmount    = document.getElementById("total-amount")?.textContent || "₹0";
    const savedAddresses = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress") || "null")
        || savedAddresses[0]
        || { name: "Customer", address: "Address not provided", city: "", state: "", pincode: "", phone: "" };

    const checkoutEmail = localStorage.getItem("checkoutEmail") || "customer@email.com";

    const orderData = {
        orderId:       "ORD" + Date.now(),
        orderDate:     new Date().toLocaleDateString('en-IN'),
        paymentMethod: method.toUpperCase(),
        total:         totalAmount,
        transactionId: "TXN" + Date.now(),
        email:         checkoutEmail,
        status:        "processing",
        deliveryDate:  getDeliveryDate(3),
        address:       selectedAddress,
        items:         cartItems.map(item => ({
            name:     item.name,
            image:    item.image,
            price:    item.price,
            quantity: item.quantity || 1,
            variant:  item.color || item.variant || "",
        })),
    };

    localStorage.setItem("lastOrder",      JSON.stringify(orderData));
    localStorage.setItem("paymentMethod",  orderData.paymentMethod);
    saveToOrderHistory(orderData);

    alert(`Processing ${method.toUpperCase()} payment of ${totalAmount}...`);

    localStorage.removeItem("cart");
    setTimeout(() => { window.location.href = "order-placed.html"; }, 1000);
}

/* ── Save to Order History ── */
function saveToOrderHistory(orderData) {
    let orderHistory = [];
    try {
        const saved = localStorage.getItem("orderHistory");
        if (saved) orderHistory = JSON.parse(saved);
    } catch (e) { console.error("Failed to load order history:", e); }

    orderHistory.unshift(orderData);
    if (orderHistory.length > 50) orderHistory = orderHistory.slice(0, 50);

    try {
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    } catch (e) { console.error("Failed to save order history:", e); }
}

/* ── Helper ── */
function getDeliveryDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-IN');
}

/* ── Init ── */
function initPaymentPage() {
    selectPaymentMethod("upi");

    document.querySelectorAll(".pay-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const method = btn.closest(".payment-method-card").id.replace("-card", "");
            processPayment(method);
        });
    });

    const verifyBtn = document.querySelector(".verify-btn");
    if (verifyBtn) verifyBtn.addEventListener("click", e => { e.preventDefault(); verifyUPI(); });

    const upiPayBtn = document.getElementById("upi-pay-btn");
    if (upiPayBtn) {
        upiPayBtn.disabled         = true;
        upiPayBtn.style.background = "#c2c2c2";
        upiPayBtn.style.cursor     = "not-allowed";
    }
}

window.selectPaymentMethod = selectPaymentMethod;