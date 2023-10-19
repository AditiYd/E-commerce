var currId = localStorage.getItem('CurrId');
if (currId) {
    fetch('https://fakestoreapi.com/products/'.concat(currId))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        var productDetails = document.getElementById('productDetails');
        if (productDetails) {
            var img = document.createElement('img');
            img.setAttribute('src', data.image);
            img.classList.add("prod-img", "custom-img");
            productDetails.appendChild(img);
            var h5 = document.createElement('h5');
            h5.innerHTML = data.title;
            productDetails.appendChild(h5);
            var h6 = document.createElement('h6');
            h6.innerHTML = "$ ".concat(data.price);
            productDetails.appendChild(h6);
            var p = document.createElement('p');
            p.innerHTML = data.description;
            productDetails.appendChild(p);
            var cardButton = document.createElement("a");
            cardButton.classList.add("btn", "btn-primary", "col-12", "mx-auto", "mt-auto", "pink-btn");
            cardButton.textContent = "Add to Cart";
            cardButton.classList.add("custom-cardButton");
            productDetails.appendChild(cardButton);
            cardButton.addEventListener('click', function () {
                var cart = JSON.parse(localStorage.getItem('cart') || '[]');
                var productId = data.id;
                // Check if the product is already in the cart
                var productIndex = cart.findIndex(function (item) { return item.id === productId; });
                if (productIndex === -1) {
                    // Product is not in the cart, add it
                    cart.push(data);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    console.log("Product added to cart:", data);
                }
                else {
                    console.log("Product already in the cart.");
                }
            });
            var wishlistButton = document.createElement("a");
            wishlistButton.classList.add("btn", "btn-secondary", "col-12", "mx-auto", "mt-auto", "pink-btn");
            wishlistButton.textContent = "Add to Wishlist";
            wishlistButton.classList.add("custom-cardButton");
            productDetails.appendChild(wishlistButton);
            wishlistButton.addEventListener("click", function () {
                var wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
                var productId = data.id;
                // Check if the product is already in the wishlist 
                var productIndex = wishlist.findIndex(function (item) { return item.id === productId; });
                if (productIndex === -1) { // Product is not in the wishlist, add it 
                    wishlist.push(data);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    console.log("Product added to wishlist:", data);
                }
                else {
                    console.log("Product already in the wishlist.");
                }
            });
            var Contain = document.createElement('div');
            Contain.classList.add("product-container");
            Contain.appendChild(img);
            document.body.appendChild(Contain);
            var Contain2 = document.createElement('div');
            Contain2.classList.add("product-container");
            Contain2.appendChild(h5);
            document.body.appendChild(Contain2);
            var Contain3 = document.createElement('div');
            Contain3.classList.add("product-container");
            Contain3.appendChild(h6);
            document.body.appendChild(Contain3);
            var Contain4 = document.createElement('div');
            Contain4.classList.add("product-container");
            Contain4.appendChild(p);
            document.body.appendChild(Contain4);
            var Contain5 = document.createElement('div');
            Contain5.classList.add("product-container");
            Contain5.appendChild(cardButton);
            document.body.appendChild(Contain5);
            var Contain6 = document.createElement('div');
            Contain6.classList.add("product-container");
            Contain6.appendChild(wishlistButton);
            document.body.appendChild(Contain6);
        }
    });
}
else {
    console.log('CurrId not found in localStorage.');
}
