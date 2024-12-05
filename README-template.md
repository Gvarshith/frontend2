# Cart Management Application

This project is a simple cart management interface where users can add items to a cart, view the cart summary, and reset the cart to its initial state. It demonstrates interactive JavaScript functionality with DOM manipulation.

## Features

1. **Cart Interaction**:
   - Users can add items to the cart.
   - Cart items are displayed in a summary section.
   - The cart keeps track of the total number of items.

2. **Reset Cart**:
   - A button (`subNew`) allows users to reset all cart-related changes.
   - Resets include:
     - Hiding overlay and dimmed background elements.
     - Resetting button styles to their default state.
     - Displaying an empty cart message with an illustration.
     - Resetting the cart count to `0`.
     - Optionally refreshing the page for a complete reset.

3. **Dynamic Updates**:
   - Buttons and other elements update dynamically based on user interactions.

## Code Overview

### Core Functionalities

1. **Event Listener for Reset**:
   - A `click` event listener is attached to the `subNew` button to reset the cart or refresh the page.
   - Example:
     ```javascript
     document.getElementById('subNew').addEventListener('click', () => {
       location.reload(); // Refreshes the page to reset all states
     });
     ```

2. **Reset Button Styles**:
   - Resets the styles of `addToCartButtons` to their original appearance.
   - This is handled using a helper function `resetButtonStyles`.

3. **Empty Cart State**:
   - Updates the `cartSummary` container to display an empty cart message and image:
     ```html
     <div class="empty-cart">
       <img src="./assets/images/illustration-empty-cart.svg" alt="Empty Cart">
       <p>Your added items will appear here</p>
     </div>
     ```

4. **Resetting States**:
   - Cart count is reset to `0`.
   - Additional functionalities such as clearing form inputs or session storage are modularized for easy extension.

### Modular Code Example

- Resetting inputs:
  ```javascript
  function resetFormInputs() {
    const inputs = document.querySelectorAll('form input');
    inputs.forEach((input) => {
      input.value = '';
    });
  }

