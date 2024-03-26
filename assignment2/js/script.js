

// Wait for the DOM content to be fully loaded before executing JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const smoothieForm = document.getElementById('smoothieForm');
    const smoothieDetails = document.getElementById('smoothieDetails');

    // Add event listener for form submission
    smoothieForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form values
        const flavor = smoothieForm.elements['flavor'].value;
        const base = smoothieForm.elements['base'].value;

        const toppings = [];
        // Loop through checked checkboxes to get selected toppings
        const checkboxes = smoothieForm.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            toppings.push(checkbox.name);
        });

        // Create Smoothie object with form values
        const smoothie = new Smoothie(flavor, base, toppings);
        smoothie.displayDetails(); // Call the method to display smoothie details
    });

    // Smoothie class definition
    class Smoothie {
        constructor(flavor, base, toppings) {
            this.flavor = flavor;
            this.base = base;
            this.toppings = toppings;
            this.ingredientPrices = { // Define prices for ingredients
                flavor: 1.5,
                base: 2.0,
                toppings: 0.5
            };
        }

        // Method to calculate total price of the smoothie
        calculateTotalPrice() {
            let totalPrice = this.ingredientPrices.flavor + this.ingredientPrices.base + (this.toppings.length * this.ingredientPrices.toppings);
            return totalPrice.toFixed(2); // Round to 2 decimal places
        }

        // Method to display smoothie details in HTML
        displayDetails() {
            let smoothieHTML = `<h2>Your Smoothie:</h2>`;
            smoothieHTML += `<p><strong>Flavor:</strong> ${this.flavor} ($${this.ingredientPrices.flavor.toFixed(2)})</p>`;
            smoothieHTML += `<p><strong>Base:</strong> ${this.base} ($${this.ingredientPrices.base.toFixed(2)})</p>`;
            smoothieHTML += `<p><strong>Toppings:</strong> ${this.toppings.join(', ')} ($${(this.toppings.length * this.ingredientPrices.toppings).toFixed(2)})</p>`;
            smoothieHTML += `<p><strong>Total Price:</strong> $${this.calculateTotalPrice()}</p>`;
            smoothieDetails.innerHTML = smoothieHTML; // Display smoothie details in HTML
        }
    }
});
