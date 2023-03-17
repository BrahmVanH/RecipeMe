const createAccountBtn = document.getElementById("createAccountBtn");
const saveRecipeBtn = document.getElementById("saveRecipeBtn");
const logoutBtn = document.getElementById("logOutBtn");

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
  console.log("calling loginFormHandler...");
  event.preventDefault();

  const username = document.getElementById("usernameInput").value.trim();
  const userPassword = document.getElementById("passwordInput").value.trim();

  if (username && userPassword) {
    console.log("fetching...");
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login was successful, redirect to the profile page
      document.location.replace("/");
      console.log("Going back home...");
    } else {
      Alert(response.statusText);
    }
  }
};

const logoutButtonHandler = (event) => {
  event.preventDefault();
  console.log("logging out");
  const logoutResponse = fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

const createIngredientsObject = (ingredientsInput) => {
  console.log("creating ingredients array...")
  ingredientsArray = [];
  for (const ingredient of ingredientsInput) {
    ingredientTrim = ingredient.value.trim();
    ingredientsArray.push(ingredientTrim);
    console.log("pushing ingredient inputs to array...")
  };
  console.log("JSONifying ingredientsArray");
  ingredientsObject = JSON.stringify({ ingredientsArray });
};

const createRecipeFormHandler = (event) => {
  console.log("creating recipe...");
  event.preventDefault();

  const name = document.getElementById("recipeNameInput").value.trim();
  const category = document
    .getElementById("recipeCategorySelectEl")
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
      document.location.replace("/");
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
  ingredientInput.setAttribute("style", "width: 80%;margin: 2px;");
  ingredientInput.setAttribute(
    "class",
    "ingredient form-control form-control-sm"
  );
  ingredientInput.setAttribute("placeholder", "quantity and name");
  ingredientsContainer.insertBefore(
    ingredientInput,
    ingredientsContainer.children[5]
  );
};

// ADD MORE INGREDIENTS BUTTON

document

  .querySelector("#loginSubmit")
  .addEventListener("click", loginFormHandler);

document
  .querySelector("#addMoreIngredientsButton")
  .addEventListener("click", addIngredientInputEl);

saveRecipeBtn.addEventListener("click", createRecipeFormHandler);

createAccountBtn.addEventListener("click", createAccountFormHandler);

logoutBtn.addEventListener("click", logoutButtonHandler);
