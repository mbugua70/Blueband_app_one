const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
// const textArea = document.getElementById("challenge_ch");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const registerButton = document.querySelector("#register_button");
const inputFile = document.getElementById("file");
const registerName = document.getElementById("ba_name");
const registerPhone = document.getElementById("ba_phone");
const registerCounty = document.getElementById("ba_location");


console.log(inputFile);

console.log(form);

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    console.log("working");
    registerBA();
    var varification = validateForm3();
    if (varification) {
      const formData_one = new FormData(form);
      console.log([...formData_one]);

      fetch("https://api4.staging.iguru.co.ke/api/baregister", {
        method: "POST",
        body: formData_one,
      })
        .then((res) => res.json())
        .then((data) => {
          var shouldProceed = true;
          if (!data.error) {
            workingNotifier("Your details are successfully submitted!");
            shouldProceed = false;
            // errorEl.style.display = "block";
            // errorEl.style.height = "300px";
            setTimeout(function () {
              location.href = "../index.html";
            }, 2000);
          } else {
            console.log(data.error);
          }
        })
        .catch((err) => {
          var shouldProceed = true;
          if (err) {
            appNotifier("Operation has not been completed!");
            shouldProceed = false;
            // errorElTwo.style.display = "block";
            // errorElTwo.style.height = "300px";
            console.log(err);
          }
        });
      inputs.forEach((input) => {
        input.value = "";
      });
      // textArea.value = "";
    }
  },
  false
);

// button.addEventListener(
//   "click",
//   function (e) {
//     errorEl.style.display = "none";
//     errorEl.style.height = "0";
//     window.scrollTo({
//       top: "0px",
//       behavior: "smooth",
//     });
//   },
//   false
// );

var localStore = window.localStorage;
function prefill() {
  // longitude = flashStore.getItem("longitude");
  // latitude = flashStore.getItem("latitude");
  var names = localStore.getItem("name");
  var phone = localStore.getItem("phone");
  var locations = localStore.getItem("locations");

  // group_name = flashStore.getItem("group name");
  // village = flashStore.getItem("village");

  if (!names || !phone || !locations) {
  } else {
    setTimeout(() => {
      // const $registerButton = $("#register_button");
      $("#ba_name").val(names);
      $("#ba_phone").val(phone);
      $("#ba_location").val(locations);

      // $("#register_groupnm").val(group_name);
      // $("#register_village").val(village);
      // $("#register_latitude").val(latitude);
      // $("#register_longitude").val(longitude);
      $("input").css({
        "background-color": "#d6dfe6",
      });
      // registerButton.textContent = "";
      // $registerButton.append(
      //   `<i class="material-icons register_buttons">check</i>`
      // );
    }, 2000);

    // $("#rba_name").text(names);
    // $("#rba_phone").text(phone);
    // $("#rba_region").text(region);
  }
}

prefill();

localStore = window.localStorage;
function validateForm3() {
  var shouldProceed = true;
  // latitude = $("#register_latitude").val();
  // longitude = $("#register_longitude");
  names = $("#ba_name").val();
  phone = $("#ba_phone").val();
  locations = $("#ba_location").val();

  // group_name = $("#register_groupnm").val();
  // village = $("#register_village").val();

  if (!names) {
    appNotifier("Your name is required");
    $("#register_name").focus();
    shouldProceed = false;
  } else if (!phone) {
    appNotifier("Your Phone Number is required");
    $("#register_phone").focus();
    shouldProceed = false;
  } else if (!locations) {
    appNotifier("Location is required");
    $("#ba_locations").focus();
    shouldProceed = false;
  }

  return shouldProceed;
}

function registerBA() {
  var formStatus = validateForm3();
  if (formStatus) {
    // latitude = $("#register_latitude").val();
    // longitude = $("#register_longitude").val();
    names = $("#ba_name").val();
    phone = $("#ba_phone").val();
    locations = $("#ba_location").val();

    // group_name = $("#register_groupnm").val();
    // village = $("#register_village").val();


    localStore.setItem("name", names);
    localStore.setItem("phone", phone);
    localStore.setItem("locations", locations);



  ;
  }
}

function appNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
}

function appLocationNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "error",
  });
}

const workingNotifier = (message) => {
  swal({
    title: message,
    text: "",
    icon: "success",
  });
};


console.log(localStorage);
