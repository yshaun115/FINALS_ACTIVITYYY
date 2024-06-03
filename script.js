const items = document.querySelectorAll('.item');

items.forEach(item => {
    const input = item.querySelector('input');
    const stockElement = item.querySelector('span');
    const stock = parseInt(stockElement.textContent);
    
    input.addEventListener('change', () => {
        let quantity = parseInt(input.value);
        if (quantity < 0) {
            quantity = 0;
        } else if (quantity > stock) {
            quantity = stock;
        }
        input.value = quantity;
        updateTotal();
    });
});


function purchaseWithAlerts() {
const items = document.querySelectorAll('.item');
let hasItems = false;
let isOutOfStock = false;

items.forEach((item, index) => {
    const input = item.querySelector('input');
    const quantity = parseInt(input.value);
    const stockElement = item.querySelector('span');
    let stock = parseInt(stockElement.textContent);

    if (quantity > 0) {
        hasItems = true;

        if (stock === 0) {
            alert('Out of stock for item ' + (index + 1));
            isOutOfStock = true;
            return;
        }

        if (quantity > stock) {
            alert('Not enough stock available for item ' + (index + 1));
            return;
        }

        stock -= quantity;
        stockElement.textContent = stock;
        input.value = 0;
    }
});

if (!hasItems) {
    alert('Kindly choose items for purchase');
} else {
    updateTotal();
    if (!isOutOfStock) {
        alert('Thank you for shopping with us');
    }
}
}


function updateTotal() {
const items = document.querySelectorAll('.item');
let total = 0;

items.forEach(item => {
    const input = item.querySelector('input');
    const quantity = parseInt(input.value);
    const priceText = item.querySelector('p').textContent;
    const priceMatch = priceText.match(/Price:\s*\$([\d.]+)/);
    
    if (priceMatch) {
        const price = parseFloat(priceMatch[1]);
        total += price * quantity;
    }
});

document.getElementById('total').textContent = total.toFixed(2);
}


function resetInputValues() {
    const inputs = document.querySelectorAll('.item input');
    inputs.forEach(input => {
        input.value = 0;
    });
}

function showCategory(category) {
    const itemGroups = document.querySelectorAll('.item-group');
    itemGroups.forEach(group => {
        if (group.id === category) {
            group.classList.remove('hidden');
        } else {
            group.classList.add('hidden');
        }
    });
}

function displayReceiptAlert() {
let receipt = "Receipt:\n";
let total = 0;
const items = document.querySelectorAll('.item');

items.forEach((item, index) => {
    const input = item.querySelector('input');
    const quantity = parseInt(input.value);
    if (quantity > 0) {
        const itemName = item.querySelector('h2').textContent;
        const priceText = item.querySelector('p').textContent;
        const priceMatch = priceText.match(/Price:\s*\$([\d.]+)/);
        if (priceMatch) {
            const price = parseFloat(priceMatch[1]);
            const totalPrice = quantity * price;
            receipt += `Item ${index + 1}: ${itemName} - Quantity: ${quantity} - Total Price: $${totalPrice.toFixed(2)}\n`;
            total += totalPrice;
        }
    }
});

receipt += `Total: $${total.toFixed(2)}`;
alert(receipt);
}


function cancelOrder() {
const items = document.querySelectorAll('.item');
let hasSelectedItem = false;

items.forEach(item => {
    const input = item.querySelector('input');
    const quantity = parseInt(input.value);
    if (quantity > 0) {
        hasSelectedItem = true;
    }
    input.value = 0;
});

if (!hasSelectedItem && event.target.id === "cancelBtn") {
    alert("No cancellation required as no items were selected");
} else if (event.target.id === "cancelBtn") {
    updateTotal();
    alert('Cancellation confirmed');
}
}

