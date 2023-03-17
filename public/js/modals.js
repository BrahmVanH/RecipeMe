// $("#viewRecipeBtn").on("click", function () {
//   console.log("triggered");
//   $("viewRecipeModal").modal("options");
// });

// good example
$("#viewRecipeBtn").click(function () {
  $("#viewRecipeModal").click();
});

// get this to function properly.
/*$("#viewRecipeBtn").click(function () {
  $("#closeModal").modal("hide");
});*/

$("#logInBtn").click(function () {
  console.log("clicked");
  $("#logInModal").click();
});


$("#createRecipeBtn").click(function () {
  $("#createRecipeModal").click();
});
