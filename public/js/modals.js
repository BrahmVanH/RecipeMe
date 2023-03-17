// $("#viewRecipeBtn").on("click", function () {
//   console.log("triggered");
//   $("viewRecipeModal").modal("options");
// });

// good example
$("#viewRecipeBtn").click(function () {
  $("#viewRecipeModal").click();
});

// get this to function properly.
// $(function() {
// $("#viewRecipeModal").click(function () {
//   $(".btn-close").modal("close");
// });
// }

$("#logInBtn").click(function () {
  console.log("clicked");
  $("#logInModal").click();
});

$(".btn-close").click(function () {
  $("#logInModal").click();
});


$("#createRecipeBtn").click(function () {
  $("#createRecipeModal").click();
});
