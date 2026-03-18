/* ============================================================
   PRODUCT.JS  —  Data + Logic in one file
   Add new products to the PRODUCTS object below.
   Link to them with: product.html?id=yourproductid
============================================================ */

/* ════════════════════════════════════════
   PRODUCTS DATA
════════════════════════════════════════ */
const PRODUCTS = {

    /* ── MOBILES ── */
    iphone16pro: {
        id: 'iphone16pro',
        name: 'iPhone 16 Pro',
        brand: 'Apple',
        category: 'Mobiles',
        mainImage: '../images/products/iphone.png',
        thumbs: [
            '../images/products/iphone.png',
            '../images/products/iphone2.jpg',
            '../images/products/iphone3.jpg',
            '../images/products/iphone4.jpg',
        ],
        currentPrice: 119900,
        originalPrice: 129900,
        rating: '4.8',
        reviewCount: 245,
        options: {
            Color:   ['Black', 'Silver', 'Gold', 'Blue'],
            Storage: ['128GB', '256GB', '512GB', '1TB'],
        },
        defaultOptions: { Color: 'Black', Storage: '256GB' },
        warranty: [
            '1 Year Manufacturer Warranty',
            '30 Days Return Policy',
            'Free Shipping on orders over ₹500',
            'Secure Payment Options',
        ],
        description: 'The iPhone 16 Pro represents the pinnacle of smartphone technology. With its advanced A18 Pro chip, stunning Super Retina XDR display, and professional-grade camera system, it delivers an unparalleled mobile experience.',
        features: [
            '6.7-inch Super Retina XDR display with ProMotion',
            'A18 Pro chip for unprecedented performance',
            'Pro camera system with 48MP Main camera',
            'Action button for quick access to features',
            'Titanium design with textured matte glass back',
            'All-day battery life with fast charging',
        ],
    },

    samsungs20ultra: {
        id: 'samsungs20ultra',
        name: 'Samsung Galaxy S20 Ultra',
        brand: 'Samsung',
        category: 'Mobiles',
        mainImage: '../images/products/samsung.png',
        thumbs: [
            '../images/products/samsung.png',
            '../images/products/samsung2.jpg',
            '../images/products/samsung3.jpg',
            '../images/products/samsung4.jpg',
        ],
        currentPrice: 69999,
        originalPrice: 79999,
        rating: '4.6',
        reviewCount: 189,
        options: {
            Color:   ['Phantom Black', 'Cloud White'],
            Storage: ['128GB', '256GB'],
        },
        defaultOptions: { Color: 'Phantom Black', Storage: '128GB' },
        warranty: [
            '1 Year Manufacturer Warranty',
            '30 Days Return Policy',
            'Free Shipping on orders over ₹500',
        ],
        description: 'The Samsung Galaxy S20 Ultra is a powerhouse smartphone featuring a massive 108MP camera, 100x Space Zoom, and a stunning 6.9-inch Dynamic AMOLED display.',
        features: [
            '6.9-inch Dynamic AMOLED 2X display',
            '108MP main camera with 100x Space Zoom',
            '5000mAh battery with 45W fast charging',
            'Snapdragon 865 processor',
            '5G connectivity',
        ],
    },

    /* ── FASHION ── */
    nikeshoes: {
        id: 'nikeshoes',
        name: 'Nike Running Shoes',
        brand: 'Nike',
        category: 'Fashion',
        mainImage: '../images/products/nike1.png',
        thumbs: [
            '../images/products/nike1.png',
            '../images/products/nike2.jpg',
            '../images/products/nike3.jpg',
            '../images/products/nike4.jpg',
        ],
        currentPrice: 1999,
        originalPrice: 3499,
        rating: '4.5',
        reviewCount: 312,
        options: {
            Size:  ['6', '7', '8', '9', '10'],
            Color: ['White', 'Black', 'Red'],
        },
        defaultOptions: { Size: '8', Color: 'White' },
        warranty: [
            '6 Months Manufacturing Warranty',
            '7 Days Return Policy',
        ],
        description: 'Lightweight and responsive Nike running shoes designed for comfort and speed. Perfect for everyday runs and casual wear.',
        features: [
            'Breathable mesh upper for airflow',
            'React foam midsole for cushioning',
            'Rubber outsole for traction',
            'Reflective elements for low-light visibility',
        ],
    },

    kurti: {
        id: 'kurti',
        name: 'Chikankari Kurti',
        brand: 'Ethnix',
        category: 'Fashion',
        mainImage: '../images/products/kurti1.png',
        thumbs: [
            '../images/products/kurti1.png',
            '../images/products/kurti2.jpg',
            '../images/products/kurti3.jpg',
            '../images/products/kurti4.jpg',
        ],
        currentPrice: 699,
        originalPrice: 1299,
        rating: '4.3',
        reviewCount: 98,
        options: {
            Size:  ['S', 'M', 'L', 'XL', 'XXL'],
            Color: ['White', 'Pastel Pink', 'Sky Blue'],
        },
        defaultOptions: { Size: 'M', Color: 'White' },
        warranty: [
            '7 Days Return Policy',
            'Hand wash recommended',
        ],
        description: 'Elegant hand-embroidered Chikankari Kurti made from breathable cotton fabric. Perfect for casual and semi-formal occasions.',
        features: [
            '100% pure cotton fabric',
            'Traditional Chikankari hand embroidery',
            'Regular fit with side slits',
            'Machine washable',
        ],
    },

    /* ── BEAUTY ── */
    vitcserum: {
        id: 'vitcserum',
        name: 'Vitamin C Face Serum',
        brand: 'Plum',
        category: 'Beauty',
        mainImage: '../images/products/vitc1.png',
        thumbs: [
            '../images/products/vitc1.png',
            '../images/products/vitc2.jpg',
            '../images/products/vitc3.jpg',
            '../images/products/vitc4.jpg',
        ],
        currentPrice: 899,
        originalPrice: 1199,
        rating: '4.4',
        reviewCount: 567,
        options: {
            Size: ['30ml', '50ml'],
        },
        defaultOptions: { Size: '30ml' },
        warranty: [
            '30 Days Return Policy',
            '100% Authentic Product',
        ],
        description: 'Plum 15% Vitamin C Face Serum with Mandarin & Hyaluronic Acid for brighter, more even-toned skin. Dermatologist tested and free from harmful chemicals.',
        features: [
            '15% Vitamin C for visible brightening',
            'Hyaluronic Acid for deep hydration',
            'Mandarin extract for antioxidant protection',
            'Cruelty-free and vegan formula',
            'Suitable for all skin types',
        ],
    },

    lipstick: {
        id: 'lipstick',
        name: 'Matte Lipstick',
        brand: 'Lakme',
        category: 'Beauty',
        mainImage: '../images/products/lipstick.png',
        thumbs: [
            '../images/products/lipstick_1.jpg',
            '../images/products/lipstick_2.jpg',
            '../images/products/lipstick_3.jpg',
            '../images/products/lipstick_4.jpg',
        ],
        currentPrice: 599,
        originalPrice: 799,
        rating: '4.2',
        reviewCount: 234,
        options: {
            Shade: ['Ruby Red', 'Nude Blush', 'Berry Bold', 'Coral Pink'],
        },
        defaultOptions: { Shade: 'Ruby Red' },
        warranty: [
            '30 Days Return Policy',
            '100% Authentic Product',
        ],
        description: 'Lakme Absolute Matte Lipstick delivers an intense matte finish that lasts all day. Enriched with Vitamin E for soft, comfortable wear.',
        features: [
            'Long-lasting matte finish up to 8 hours',
            'Enriched with Vitamin E',
            'Lightweight and comfortable formula',
            'Available in 20+ shades',
        ],
    },

    /* ── ELECTRONICS ── */
    hplaptop: {
        id: 'hplaptop',
        name: 'HP Pavilion Laptop',
        brand: 'HP',
        category: 'Electronics',
        mainImage: '../images/products/laptop.png',
        thumbs: [
            '../images/products/laptop.png',
            '../images/products/laptop2.jpg',
            '../images/products/laptop3.jpg',
            '../images/products/laptop4.jpg',
        ],
        currentPrice: 62999,
        originalPrice: 74999,
        rating: '4.5',
        reviewCount: 143,
        options: {
            RAM:     ['8GB', '16GB'],
            Storage: ['512GB SSD', '1TB SSD'],
        },
        defaultOptions: { RAM: '8GB', Storage: '512GB SSD' },
        warranty: [
            '1 Year On-site Warranty',
            '30 Days Return Policy',
            'Free Shipping',
        ],
        description: 'The HP Pavilion is a versatile laptop designed for everyday computing. Powered by Intel Core i5 processor with fast SSD storage for smooth multitasking.',
        features: [
            '15.6-inch FHD IPS Anti-glare display',
            'Intel Core i5-12th Gen processor',
            'Intel Iris Xe integrated graphics',
            'Fast SSD storage',
            'Up to 8 hours battery life',
            'Windows 11 Home',
        ],
    },

    boatheadphones: {
        id: 'boatheadphones',
        name: 'Boat Rockerz Headphones',
        brand: 'Boat',
        category: 'Electronics',
        mainImage: '../images/products/boat1.png',
        thumbs: [
            '../images/products/boat1.png',
            '../images/products/boat2.jpg',
            '../images/products/boat3.jpg',
            '../images/products/boat4.jpg',
        ],
        currentPrice: 2499,
        originalPrice: 4999,
        rating: '4.1',
        reviewCount: 892,
        options: {
            Color: ['Black', 'Blue', 'Red'],
        },
        defaultOptions: { Color: 'Black' },
        warranty: [
            '1 Year Manufacturer Warranty',
            '7 Days Return Policy',
        ],
        description: 'Boat Rockerz 550 wireless over-ear headphones with deep bass, 20-hour playback, and foldable design. Perfect for music lovers on the go.',
        features: [
            '20-hour battery playtime',
            'Bluetooth 5.0 connectivity',
            '50mm dynamic drivers for deep bass',
            'Foldable design for easy portability',
            'Built-in mic for hands-free calls',
        ],
    },

    /* ── TVS & APPLIANCES ── */
    samsungtv: {
        id: 'samsungtv',
        name: 'Samsung 43" Smart TV',
        brand: 'Samsung',
        category: 'TVs & Appliances',
        mainImage: '../images/products/TV.png',
        thumbs: [
            '../images/products/TV.png',
            '../images/products/TV2.jpg',
            '../images/products/TV3.jpg',
            '../images/products/TV4.jpeg',
        ],
        currentPrice: 39999,
        originalPrice: 52999,
        rating: '4.6',
        reviewCount: 421,
        options: {
            Size: ['43"', '55"', '65"'],
        },
        defaultOptions: { Size: '43"' },
        warranty: [
            '1 Year Comprehensive Warranty',
            '30 Days Return Policy',
            'Free Installation',
        ],
        description: 'Samsung Crystal 4K UHD Smart TV with stunning picture quality, built-in voice assistants, and seamless streaming from all major platforms.',
        features: [
            '4K UHD Crystal Display',
            'PurColor technology for vibrant visuals',
            'Built-in Alexa & Bixby',
            'Multiple HDMI and USB ports',
            'AirSlim design',
        ],
    },

    lgwashingmachine: {
        id: 'lgwashingmachine',
        name: 'LG 7kg Washing Machine',
        brand: 'LG',
        category: 'TVs & Appliances',
        mainImage: '../images/products/washingMachine.png',
        thumbs: [
            '../images/products/washingMachine.png',
            '../images/products/wM2.jpeg',
            '../images/products/wM3.jpeg',
            '../images/products/wM4.jpeg',
        ],
        currentPrice: 28999,
        originalPrice: 36999,
        rating: '4.4',
        reviewCount: 276,
        options: {
            Capacity: ['6.5kg', '7kg', '8kg'],
        },
        defaultOptions: { Capacity: '7kg' },
        warranty: [
            '2 Year Comprehensive Warranty',
            '10 Year Motor Warranty',
            '30 Days Return Policy',
            'Free Installation',
        ],
        description: 'LG 7kg Front Load Washing Machine with AI Direct Drive technology for gentle yet effective fabric care. Energy efficient with multiple wash programs.',
        features: [
            'AI Direct Drive for fabric protection',
            '6 Motion technology',
            'Steam wash for deep cleaning',
            'TurboWash for faster cycles',
            '5-star energy rating',
        ],
    },

};

