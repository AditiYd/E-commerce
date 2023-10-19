fetch("https://fakestoreapi.com/products")
    .then(function (response) {
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error("NETWORK RESPONSE ERROR");
    }
})
    .then(function (data) {
    // Sort products array by ascending price
    data.sort(function (a, b) { return a.price - b.price; });
    console.log(data);
    var mainContainer = document.getElementById("sortByPrice");
    if (mainContainer) {
        var cardDeck_1 = document.createElement("div");
        cardDeck_1.classList.add("card-deck");
        data.forEach(function (product) {
            var card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "16rem";
            card.style.margin = "0.83rem";
            var cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.alt = "Product Image";
            cardImage.src = product.image;
            card.appendChild(cardImage);
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "d-flex", "flex-column");
            var cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = product.title;
            cardBody.appendChild(cardTitle);
            var cardPrice = document.createElement("p");
            cardPrice.classList.add("card-price");
            cardPrice.textContent = "$ ".concat(product.price);
            cardBody.appendChild(cardPrice);
            var cardButton = document.createElement("a");
            cardButton.classList.add("btn", "btn-primary", "col-12", "mx-auto", "mt-auto");
            cardButton.href = "productDetails.html";
            cardButton.textContent = "View More";
            cardButton.addEventListener("click", function () {
                localStorage.setItem("CurrId", product.id);
            });
            var cardRating = document.createElement("p");
            cardRating.classList.add("card-rating");
            cardRating.textContent = "Rating: ".concat(getStars(product.rating.rate));
            cardBody.appendChild(cardRating);
            cardBody.appendChild(cardButton);
            card.appendChild(cardBody);
            cardDeck_1.appendChild(card);
        });
        if (mainContainer) {
            mainContainer.appendChild(cardDeck_1);
        }
    }
    function getStars(rating) {
        var fullStars = Math.floor(rating);
        var halfStars = Math.round(rating - fullStars);
        var emptyStars = 5 - fullStars - halfStars;
        return "★".repeat(fullStars) + "☆".repeat(halfStars) + "  ".repeat(emptyStars);
    }
})
    .catch(function (error) { return console.error("FETCH ERROR:", error); });
