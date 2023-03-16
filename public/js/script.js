const createAccountBtn = document.getElementById("createAccountBtn");
const createRecipeBtn = document.getElementById("createRecipeBtn");
const exphbs = require("express-handlebars");

// Confirm all functions are performing only one task before deleting
// this comment, if not the case refactor



const createAccountFormHandler = (event) => {
  event.preventDefault();

  const username = document.getElementById("usernameInput").value.trim();
  const userEmail = document.getElementById("emailInput").value.trim();
  const userPassword = document.getElementById("passwordInput").value.trim();

  if (username && userEmail && userPassword) {
    const response = fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ username, userEmail, userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login was successful, redirect to the profile page
      document.location.replace("../homepage.handlebars");
    } else {
      Alert(response.statusText);
    }
  }
};

// Async event handler to process user login

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("usernameInput").value.trim();
  const userPassword = document.getElementById("passwordInput").value.trim();

  if (username && userPassword) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login was successful, redirect to the profile page
      document.location.replace("./homepage.handlebars");
    } else {
      Alert(response.statusText);
    }
  }
};

const createIngredientsObject = (ingredientsInput) => {
  const ingredients = ingredientsInput.map((ingredient) =>
    ingredient.value.trim()
  );
  ingredientsObject = JSON.stringify({ ingredients });
};

const createRecipeFormHandler = (event) => {
  event.preventDefault();
  
  const name = document.getElementById("recipeNameInput").value.trim();
  const category = document
    .getElementById("recipeCategorySelector")
    .value.trim();
  const imageInput = document.getElementById("recipeImageUpload").value.trim();
  const instructions = document.getElementById("instructionInput").value.trim();
  const ingredientsInput = document.querySelectorAll(".ingredient");
  const ingredients = createIngredientsObject(ingredientsInput);

  // Incomplete.... need to create a function to handle the image upload to put in here
  // need to decide at which point we want to include user Id... in this function,
  // Or in the route itself.
  if (name && category && instructions && ingredients && imageInput) {
    const response = fetch("/api/recipe/:recipeName", {
      method: "POST",
      body: JSON.stringify({
        recipeName,
        recipeCategory,
        ingredient,
        instructions,
        image,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login was successful, redirect to the profile page
      document.location.replace("./homepage.handlebars");
    } else {
      Alert(response.statusText);
    }
  }
};

// We can probably come up with a better name for this function

const addIngredientInputEl = async (event) => {
  const ingredientsContainer = document.getElementById(
    "ingredientsInputContainer"
  );
  const ingredientInput = document.createElement("input");
  ingredientInput.setAttribute("id", "ingredient");
  ingredientInput.setAttribute(
    "class",
    "ingredient form-control form-control-sm w-80"
  );
  ingredientInput.setAttribute("type", "text");
  ingredientInput.setAttribute("style", "margin: 2px;");
  ingredientInput.setAttribute("placeholder", "quantity and name");
  ingredientsContainer.appendChild(ingredientInput);
};

Handlebars.registerPartial("myPartial", "{{prefix}}");


// ADD MORE INGREDIENTS BUTTON

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector("#addMoreIngredientsButton")
  .addEventListener("click", addIngredientInputEl);

createRecipeBtn.addEventListener("click", createRecipeFormHandler);

createAccountBtn.addEventListener("click", createAccountFormHandler);
