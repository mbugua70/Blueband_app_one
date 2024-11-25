var localStore = window.localStorage;
function prefill() {

  names = localStore.getItem("name");
  phone = localStore.getItem("phone");
  locations = localStore.getItem("locations");


  console.log(names);
  var swalContinue = true;
  if (!names || !phone || !locations ) {
    appNotifier("Please register to Continue!");
    swalContinue = false;
    setTimeout(function () {
      location.href = "../component/registration.html";
    }, 2000);
  } else {
    $(".preloader_element").css("display", "inline-block");
    setTimeout(() => {

      $("#ba_name").text(names);
      $("#ba_phone").text(phone);
      $("#ba_location").text(locations);

    }, 1000);


  }
}

prefill();

function appNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
}
