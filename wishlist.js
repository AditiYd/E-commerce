document.addEventListener('DOMContentLoaded', function () {
    renderWishlist();
    function renderWishlist() {
        var cart = JSON.parse(localStorage.getItem('wishlist') || '[]');
        var totalPrice = 0;
        var cartContainer = document.getElementById('wishlist');
        if (cartContainer) {
            cartContainer.innerHTML = '';
            cart.forEach(function (product) {
                var productDetails = document.createElement('div');
                productDetails.classList.add('prodDetails');
                var img = document.createElement('img');
                img.classList.add('checkout-img', 'custom-image');
                img.setAttribute('src', product.image);
                productDetails.appendChild(img);
                var h5 = document.createElement('h5');
                h5.innerHTML = product.title;
                h5.classList.add('tit');
                productDetails.appendChild(h5);
                var h6 = document.createElement('h6');
                if (typeof product.price === 'number') {
                    h6.innerHTML = " Price $".concat(product.price.toFixed(2));
                    totalPrice += product.price * (product.quantity || 1);
                }
                else {
                    h6.innerHTML = " Price: $".concat(0);
                }
                productDetails.appendChild(h6);
                var removeButton = createButton('Remove', function () { return removeFromWishlist(product); });
                removeButton.classList.add('custom-cardButton');
                productDetails.appendChild(removeButton);
                cartContainer.appendChild(productDetails);
                var moveButton = createButton('Move to Cart', function () { return moveFromWishlist(product); });
                moveButton.classList.add('custom-cardButton');
                productDetails.appendChild(moveButton);
            });
        }
        document.getElementById('total-price').innerHTML = "Total Price: $".concat(totalPrice.toFixed(2));
    }
    function createButton(text, onClick) {
        var button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
    function removeFromWishlist(product) {
        var cart = JSON.parse(localStorage.getItem('wishlist') || '[]');
        var updatedWishlist = cart.filter(function (item) { return item.id !== product.id; });
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        renderWishlist();
    }
    function moveFromWishlist(product) {
        var wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var productIndex = wishlist.findIndex(function (item) { return item.id === product.id; });
        if (productIndex !== -1) {
            var existingIndex = cart.findIndex(function (item) { return item.id === product.id; });
            if (existingIndex !== -1) {
                console.log('Product already in cart');
                wishlist.splice(productIndex, 1);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                renderWishlist();
                return;
            }
            wishlist.splice(productIndex, 1);
            cart.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Product moved from wishlist to cart:', product);
            renderWishlist();
        }
        else {
            console.log('Product not found in wishlist.');
        }
    }
});
