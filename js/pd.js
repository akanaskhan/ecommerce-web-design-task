// non functional search bar interactivity using JS

document.getElementById("search-butn").addEventListener("click", function() {
    let product = document.getElementById("search-bar").value.trim();
    if (product != "") {
        alert(`This is Non-functional bar,\nAnd You are searching for: "${product}"`)
    }else {
        alert("Please enter product name!")
    }
})


// Retrieve the selected product from localStorage
let product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
    // Set product details dynamically
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
} else {
    // Handle case where no product is found
    document.querySelector(".product-details").innerHTML = "<p>Product not found.</p>";
}
// Review Section Interactivity

document.addEventListener("DOMContentLoaded", function () {
    let reviewsContainer = document.getElementById("review-sec");
    let reviewInput = document.getElementById("review-input");
    let submitButton = document.getElementById("submit-review");
    let usernameInput = document.getElementById("username");
    let ratingStars = document.querySelectorAll("#rating span");

    let selectedRating = 0;

    // 🔹 Load reviews from localStorage OR use default reviews if empty
    let defaultReviews = [
        { username: "Alice", rating: 5, text: "Great product! Highly recommend." },
        { username: "Bob", rating: 4, text: "Good value for money, but shipping was slow." }
    ];
    
    let reviews = JSON.parse(localStorage.getItem("productReviews")) || defaultReviews;

    // Function to display reviews
    function displayReviews() {
        reviewsContainer.innerHTML = ""; // Clear previous content

        reviews.forEach(review => {
            let reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");
            reviewDiv.innerHTML = `
                <p class="user">${review.username}</p>
                <span class="rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
                <p>${review.text}</p>
            `;
            reviewsContainer.appendChild(reviewDiv);
        });
    }

    displayReviews(); // Show initial reviews

    // Handle star rating selection
    ratingStars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.dataset.value);
            ratingStars.forEach(s => s.classList.remove("selected"));
            for (let i = 0; i < selectedRating; i++) {
                ratingStars[i].classList.add("selected");
            }
        });
    });

    // Handle review submission
    submitButton.addEventListener("click", function () {
        let username = usernameInput.value.trim();
        let reviewText = reviewInput.value.trim();

        if (!username || !reviewText || selectedRating === 0) {
            alert("Please fill all fields and select a rating!");
            return;
        }

        let newReview = { username, rating: selectedRating, text: reviewText };
        reviews.push(newReview);
        localStorage.setItem("productReviews", JSON.stringify(reviews));

        usernameInput.value = "";
        reviewInput.value = "";
        selectedRating = 0;
        ratingStars.forEach(s => s.classList.remove("selected"));

        displayReviews(); // Refresh reviews
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let addToCartButton = document.querySelector(".add-to-cart");

    addToCartButton.addEventListener("click", function () {
        let product = {
            name: document.getElementById("product-name").textContent.trim(),
            price: document.getElementById("product-price").textContent.trim(),
            image: document.getElementById("product-image").src.trim()
        };

        // Check if cart exists, if not create an empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add new product to cart
        cart.push(product);

        // Save updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("✅ Product added to cart!");
    });
});
