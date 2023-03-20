const createAccountBtn = document.getElementById("createAccountBtn");
const saveRecipeBtn = document.getElementById("saveRecipeBtn");
const logoutBtn = document.getElementById("logOutBtn");
const breakfastBtn = document.getElementById("breakfastFilter");
const lunchBtn = document.getElementById("lunchFilter");
const dinnerBtn = document.getElementById("dinnerFilter");
const dessertBtn = document.getElementById("dessertFilter");
const snacksBtn = document.getElementById("snacksFilter");
const condimentsBtn = document.getElementById("condimentsFilter");

// Confirm all functions are performing only one task before deleting
// this comment, if not the case refactor

const createAccountFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("createUsernameInput").value.trim();
  const userEmail = document.getElementById("emailInput").value.trim();
  const userPassword = document
    .getElementById("createPasswordInput")
    .value.trim();

  if (username && userEmail && userPassword) {
    const response = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ username, userEmail, userPassword }),
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

// Async event handler to process user login

const loginFormHandler = async (event) => {
  console.log("calling loginFormHandler...");
  event.preventDefault();

  const username = document.getElementById("loginUsernameInput").value.trim();
  const userPassword = document
    .getElementById("signInPasswordInput")
    .value.trim();

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

const reloadPage = () => {
  window.location.reload();
};

const logUserOut = () => {
  console.log("logging out");
  const logoutResponse = fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

const logoutButtonHandler = (event) => {
  event.preventDefault();
  logUserOut();
  setTimeout(reloadPage, 1000);
};

const createIngredientsObject = (ingredientsInput) => {
  console.log("creating ingredients array...");
  ingredientsArray = [];
  for (const ingredient of ingredientsInput) {
    ingredientTrim = ingredient.value.trim();
    ingredientsArray.push(ingredientTrim);
    console.log("pushing ingredient inputs to array...");
    console.log(`${ingredientsArray}`);
  }
  console.log("JSONifying ingredientsArray");
  ingredientsObject = JSON.stringify({ ingredientsArray });
};

const createRecipeFormHandler = async (event) => {
  console.log("creating recipe...");
  event.preventDefault();

  const recipeName = document.getElementById("recipeNameInput").value.trim();
  const recipeCategory = document
    .getElementById("recipeCategorySelectEl")
    .value.trim();
  const imageInput = document.getElementById("recipeImageUpload").value.trim();
  const instructions = document.getElementById("instructionInput").value.trim();
  const ingredientsInput = document.querySelectorAll(".ingredient");
  const ingredients = createIngredientsObject(ingredientsInput);
  console.log("back into create...formhandler...");
  console.log("session user_id...");

  // Incomplete.... need to create a function to handle the image upload to put in here
  // need to decide at which point we want to include user Id... in this function,
  // Or in the route itself.
  /*if (name && category && instructions && ingredients && imageInput) { */
  console.log("all recipe form handler requirements present....");
  console.log("creating POST request for new recipe");
  const response = await fetch("/api/recipes/", {
    method: "POST",
    body: JSON.stringify({
      recipeName,
      recipeCategory,
      ingredients,
      instructions,
      imageInput,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If login was successful, redirect to the profile page
    console.log("Recipe created, replacing document location");
    document.location.replace("/");
  } else {
    Alert(response.statusText);
  }
  /*} else {
    console.log(`${name} ${category} ${instructions} ${ingredients} ${imageInput}`)
  } */
};

// We can probably come up with a better name for this function

const addIngredientInputEl = async (event) => {
  const ingredientsContainer = document.getElementById(
    "ingredientsInputContainer"
  );
  const ingredientInput = document.createElement("input");
  ingredientInput.setAttribute("id", "ingredient");
  ingredientInput.setAttribute("class", "ingredient form-control w-100");
  ingredientInput.setAttribute("type", "text");
  ingredientInput.setAttribute("style", "width: 99%;margin: 2px;");
  ingredientInput.setAttribute("class", "ingredient form-control");
  ingredientInput.setAttribute("placeholder", "quantity and name");
  ingredientsContainer.insertBefore(
    ingredientInput,
    ingredientsContainer.children[5]
  );
};

const identifyCategorySearch = async (event) => {
  console.log("clicked category button");
  switch (event.target.value) {
    case "Breakfast":
      selectedCategory = "Breakfast";
      console.log("filtering by category breakfast...");
      break;
    case "Lunch":
      selectedCategory = "Lunch";
      console.log("filtering by category lunch...");
      break;
    case "Dinner":
      selectedCategory = "Dinner";
      console.log("filtering by category Dinner...");
      break;
    case "Dessert":
      selectedCategory = "Dessert";
      console.log("filtering by category Dessert...");
      break;
    case "Snacks":
      selectedCategory = "Snack";
      console.log("filtering by category Snacks...");
      break;
    case "Condiments":
      selectedCategory = "Condiment";
      console.log("filtering by category Condiments...");
      break;
  }

  filterRecipesByCategory(selectedCategory);
};

const filterRecipesByCategory = async (selectedCategory) => {
  console.log("creating fetch request to db...");
  const filteredRecipes = await fetch(`/api/recipes/${selectedCategory}`);
  if (filteredRecipes.ok) {
    window.location.replace(`/api/recipes/${selectedCategory}`);
  } else {
    Alert(response.statusText);
  }
};

document

  .querySelector("#loginSubmit")
  .addEventListener("click", loginFormHandler);

// ADD MORE INGREDIENTS BUTTON

document
  .querySelector("#addMoreIngredientsButton")
  .addEventListener("click", addIngredientInputEl);

saveRecipeBtn.addEventListener("click", createRecipeFormHandler);

createAccountBtn.addEventListener("click", createAccountFormHandler);

logoutBtn.addEventListener("click", logoutButtonHandler);

breakfastBtn.addEventListener("click", identifyCategorySearch);
lunchBtn.addEventListener("click", identifyCategorySearch);
dinnerBtn.addEventListener("click", identifyCategorySearch);
dessertBtn.addEventListener("click", identifyCategorySearch);
snacksBtn.addEventListener("click", identifyCategorySearch);
condimentsBtn.addEventListener("click", identifyCategorySearch);
