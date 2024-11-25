const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const saleActivity = document.getElementById("gifts");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const salesContacts = document.getElementById("owners_contact");
const errorHiddenSales = document.getElementById("err_hidden_two");
const selectEls = document.getElementById("type_of_shop");
const ownerEl = document.getElementById("owners_name");
const ownerContactEl = document.getElementById("owners_contact");
const ownerElTwo = document.getElementById("label_name_owner");
const ownerElThree = document.getElementById("label_contact_owner");

selectEls.addEventListener("input",function(){
valueOne = $("#retailer_el").val()
valueTwo = $("#retailer_el_two").val();
valueThree = $("#retailer_el_three").val();
valueFour = $("#retailer_el_four").val();
if($("#type_of_shop").val() === valueOne || $("#type_of_shop").val() === valueTwo || $("#type_of_shop").val() === valueThree || $("#type_of_shop").val() === valueFour){
  ownerContactEl.style.display = "block";
  ownerEl.style.display = "block";
  ownerElThree.style.display = "block";
  ownerElTwo.style.display = "block";
}else{
  ownerContactEl.style.display = "none";
  ownerEl.style.display= "none";
  ownerElThree.style.display = "none";
  ownerElTwo.style.display = "none"
}
},false);

console.log(salesContacts);
form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    const formData_one = new FormData(form);
    nameEl = $("#ba_name").text();
    PhoneEl = $("#ba_phone").text();
    locationsEl = $("#ba_location").text();
     registerBaLa = $("#latitude").val();
     registerBaLong = $("#longitude").val();
    //  appending to the formData object created above
    formData_one.append("ba_name", nameEl);
    formData_one.append("ba_phone", PhoneEl);
    formData_one.append("ba_location", locationsEl);
    formData_one.append("latitude",registerBaLa);
    formData_one.append("longitude",registerBaLong)

    console.log([...formData_one]);

    fetch("https://api4.staging.iguru.co.ke/api/bbsale", {
      method: "POST",
      body: formData_one,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          workingNotifier("Your details are successfully submitted!");
          shouldProceed = false;
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        if (err) {
          appNotifier("Operation has not been completed!");
          shouldProceed = false;
          console.log(err);
        }
      });
    inputs.forEach((input) => {
      input.value = "";
    });
    saleActivity.value = "";
    selectEls.value = "";
  },
  false
);

function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}

salesContacts.addEventListener(
  "keyup",
  (e) => {
    if (!validationForm(salesContacts.value)) {
      salesContacts.style.border = "1px solid red";
      errorHiddenSales.style.display = "flex";
    } else {
      salesContacts.style.border = "none";
      errorHiddenSales.style.display = "none";
    }
  },
  false
);
const workingNotifier = (message) => {
  swal({
    title: message,
    text: "",
    icon: "success",
  });
};

function appNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
}
