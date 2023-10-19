document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();
    function renderCartItems() {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var totalPrice = 0;
        var cartContainer = document.getElementById('cart');
        if (cartContainer) {
            cartContainer.innerHTML = '';
            cart.forEach(function (product) {
                var productDetails = document.createElement('div');
                productDetails.classList.add('prodDetails');
                var img = document.createElement('img');
                img.classList.add('checkout-img');
                img.setAttribute('src', product.image);
                productDetails.appendChild(img);
                var h5 = document.createElement('h5');
                h5.innerHTML = product.title;
                h5.classList.add('tit');
                productDetails.appendChild(h5);
                var h6 = document.createElement('h6');
                if (typeof product.price === 'number') {
                    h6.innerHTML = " Price $".concat(product.price.toFixed(2));
                    totalPrice += (product.price * (product.quantity || 1));
                }
                else {
                    h6.innerHTML = " Price: $".concat(0);
                }
                productDetails.appendChild(h6);
                var quantityContainer = document.createElement('div');
                quantityContainer.classList.add('quantity-container');
                var minusButton = createButton('-', function () { return updateQuantity(product, -1); });
                quantityContainer.appendChild(minusButton);
                var quantityElement = document.createElement('span');
                quantityElement.textContent = product.quantity || 1;
                quantityContainer.appendChild(quantityElement);
                var plusButton = createButton('+', function () { return updateQuantity(product, 1); });
                quantityContainer.appendChild(plusButton);
                productDetails.appendChild(quantityContainer);
                var removeButton = createButton('Remove', function () { return removeFromCart(product); });
                removeButton.classList.add('custom-cardButton');
                productDetails.appendChild(removeButton);
                cartContainer.appendChild(productDetails);
            });
            var totalPriceElement = document.createElement('div');
            totalPriceElement.classList.add('total-price');
            totalPriceElement.textContent = "Total Price: $".concat(totalPrice.toFixed(2));
            cartContainer.appendChild(totalPriceElement);
            localStorage.setItem('totalPrice', totalPrice.toFixed(2));
            var placeOrderButton = createButton('Place Order', function () { return payment(); });
            placeOrderButton.classList.add('custom-cardButton');
            cartContainer.appendChild(placeOrderButton);
        }
    }
    function payment() {
        window.location.href = 'checkout.html';
    }
    function createButton(text, onClick) {
        var button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
    function updateQuantity(product, change) {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var updatedCart = cart.map(function (item) {
            if (item.id === product.id) {
                item.quantity = (item.quantity || 1) + change;
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartItems();
    }
    function removeFromCart(product) {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var updatedCart = cart.filter(function (item) { return item.id !== product.id; });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartItems();
    }
});
