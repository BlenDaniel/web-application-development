$(document).ready(function () {
  $("#register-button").click(function () {
    $("#dark").css({ display: "block" });
    $("#Login").slideUp(200);
    $("#Register").slideDown(400).css({ display: "block" });
  });

  $("#button-x1").click(function () {
    $("#Register").slideUp(200);
    $("#dark").css({ display: "none" });
  });

  $("#login-button").click(function () {
    $("#dark").css({ display: "block" });
    $("#Register").slideUp(200);
    $("#Login").slideDown(400).css({ display: "block" });
  });

  $("#button-x2").click(function () {
    $("#Login").slideUp(200);
    $("#dark").css({ display: "none" });
  });
});
