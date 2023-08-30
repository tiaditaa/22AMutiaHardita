// Daftar produk dengan detailnya
const products = [
    { id: 1, name: "Laptop", price: 500000, image: "Laptop.jpg" },
    { id: 2, name: "Monitor", price: 600000, image: "Monitor.jpeg" },
    { id: 3, name: "Mouse", price: 200000, image: "Mouse.jpeg" },
    { id: 4, name: "Tv", price: 400000, image: "Tv.png" },
    { id: 5, name: "Hp", price: 300000, image: "Hp.png" },
    { id: 6, name: "Earphone", price: 100000, image: "Earphone.jpg" }
];

const productList = document.querySelector('.products');
const cartSection = document.querySelector('.cart');

// Menampilkan produk dalam DOM
function displayProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="150" height="120">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <input type="number" class="quantity" value="0" min="0">
            <p><button class="add-to-cart">Tambah Barang</button></p>
        `;
        productList.appendChild(productDiv);

        const addToCartBtn = productDiv.querySelector('.add-to-cart');
        const quantityInput = productDiv.querySelector('.quantity');

        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                addToCart(product, quantity);
                updateCart();
            }
        });
    });
}

// Keranjang belanja
const cart = [];

// Menambah produk ke keranjang
function addToCart(product, quantity) {
    const cartItem = cart.find(item => item.product.id === product.id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
}

// Mengupdate tampilan keranjang belanja
function updateCart() {
    cartSection.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <p>${item.product.name} : ${item.product.price} x ${item.quantity} = Rp ${item.product.price * item.quantity}</p>
        `;
        cartSection.appendChild(cartItemDiv);

        totalItems += item.quantity;
        totalPrice += item.product.price * item.quantity;
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `
        <p>Total Barang: ${totalItems}</p>
        <p>Total Pembelian: Rp ${totalPrice}</p>
        <p>Pajak (11%): Rp ${totalPrice * 0.11}</p>
        <p>Total Pembayaran : Rp ${totalPrice + totalPrice * 0.11}
    `;
    cartSection.appendChild(totalDiv);
}

// Menampilkan produk dan menginisialisasi event
displayProducts();
