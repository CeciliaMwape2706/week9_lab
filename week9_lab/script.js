
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

