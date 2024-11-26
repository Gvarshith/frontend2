fetch('./data.json')
  .then((res) => res.json())
  .then((data) => {
    const element = document.querySelector('.items');
    const cartSummary = document.querySelector('#cart-items');
    const cartCount = document.querySelector('#cart-count');
    let cart = []; // Track cart items

    // Generate product list
    data.forEach((item, index) => {
      element.insertAdjacentHTML(
        'beforeend',
        `
        <div class="div">
          <img src="${item.image.desktop}" alt="${item.name}">
          <button class="add-to-cart" data-index="${index}">
            <img class="cart" src="./assets/images/icon-add-to-cart.svg">
            &nbsp;&nbsp;Add To Cart
            <div class="quantity-controls" style="display: none;">
              <i class="fa-solid fa-circle-minus decrement" data-name="${item.name}"></i>
              <span class="quantity">1</span>
              <i class="fa-solid fa-circle-plus increment" data-name="${item.name}"></i>
            </div>
          </button>
          <p class="title">${item.category}</p>
          <p><b>${item.name}</b></p>
          <p class="price">₹${item.price}</p>
        </div>`
      );
    });

    // Add event listeners for buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => handleAddToCart(button, data[index]));
    });

    // Add to cart logic
    function handleAddToCart(button, item) {
      const parentDiv = button.closest('.div');
      const image = parentDiv.querySelector('img');
      const quantityControls = parentDiv.querySelector('.quantity-controls');
      const itemExists = cart.find((cartItem) => cartItem.name === item.name);

      if (!itemExists) {
        cart.push({ ...item, quantity: 1 });
        button.innerHTML = '';
        button.appendChild(quantityControls);
        button.style.backgroundColor = '#c4390b';
        button.style.color = '#fff';
        image.style.border = '2px solid #c4390b';
        quantityControls.style.display = 'flex';
        button.disabled = true;
      } else {
        itemExists.quantity += 1;
      }
      updateCartSummary();
    }

    // Update cart summary
    function updateCartSummary() {
      cartSummary.innerHTML = '';
      let totalItems = 0;

      cart.forEach((cartItem) => {
        totalItems += cartItem.quantity;
        cartSummary.insertAdjacentHTML(
          'beforeend',
          `
          <div class="cartIt">
            <div class="title">
              <h7><b>${cartItem.name}</b></h7>
              <img id="rem" src="./assets/images/icon-remove-item.svg" data-name="${cartItem.name}">
            </div>
            <span>${cartItem.quantity}x</span>&nbsp;&nbsp;
            <span>₹${cartItem.price}</span>&nbsp;&nbsp;
            <span>₹${cartItem.quantity * cartItem.price}</span>
            <hr>
          </div>`
        );
      });

      // Handle empty cart
      if (cart.length === 0) {
        cartSummary.innerHTML = `
          <div class="empty-cart">
            <img src="./assets/images/illustration-empty-cart.svg" alt="Empty Cart">
            <p>Your cart is empty. Add some items to get started!</p>
          </div>`;
      }
      cartCount.textContent = totalItems;

      // Add listeners for cart item actions
      document.querySelectorAll('.fa-circle-plus').forEach((button) => {
        button.addEventListener('click', (e) => updateQuantity(e.target.dataset.name, 1));
      });
      document.querySelectorAll('.fa-circle-minus').forEach((button) => {
        button.addEventListener('click', (e) => updateQuantity(e.target.dataset.name, -1));
      });
      document.querySelectorAll('#rem').forEach((button) => {
        button.addEventListener('click', (e) => removeItem(e.target.dataset.name));
      });
    }

    // Update quantity logic
    function updateQuantity(name, change) {
      const item = cart.find((cartItem) => cartItem.name === name);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeItem(name);
      }
      updateCartSummary();
    }

    // Remove item logic
    function removeItem(name) {
      cart = cart.filter((item) => item.name !== name);
      const button = Array.from(addToCartButtons).find(
        (btn) => btn.dataset.index === `${data.findIndex((item) => item.name === name)}`
      );
      resetButtonStyles(button);
      updateCartSummary();
    }

    // Reset button styles
    function resetButtonStyles(button) {
      const parentDiv = button.closest('.div');
      const image = parentDiv.querySelector('img');
      button.style.backgroundColor = '';
      button.style.color = '';
      button.innerHTML = `
        <img class="cart" src="./assets/images/icon-add-to-cart.svg">
        &nbsp;&nbsp;Add To Cart
        <div class="quantity-controls" style="display: none;">
          <i class="fa-solid fa-circle-minus"></i>
          <span class="quantity">1</span>
          <i class="fa-solid fa-circle-plus"></i>
        </div>`;
      button.disabled = false;
      image.style.border = '';
    }
  })
  .catch((error) => console.error('Error fetching data:', error));