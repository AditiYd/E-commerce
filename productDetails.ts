interface Product { 
  id: number; 
  image: string; 
  title: string; 
  price: number; 
  description: string; 
}
const currId = localStorage.getItem('CurrId');
if (currId) {
  fetch('https://fakestoreapi.com/products/'.concat(currId))
  .then((res: Response) => res.json())
  .then((data: any) => {
    console.log(data);

    const productDetails: HTMLElement | null = document.getElementById('productDetails');

    if (productDetails) {
      let img: HTMLImageElement = document.createElement('img');
      img.setAttribute('src', data.image);
      img.classList.add("prod-img", "custom-img");
      productDetails.appendChild(img);

      let h5: HTMLHeadingElement = document.createElement('h5');
      h5.innerHTML = data.title;
      productDetails.appendChild(h5);

      let h6: HTMLHeadingElement = document.createElement('h6');
      h6.innerHTML = `$ ${data.price}`;
      productDetails.appendChild(h6);

      let p: HTMLParagraphElement = document.createElement('p');
      p.innerHTML = data.description;
      productDetails.appendChild(p);

      const cardButton: HTMLAnchorElement = document.createElement("a");
      cardButton.classList.add(
        "btn",
        "btn-primary",
        "col-12",
        "mx-auto",
        "mt-auto",
        "pink-btn"
      );
      cardButton.textContent = "Add to Cart";
      cardButton.classList.add("custom-cardButton");
      productDetails.appendChild(cardButton);

      cardButton.addEventListener('click', () => {
        let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const productId: number = data.id;
      
        // Check if the product is already in the cart
        const productIndex: number = cart.findIndex(item => item.id === productId);
      
        if (productIndex === -1) {
          // Product is not in the cart, add it
          cart.push(data);
          localStorage.setItem('cart', JSON.stringify(cart));
          console.log("Product added to cart:", data);
        } else {
          console.log("Product already in the cart.");
        }
      });

      const wishlistButton: HTMLAnchorElement = document.createElement("a"); 
      wishlistButton.classList.add( "btn", "btn-secondary", "col-12", "mx-auto", "mt-auto", "pink-btn" ); 
      wishlistButton.textContent = "Add to Wishlist"; 
      wishlistButton.classList.add("custom-cardButton"); 
      productDetails.appendChild(wishlistButton);

      wishlistButton.addEventListener("click", () => { let wishlist: any[] = JSON.parse( localStorage.getItem("wishlist") || "[]" ); 
      const productId: number = data.id;

      // Check if the product is already in the wishlist 
      const productIndex: number = wishlist.findIndex( (item) => item.id === productId );

      if (productIndex === -1) { // Product is not in the wishlist, add it 
        wishlist.push(data); 
        localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
        console.log("Product added to wishlist:", data); 
      } else { 
        console.log("Product already in the wishlist."); 
      } 
     });

    const Contain = document.createElement('div');
    Contain.classList.add("product-container");
    Contain.appendChild(img);
    document.body.appendChild(Contain);

    const Contain2 = document.createElement('div');
    Contain2.classList.add("product-container");
    Contain2.appendChild(h5);
    document.body.appendChild(Contain2);

    const Contain3 = document.createElement('div');
    Contain3.classList.add("product-container");
    Contain3.appendChild(h6);
    document.body.appendChild(Contain3);

    const Contain4 = document.createElement('div');
    Contain4.classList.add("product-container");
    Contain4.appendChild(p);
    document.body.appendChild(Contain4);

    const Contain5 = document.createElement('div');
    Contain5.classList.add("product-container");
    Contain5.appendChild(cardButton);
    document.body.appendChild(Contain5);

    const Contain6 = document.createElement('div');
    Contain6.classList.add("product-container");
    Contain6.appendChild(wishlistButton);
    document.body.appendChild(Contain6);

    }
  });
}else {
    console.log('CurrId not found in localStorage.');
  }