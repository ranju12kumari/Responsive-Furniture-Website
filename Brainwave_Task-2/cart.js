const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity">
            <button class="remove" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemEl);
        total += item.price * item.quantity;
    });
    totalPriceElement.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('remove')) {
        const id = e.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        renderCartItems();
    }
});

cartItemsContainer.addEventListener('input', e => {
    if (e.target.classList.contains('quantity')) {
        const id = e.target.getAttribute('data-id');
        const newQuantity = parseInt(e.target.value);
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
        }
        renderCartItems();
    }
});

renderCartItems();