/* ════════════════════════════════════════
   PAGE LOGIC
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

    const params    = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product   = productId ? PRODUCTS[productId] : null;

    // Fallback to iPhone if no id given
    loadProduct(product || PRODUCTS.iphone16pro);
});

/* ── Populate the entire page from a product object ── */
function loadProduct(p) {

    /* Images */
    const mainImg = document.getElementById('main-image');
    if (mainImg) mainImg.src = p.mainImage;

    const thumbContainer = document.querySelector('.thumbnail-images');
    if (thumbContainer) {
        thumbContainer.innerHTML = p.thumbs.map((src, i) =>
            `<img src="${src}" alt="Thumb ${i + 1}" class="thumbnail${i === 0 ? ' active' : ''}">`
        ).join('');
    }

    /* Text */
    setText('h1',      p.name);
    setText('.brand',  `Brand: ${p.brand}`);

    /* Price */
    const save = Math.round((1 - p.currentPrice / p.originalPrice) * 100);
    setText('.current-price',  `₹${p.currentPrice.toLocaleString('en-IN')}`);
    setText('.original-price', `₹${p.originalPrice.toLocaleString('en-IN')}`);
    setText('.discount',       `Save ${save}%`);

    /* Rating */
    setInner('.rating',
        `${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))} ${p.rating} (${p.reviewCount} Reviews)`
    );

    /* Options */
    const optionsContainer = document.querySelector('.product-options');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';

        Object.entries(p.options).forEach(([label, values]) => {
            const group = document.createElement('div');
            group.className = 'option-group';
            group.innerHTML = `<label>${label}:</label>` +
                values.map(v =>
                    `<button class="option-btn${p.defaultOptions[label] === v ? ' active' : ''}">${v}</button>`
                ).join('');
            optionsContainer.appendChild(group);
        });

        // Quantity group
        optionsContainer.insertAdjacentHTML('beforeend', `
            <div class="option-group">
                <label>Quantity:</label>
                <button class="qty-btn" id="decrease">-</button>
                <input type="number" value="1" min="1" id="quantity" readonly>
                <button class="qty-btn" id="increase">+</button>
            </div>`);
    }

    /* Warranty */
    const warrantyList = document.querySelector('.warranty-info ul');
    if (warrantyList) {
        warrantyList.innerHTML = p.warranty.map(w => `<li>✓ ${w}</li>`).join('');
    }

    /* Description & features */
    const descSection = document.querySelector('.product-description');
    if (descSection) {
        descSection.querySelector('p').textContent = p.description;
        const ul = descSection.querySelector('ul');
        if (ul) ul.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
    }

    /* Page title */
    document.title = `${p.name} – E-Commerce`;

    /* Init interactions */
    initImageGallery();
    initOptionButtons();
    initQuantityControls();
    initAddToCart(p);
    initImageZoom();
    initWriteReview();
}

