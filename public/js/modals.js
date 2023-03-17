// $("#viewRecipeBtn").on("click", function () {
//   console.log("triggered");
//   $("viewRecipeModal").modal("options");
// });

// good example
$("#viewRecipeBtn").click(function () {
  $("#viewRecipeModal").click();
});

$("#logInBtn").click(function () {
  console.log("clicked");
  $("#logInModal").click();
});

$(".btn-close").click(function () {
  $("#logInModal").click();
});

$(".btn-close").click(function () {
  $("#signUpModal").click();
});

$("#createRecipeBtn").click(function () {
  $("#createRecipeModal").click();
});

$(".btn-close").click(function () {
  $("#createRecipeModal").click();
});
