

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10'); 
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Mahsulotlarni yuklashda xato yuz berdi:", error);
        document.getElementById('product-list').innerHTML = '<p style="color: red;">Mahsulotlarni yuklab bo\'lmadi. API bilan bog\'lanishda xato.</p>';
    }
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
   
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" 
                    data-product-id="${product.id}" 
                    data-product-title="${product.title}" 
                    data-product-price="${product.price}"
                    data-product-image="${product.image}">
                Add to cart
            </button>
        `;
        productList.appendChild(productCard);
    });


    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(event) {
    const button = event.target;
    const product = {
  
        id: parseInt(button.dataset.productId),
        title: button.dataset.productTitle,
        price: parseFloat(button.dataset.productPrice),
        image: button.dataset.productImage,
        quantity: 1
    };

 
    const addToCartEvent = new CustomEvent('addToCart', { detail: product });
    document.dispatchEvent(addToCartEvent);
    console.log(`Mahsulot savatga qo'shildi (ID: ${product.id})`);
}

fetchProducts();