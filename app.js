/* Simple cart functionality for Moon Child Marketplace */
let cart = [];

// Add an item to the cart and update the badge
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartCount();
}

// Update the cart count displayed in the header
function updateCartCount() {
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        countSpan.textContent = cart.length;
    }
}

// Toggle the visibility of the cart modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
    } else {
        renderCart();
        modal.classList.add('active');
    }
}

// Render the items in the cart into the modal
function renderCart() {
    const itemsList = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!itemsList || !totalElement) return;
    itemsList.innerHTML = '';
    let total = 0;
    cart.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item.name + ' - $' + item.price.toFixed(2);
        itemsList.appendChild(li);
        total += item.price;
    });
    totalElement.textContent = 'Total: $' + total.toFixed(2);
}

// Compose a mailto link with order details and open the user’s email client
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    let body = 'Order details:%0D%0A';
    let total = 0;
    cart.forEach(function(item) {
        body += item.name + ' - $' + item.price.toFixed(2) + '%0D%0A';
        total += item.price;
    });
    body += '%0D%0ATotal: $' + total.toFixed(2) + '%0D%0A%0D%0AThank you for your order!';
    const mailtoLink = 'mailto:orders@moonchildoftheearth.com?subject=New%20Order&body=' + body;
    window.location.href = mailtoLink;
}
