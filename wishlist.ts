document.addEventListener('DOMContentLoaded', () => {
  renderWishlist();

  interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity?: number;
  }

  function renderWishlist(): void {
    const cart: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let totalPrice = 0;

    const cartContainer = document.getElementById('wishlist');
    if (cartContainer) {
      cartContainer.innerHTML = '';

      cart.forEach((product: Product) => {
        const productDetails = document.createElement('div');
        productDetails.classList.add('prodDetails');

        const img = document.createElement('img');
        img.classList.add('checkout-img', 'custom-image');
        img.setAttribute('src', product.image);
        productDetails.appendChild(img);

        const h5 = document.createElement('h5');
        h5.innerHTML = product.title;
        h5.classList.add('tit');
        productDetails.appendChild(h5);

        const h6 = document.createElement('h6');
        if (typeof product.price === 'number') {
          h6.innerHTML = ` Price $${product.price.toFixed(2)}`;
          totalPrice += product.price * (product.quantity || 1);
        } else {
          h6.innerHTML = ` Price: $${0}`;
        }
        productDetails.appendChild(h6);

        const removeButton = createButton('Remove', () => removeFromWishlist(product));
        removeButton.classList.add('custom-cardButton');
        productDetails.appendChild(removeButton);
        cartContainer.appendChild(productDetails);

        const moveButton = createButton('Move to Cart', () => moveFromWishlist(product));
        moveButton.classList.add('custom-cardButton');
        productDetails.appendChild(moveButton);
      });
    }
    document.getElementById('total-price').innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  function createButton(text: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }

  function removeFromWishlist(product: Product): void {
    const cart: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = cart.filter((item) => item.id !== product.id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    renderWishlist();
  }

  function moveFromWishlist(product: Product): void {
    const wishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex: number = wishlist.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      const existingIndex: number = cart.findIndex((item) => item.id === product.id);
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
    } else {
      console.log('Product not found in wishlist.');
    }
  }
});