/* ── Helpers ── */
function setText(selector, text) {
    const el = document.querySelector(`.product-info ${selector}`) || document.querySelector(selector);
    if (el) el.textContent = text;
}
function setInner(selector, html) {
    const el = document.querySelector(`.product-info ${selector}`) || document.querySelector(selector);
    if (el) el.innerHTML = html;
}

/* ── Image gallery ── */
function initImageGallery() {
    const mainImage  = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
        });
    });
}

/* ── Option buttons ── */
function initOptionButtons() {
    document.querySelectorAll('.option-group').forEach(group => {
        const btns = group.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', function () {
                btns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

/* ── Quantity controls ── */
function initQuantityControls() {
    const dec = document.getElementById('decrease');
    const inc = document.getElementById('increase');
    const qty = document.getElementById('quantity');
    if (!dec || !inc || !qty) return;
    dec.addEventListener('click', () => {
        const v = parseInt(qty.value) || 1;
        if (v > 1) qty.value = v - 1;
    });
    inc.addEventListener('click', () => {
        const v = parseInt(qty.value) || 1;
        if (v < 10) qty.value = v + 1;
        else alert('Maximum 10 items allowed per order');
    });
}

/* ── Add to cart / Buy now ── */
function initAddToCart(product) {
    const addBtn = document.querySelector('.btn-cart');
    const buyBtn = document.querySelector('.btn-buy');

    function buildCartItem() {
        const qty   = parseInt(document.getElementById('quantity')?.value) || 1;
        const color = document.querySelector('.option-group .option-btn.active')?.innerText || '';
        return { id: product.id, name: product.name, price: product.currentPrice,
                 image: product.mainImage, quantity: qty, color };
    }

    if (addBtn) {
        addBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let cart    = JSON.parse(localStorage.getItem('cart') || '[]');
            const item  = buildCartItem();
            const found = cart.find(c => c.id === item.id);
            if (found) found.quantity += item.quantity;
            else cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`"${item.name}" added to cart!`);
        });
    }

    if (buyBtn) {
        buyBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.setItem('cart', JSON.stringify([buildCartItem()]));
            window.location.href = 'checkout.html';
        });
    }
}

/* ── Image zoom overlay ── */
function initImageZoom() {
    const mainImg = document.getElementById('main-image');
    if (!mainImg) return;
    mainImg.style.cursor = 'zoom-in';
    mainImg.addEventListener('click', function () {
        const overlay = document.createElement('div');
        overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.9);
            display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out;`;
        const img = document.createElement('img');
        img.src = this.src;
        img.style.cssText = 'max-width:90%;max-height:90%;';
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
    });
}

/* ── Write review ── */
function initWriteReview() {
    const btn = document.querySelector('.btn-write-review');
    if (btn) {
        btn.addEventListener('click', () => {
            const text = prompt('Write your review:');
            if (text) alert('Thank you for your review!');
        });
    }
}