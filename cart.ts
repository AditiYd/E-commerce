interface CartItem { 
  id: number; 
  image: string; 
  title: string; 
  price: number; 
  quantity: number; 
}
interface Cart { 
  totalPrice: number; 
  items: CartItem[]; 
}

document.addEventListener('DOMContentLoaded', () => { 
    renderCartItems();
  
    function renderCartItems() {
      const cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
      let totalPrice: number = 0;
  
      const cartContainer: HTMLElement | null = document.getElementById('cart');
      if (cartContainer) {
        cartContainer.innerHTML = '';
  
        cart.forEach((product: any) => {
          const productDetails: HTMLDivElement = document.createElement('div');
          productDetails.classList.add('prodDetails');
  
          const img: HTMLImageElement = document.createElement('img');
          img.classList.add('checkout-img');
          img.setAttribute('src', product.image);
          productDetails.appendChild(img);
  
          const h5: HTMLHeadingElement = document.createElement('h5');
          h5.innerHTML = product.title;
          h5.classList.add('tit');
          productDetails.appendChild(h5);
  
          const h6: HTMLHeadingElement = document.createElement('h6');
          if (typeof product.price === 'number') {
            h6.innerHTML = ` Price $${product.price.toFixed(2)}`;
            totalPrice += (product.price * (product.quantity || 1));
          } else {
            h6.innerHTML = ` Price: $${0}`;
          }
          productDetails.appendChild(h6);
  
          const quantityContainer: HTMLDivElement = document.createElement('div');
          quantityContainer.classList.add('quantity-container');
  
          const minusButton: HTMLButtonElement = createButton('-', () => updateQuantity(product, -1));
          quantityContainer.appendChild(minusButton);
  
          const quantityElement: HTMLSpanElement = document.createElement('span');
          quantityElement.textContent = product.quantity || 1;
          quantityContainer.appendChild(quantityElement);
  
          const plusButton: HTMLButtonElement = createButton('+', () => updateQuantity(product, 1));
          quantityContainer.appendChild(plusButton);
  
          productDetails.appendChild(quantityContainer);
  
          const removeButton: HTMLButtonElement = createButton('Remove', () => removeFromCart(product));
          removeButton.classList.add('custom-cardButton');
          productDetails.appendChild(removeButton);
  
          cartContainer.appendChild(productDetails);
        });
  
        const totalPriceElement: HTMLDivElement = document.createElement('div');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        cartContainer.appendChild(totalPriceElement);
  
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
  
        const placeOrderButton: HTMLButtonElement = createButton('Place Order', () => payment());
        placeOrderButton.classList.add('custom-cardButton');
        cartContainer.appendChild(placeOrderButton);
      }
    }
  
    function payment() {
      window.location.href = 'checkout.html';
    }
  
    function createButton(text: string, onClick: () => void): HTMLButtonElement {
      const button: HTMLButtonElement = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
    }
  
    function updateQuantity(product: any, change: number) {
      const cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = cart.map(item => {
        if (item.id === product.id) {
          item.quantity = (item.quantity || 1) + change;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      renderCartItems();
    }
  
    function removeFromCart(product: any) {
      const cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = cart.filter(item => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      renderCartItems();
    }
  });