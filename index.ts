interface Product { 
    id: number; 
    title: string; 
    price: number; 
    image: string; 
    rating: { rate: number; }; 
}
fetch("https://fakestoreapi.com/products") 
  .then((response: Response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then((data: any[]) => {
    console.log(data);

    const mainContainer: HTMLElement | null = document.getElementById("home");

    if (mainContainer) {
      const cardDeck: HTMLDivElement = document.createElement("div");
      cardDeck.classList.add("card-deck");

      data.forEach((product: any) => {
        const card: HTMLDivElement = document.createElement("div");
        card.classList.add("card");
        card.style.width = "16rem";
        card.style.margin = "0.83rem";

        const cardImage: HTMLImageElement = document.createElement("img");
        cardImage.classList.add("card-img-top");
        cardImage.alt = "Product Image";
        cardImage.src = product.image;
        card.appendChild(cardImage);

        const cardBody: HTMLDivElement = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");

        const cardTitle: HTMLHeadingElement = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = product.title;
        cardBody.appendChild(cardTitle);

        const cardPrice: HTMLParagraphElement = document.createElement("p");
        cardPrice.classList.add("card-price");
        cardPrice.textContent = `$ ${product.price}`;
        cardBody.appendChild(cardPrice);

        const cardButton: HTMLAnchorElement = document.createElement("a");
        cardButton.classList.add("btn", "btn-primary", "col-12", "mx-auto", "mt-auto");
        cardButton.href = "productDetails.html";
        cardButton.textContent = "View More";

        cardButton.addEventListener("click", () => {
          localStorage.setItem("CurrId", product.id);
        });

        const cardRating: HTMLHeadingElement = document.createElement("p");
        cardRating.classList.add("card-rating");
        cardRating.textContent = `Rating: ${getStars(product.rating.rate)}`;
        cardBody.appendChild(cardRating);

        cardBody.appendChild(cardButton);
        card.appendChild(cardBody);
        cardDeck.appendChild(card);
      });


      if (mainContainer) {
        mainContainer.appendChild(cardDeck);
      }
    }

    function getStars(rating: number): string {
        const fullStars = Math.floor(rating);
        const halfStars = Math.round(rating - fullStars);
        const emptyStars = 5 - fullStars - halfStars;
        
        return "★".repeat(fullStars) + "☆".repeat(halfStars) + "  ".repeat(emptyStars);
      }
  })
  .catch((error: Error) => console.error("FETCH ERROR:", error));
