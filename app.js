let products = JSON.parse(localStorage.getItem('products')) || [
  { name: "Laptop", quantity: 15 },
  { name: "Mouse", quantity: 40 }
];


function loginUser() {
  event.preventDefault(); 

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value.trim();
console.log(email, password);
  if (email === 'admin@stockpilot.com' && password === 'password123') {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'dashboard.html'; 
  } else {
    alert('Incorrect email or password');
  }
}
function checkAuth() {
  const loggedIn = localStorage.getItem('isLoggedIn');
  if (loggedIn !== 'true') {
    window.location.href = 'login.html';
  }
}

function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
}

function renderProducts() {
  const tableBody = document.querySelector('.js-product-table');
  if (!tableBody) return;

  let tableHTML = ""; // 1. The empty bucket

  // 2. Your new loop
  products.forEach(function(item, index) {
        tableHTML = tableHTML + `
      <tr>
        <td><img src="images/${item.image}" width="50" alt="product"></td>
        <td></td> <!-- Empty for SKU for now -->
        <td>${item.name}</td>
        <td></td> <!-- Empty for Category -->
        <td>${item.quantity}</td>
        <td></td> <!-- Empty for Price -->
        <td><button class="btn btn-primary" onclick="deleteProduct(${index})">Delete</button></td>
      </tr>
    `;
  });

  // 3. The injection
  tableBody.innerHTML = tableHTML; 
}





function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts(); // Refresh the table
}
function addProduct() {
  event.preventDefault(); 

    // 1. Grab all details (including the image file name)
  const name = document.querySelector('#product-name').value;
  const quantity = parseInt(document.querySelector('#product-qty').value);
  const imageFile = document.querySelector('#image').files[0].name; 

  // 2. Push it into our array with the image included
  products.push({ name: name, quantity: quantity, image: imageFile });

  // 3. Save the updated array to storage
  localStorage.setItem('products', JSON.stringify(products));
  
  // 4. Send the user back to the inventory page
  window.location.href = 'products.html';
}

// 1. Declare the function
function renderDashboard() {
  let totalStock = 0; 

  // 2. Loop through the inventory
  products.forEach(function(item) {
    totalStock = totalStock + item.quantity; 
  });

  // 3. Update the HTML page
  const metricDisplay = document.querySelector('.js-total-stock');
  if (metricDisplay) {
    metricDisplay.innerHTML = totalStock;
  }
}
