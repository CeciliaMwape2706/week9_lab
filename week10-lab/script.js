import { Product } from "./product.js";

//TASK 1   Grab the heading and the name paragraph to be named 
const heading = document.querySelector("#mainName");
const nameLine = document.querySelector("#nameLine");

//changed the words inside the heading
heading.textContent = "Welcome to my page";

//changed the color of the name paragraph
nameLine.style.color = "purple";

//TASK 2: Click counter - keep count in a variable starting at 0
let count = 0;

//the button and the span will show the number 
const countBtn = document.querySelector("#countBtn");
const countDisplay = document.querySelector("#countDisplay");

//When the button is clicked, add 1 to count and show it in the span
countBtn.addEventListener("click", () => {
  count = count + 1;
  countDisplay.textContent = count;
});

//TASK 3: Dark mode toggle - grab the button
const darkBtn = document.querySelector("#darkBtn");
//when clicked, add the dark class if it's missing, remove it if it's there
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

//TASK 4: Build the course list from an array of data 
const courses = ["LA111", "MA210", "Databases", "CS361", "CS351"];
//the list on the page 
const courseList = document.querySelector("#courseList");
//Turn each course name into a list item and put them all on the page
courseList.innerHTML = courses.map(c => `<li>${c}</li>`).join("");
const addCourseBtn = document.querySelector("#addCourseBtn");
//when clicked, make a new list item and add it to the end of the list
addCourseBtn.addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.textContent = "New Course";
  courseList.appendChild(newItem);
});

//TASK 5: Live search - grab the search box
const searchBox = document.querySelector("#searchBox");

//Every time a letter is typed, filter the courses and redraw the list
searchBox.addEventListener("input", () => {
  const typed = searchBox.value.toLowerCase();
  const filtered = courses.filter(c => c.toLowerCase().includes(typed));
  courseList.innerHTML = filtered.map(c => `<li>${c}</li>`).join("");
});

//TASK 6: form validation - grab the form and its pieces 
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const formMsg = document.querySelector("#formMsg");
//when the form is submitted, stop the reload and check the input
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const typedName = nameInput.value.trim();
  const typedEmail = emailInput.value.trim();
  //Check if the name box was left empty
  if (typedName === "") {
    formMsg.textContent = "Please type your name";
    formMsg.style.color = "red";
  //check if the email has an @ sign in it 
  } else if (!typedEmail.includes("@")) {
    formMsg.textContent = "Please type a real email";
    formMsg.style.color = "red";
  //if both checks passed, show a success message 
  } else {
    formMsg.textContent = "Thank you, message sent!";
    formMsg.style.color = "green";
  }
});

//Begining of week 10 
//TASK 1: Fetch a list of users from a public API and show them
async function loadUsers() {
  //Show a loading message while we wait for the data (TASK 2)
  document.querySelector("#userList").innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    renderUsers(data);
  } catch (err) {
    document.querySelector("#userList").innerHTML = "<p>Could not load users.</p>";
  }
}

//Turn the list of users into HTML and put it on the page
function renderUsers(users) {
  const list = document.querySelector("#userList");
  list.innerHTML = users.map(u => `<div>${u.name} - ${u.email}</div>`).join("");
}

//Run the function so it loads as soon as the page opens
loadUsers();

//TASK 3: Make 3 products using the Product blueprint
const products = [
  new Product("Book", 100),
  new Product("Pen", 20),
  new Product("Bag", 250)
];

//TASK 5: Load the saved cart from storage, or start with an empty one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Show each product with its tax-included price and an Add to Cart button
function renderProducts() {
  const list = document.querySelector("#productList");
  list.innerHTML = products.map((p, i) =>
    `<div>${p.name} - ${p.withTax()} <button onclick="addToCart(${i})">Add to Cart</button></div>`
  ).join("");
}
renderProducts();

//TASK 6: Show the total price of everything in the cart
function updateCartDisplay() {
  const total = cart.reduce((sum, name) => {
    const product = products.find(p => p.name === name);
    return sum + (product ? product.withTax() : 0);
  }, 0);
  document.querySelector("#cartTotal").textContent = "Cart Total: " + total;
}
updateCartDisplay();

//Add a product to the cart, save it, and update the total shown on screen
function addToCart(index) {
  cart.push(products[index].name);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart:", cart);
  updateCartDisplay();
}

//Make addToCart available to the onclick buttons created above
window.addToCart = addToCart;