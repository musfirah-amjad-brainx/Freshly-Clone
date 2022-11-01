window.onload = () => {
    // -------------------Meal Plans-------------------

    // var elements = document.getElementsByClassName("meals");

    // var myFunction = function () {
    //     var card_title = this.getAttribute("id");
    //     localStorage.setItem("meal_plan", card_title);
    //     const no_of_meals = localStorage.getItem("meal_plan");
    //     console.log(no_of_meals);
    // };

    // for (var i = 0; i < elements.length; i++) {
    //     elements[i].addEventListener('click', myFunction, false);
    // }

    // var delivery_dates_elements = document.getElementsByClassName("list_items");

    // var getDeliveryDate = function () {
    //     var date = this.getAttribute("li");
    //     console.log(date)
    //     localStorage.setItem("delivery_date", date);
    //     const delivery_date = localStorage.getItem("delivery_date");
    //     console.log(delivery_date);
    // }
    // for (var i = 0; i < delivery_dates_elements.length; i++) {
    //     delivery_dates_elements[i].addEventListener('click', getDeliveryDate, false);
    // }
    //add meals to cart
    const container = document.querySelector('#meals_container')
    const buttons = container.querySelectorAll('button')

var itemCount=0;
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let hex = e.target
    console.log(hex)
    var mealItems = document.getElementsByClassName("meals");

    var getMeals = function () {
        var meal_item = this.getAttribute("id");
        card_title=(this.querySelector(".card-title").innerHTML);
        console.log(card_title)
        card_text=(this.querySelector(".card-img-top")).sr;
        console.log(card_text)
        addToCart(card_title,card_text);
    };

    for (var i = 0; i < mealItems.length; i++) {
        mealItems[i].addEventListener('click', getMeals, false);
    }
    console.log("hello")
    // do something with hex
  })})

  function addToCart(card_title){
   console.log(card_title)
//     itemCount= itemCount+1;
//     console.log(itemCount)
//     console.log(meal_item);
    var selectedItem = document.createElement("div");
    selectedItem.classList.add("cartImg");
    selectedItem.setAttribute("id",itemCount);
    var img=document.createAttribute("img");
    
   img;
    var title=document.createElement("div");
    title.innerText=card_title;
    var cartItems=document.getElementById("title");
    // selectedItem.append(img)
    selectedItem.append(title)
    cartItems.append(selectedItem);
    console.log(cartItems);

  }
  function verifyInputs(){
// -------------------Form Validation---------------
    // getting form inputs
    // const firstName = document.getElementById("fname");
    // const lastName = document.getElementById("lname");
    // const address1 = document.getElementById("address1");
    // const city = document.getElementById("city");
    // const contactNumber = document.getElementById("phone-num");
    // const email = document.getElementById("email");
    // const btn = document.getElementById("next-button");

    // //adding event listener to call functions for validation
    // firstName.addEventListener("focusout", validateFirstName)
    // lastName.addEventListener("focusout", validateLastName)
    // address1.addEventListener("focusout", validateAddress1)
    // city.addEventListener("focusout", validateCity)
    // contactNumber.addEventListener("focusout", validateContactNumber)
    // email.addEventListener("focusout", validateEmail)
    // btn.addEventListener("click", validateInput)

    // // function to validate first name
    // function validateFirstName() {
    //     let _firstName = firstName.value;
    //     if (_firstName.length <= 0) {
    //         document.getElementById("fnameerrorMsg").innerHTML = "Can't be blank";
    //     }
    //     else {
    //         document.getElementById("fnameerrorMsg").innerHTML = " ";
    //         return true
    //     }
    // }
    // // function to validate last name
    // function validateLastName() {
    //     let _lastName = lastName.value;
    //     if (_lastName.length <= 0) {
    //         document.getElementById("lnameerrorMsg").innerHTML = "Can't be blank";
    //     }
    //     else {
    //         document.getElementById("lnameerrorMsg").innerHTML = " ";
    //         return true
    //     }
    // }
    // // function to validate address1
    // function validateAddress1() {
    //     let _address1 = address1.value;
    //     // reg exp to validate address1
    //     const addressRegEx = /^[a-zA-Z0-9\s,'-]*$/;
    //     if (_address1.length <= 0 || !(_address1.match(addressRegEx))) {
    //         document.getElementById("addresserrorMsg").innerHTML = "Can't be blank";
    //     }
    //     else {
    //         document.getElementById("addresserrorMsg").innerHTML = " ";
    //         return true

    //     }
    // }

    // // function to validate citys
    // function validateCity() {
    //     let _city = city.value;
    //     // creating array of multiple citys
    //     if (_city.length <= 0) {
    //         document.getElementById("cityerrorMsg").innerHTML = "Can't be blank";
    //     }
    //     else {
    //         document.getElementById("cityerrorMsg").innerHTML = " ";
    //         return true
    //     }
    // }
    // // function to validate contact number
    // function validateContactNumber() {
    //     let _contactNumber = contactNumber.value;
    //     if (_contactNumber.length < 10) {
    //         document.getElementById("contacterrorMsg").innerHTML = "Is not a valid phone number. Please enter a 10-digit phone number.";
    //     }
    //     else {

    //         document.getElementById("contacterrorMsg").innerHTML = " ";
    //         return true
    //     }
    // }
    // // function to validate email
    // function validateEmail() {
    //     let _email = email.value;
    //     // reg exp to validate email
    //     const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (_email.length <= 0 || !(_email.match(emailRegEx))) {
    //         document.getElementById("emailerrorMsg").innerHTML = "Can't be blank";
    //     }
    //     else {
    //         document.getElementById("emailerrorMsg").innerHTML = " ";
    //         return true

    //     }

    // }
    // function validateInput() {
    //     if (validateFirstName() && validateLastName() && validateCity() && validateAddress1() && validateEmail() && validateContactNumber()) {
    //         alert("successfully submitted!")
    //         document.getElementById("myForm").reset();

    //     }
    //     else {
    //         // else display error
    //         validateFirstName(); validateLastName(); validateCity(); validateAddress1(); validateEmail(); validateContactNumber();
    //     }

    // }
  }
    
//   -----------------Get Data from page-----------

}
