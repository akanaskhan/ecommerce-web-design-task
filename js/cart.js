document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-container");

  if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
      cart.forEach(product => {
          let item = document.createElement("div");
          item.classList.add("cart-item");
          item.innerHTML = `
            
              <div class="cart-info">

                <div class="cart-img">
                    <div><img src="${product.image}" alt="${product.name}" width="70" class="brder"></div>
                    <div>
                        <p><strong>${product.name}</strong></p>
                        <p class="cart-p">Size: Medium, Color: blue, Material: Plastic</p>
                        <p class="cart-p">Seller: Art Market</p>
                    </div>
                </div>
                <div><p class="cart-price">${product.price}</p><d/iv>
              </div>
              </div>
              <button class="remove-item" data-name="${product.name}">Remove</button>
          `;
          cartContainer.appendChild(item);
      });
  }
});

// Remove items from cart
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
      let productName = event.target.getAttribute("data-name");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter(product => product.name !== productName);

      localStorage.setItem("cart", JSON.stringify(cart));

      event.target.parentElement.remove();
  }
});
