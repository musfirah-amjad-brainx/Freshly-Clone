window.onload = () => {
    // $('#pageSteps').steps({
    //   stepSelector: '.step-steps > li',
    //   contentSelector: '.step-content > .step-tab-panel',
    //   footerSelector: '.step-footer',
    //   buttonSelector: 'button',
    //   activeClass: 'active',
    //   doneClass: 'done',
    //   errorClass: 'error'
    // });
//     var mySteps = $('#pageSteps').steps();
// steps_api = steps.data('plugin_Steps');

    /* ----------------- Meal Plan Section End-----------------*/

    var elements = document.getElementsByClassName("meals");

    // function to store meal Id
    var getMealID = function () {
        var meal_id = this.getAttribute("id");
        localStorage.setItem("meal_plan", meal_id);
        var no_of_meals = localStorage.getItem("meal_plan");
        console.log(no_of_meals);
        document.querySelector('#pageSteps > div.actions.clearfix > ul > li:nth-child(2) > a').click();
        steps_api.next();
    };

    // Add event listener on each meal card
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', getMealID);
    }

    /* ----------------- Meal Plan Section End-----------------*/

    /* ----------------- Date Section Start-----------------*/
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var curr_date = new Date();
    var day_info = 8.64e+7;
    var days_to_monday = 8 - curr_date.getDay();  //Calculate days left to Monday
    var monday_in_sec = curr_date.getTime() + days_to_monday * day_info;  //Get monday in seconds
    var next_monday = new Date(monday_in_sec); //Get Date of Monday

    console.log(next_monday);
    //Loop to display dates starting from coming Monday
    for (let i = 0; i < 10; i++) {

        // Get Day and Months Name
        const dayName = days[next_monday.getDay() + i];
        console.log(dayName)
        const monthName = months[next_monday.getMonth()]
        const mm = next_monday.getMonth() + i + 1;

        let new_day = `<b>${dayName}</b>` + ", " + monthName + " " + mm

        // Create Lists to display dates
        let ul = document.getElementById("date_list");
        let li = document.createElement("li");
        li.classList.add("date_list_item")
        li.innerHTML = new_day;

        // append li to ul
        ul.append(li);

        // Add event listner when li is clicked
        li.addEventListener("click", function (e) {
            selectedDate = li.innerHTML

            //change style of selected li
            this.style.borderLeft = "5px solid #3176fd"
            this.style.backgroundColor = "#fffdf7"
            localStorage.clear();
            // Storing Date 
            localStorage.setItem("selectedDate", selectedDate);

            //  Get selected date
            localStorage.getItem("selectedDate");
            console.log(localStorage.getItem("selectedDate"))
            let delivery_date = document.querySelector("#first_delivery_date")

            let first_delivery_date = " ";
            // displaying date below lists
            first_delivery_date = `
                                    <p>First Delivery Date: <span>${localStorage.getItem("selectedDate")}</span></p>
            `
            delivery_date.innerHTML = first_delivery_date;

            let displayDate = document.querySelector("#delivery-date");


            //displaying date on cart header
            first_delivery_date =
                `  <p>My delivery for: <span>${localStorage.getItem("selectedDate")} </span></p>`
            displayDate.innerHTML = first_delivery_date;

        })

    }
    /* ----------------- Date Section End-----------------*/

    /* ----------------- Meals Cart Section Start-----------------*/
    // Fetch Meal Menu
    fetch("assets/scripts/menu.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            console.log("hello")
            //Display card content inside template
            for (let product of products) {
                var mealContent = document.getElementById("menu_template").content;
                var copyHTML = document.importNode(mealContent, true);
                copyHTML.querySelector(".card-img-top").src = product.img;
                copyHTML.querySelector(".card-title").textContent = product.title;
                copyHTML.querySelector(".card-text").textContent = product.description;
                if (product.additional_cost.length > 0) {
                    copyHTML.querySelector(".additional_cost").textContent = `+$${product.additional_cost}`;
                }
                copyHTML.querySelector(".calories").textContent = product.calories;
                //add product to cart on click
                copyHTML.querySelector(".addBtn").addEventListener("click", function (e) {
                    addToCart(product.img, product.title, product.description, product.additional_cost, product.cost, product.cart_img)
                })
                document.getElementById("meals_container").appendChild(copyHTML);

            }
        })

    //initialize itemCount and subtotal
    var itemCount = 0;
    var subtotal = 0;
    var continueBtn = document.querySelectorAll(".continueToCheckout");
    continueBtn.disabled = true;
    function addToCart(productImg, title, description, additional_cost, cost, cart_img) {

        //--------- Cart Content template--------------
        var cartContent = document.getElementById("cart_template").content;
        var copyHTML = document.importNode(cartContent, true);
        copyHTML.querySelector(".cart_img").src = cart_img;
        copyHTML.querySelector(".item_title").textContent = title;

        if (additional_cost.length > 0) {
            copyHTML.querySelector(".additional_cost").textContent = `+$${additional_cost}`;
        }
        // Increment Meals
        copyHTML.querySelector(".addIcon").addEventListener("click", function (e) {
            console.log("add button clicked")
            addToCart(productImg, title, description, additional_cost, cost, cart_img)
        });
        // Remove Meals
        copyHTML.querySelector(".minusIcon").addEventListener("click", function (e) {
            removeMeal(e, cost, additional_cost, subtotal);
        });
        document.getElementById("mealsInCart").appendChild(copyHTML);

        // Display Cart Item Count
        displayItemCount();
        // Display Subtotal
        displaySubTotal(cost, additional_cost);
        // Display Final Order Details on Checkout
        finalOrder(title, itemCount, cart_img)
    }

    function removeMeal(e, cost, additional_cost, subtotal) {
        console.log("Hello from remove Func")
        var element = e.target;
        element.parentElement.parentElement.parentElement.parentElement.remove();

        let itemC = localStorage.getItem("itemCount");
        console.log(itemC)
        itemC = itemC - 1;
        console.log(itemC)
        localStorage.setItem("itemCount", itemCount)
        subtotal = Number(subtotal) - (Number(cost) + Number(additional_cost));
        localStorage.setItem("subtotal", subtotal);
    }
    function finalOrder(title, itemCount, cart_img) {
        var cartContent = document.getElementById("checkout_meals").content;
        var copyHTML = document.importNode(cartContent, true);
        copyHTML.querySelector(".quantity").textContent = itemCount;
        copyHTML.querySelector(".checkoutImg").src = cart_img;
        copyHTML.querySelector(".checkout_title").textContent = title;

        document.getElementById("my_meals").appendChild(copyHTML);
    }
    // Function to increment and display meals
    function displayItemCount() {
        itemCount = itemCount + 1
        localStorage.setItem("itemCount", itemCount);
        let counter = localStorage.getItem("itemCount")
        document.getElementById("itemCount").innerHTML = counter

        // ---Display remaining number of meals to be added in cart
        total_no_of_meals = localStorage.getItem("meal_plan");
        let remaining = Number(total_no_of_meals) - Number(itemCount);
        document.getElementById("remaining_items").innerHTML = remaining;

        if (itemCount == total_no_of_meals) {
            continueBtn.disabled = false;
        }
        return itemCount;
    }
    // Function to calculate and display total
    function displaySubTotal(cost, additional_cost) {
        //Display total amount
        subtotal = (Number(subtotal) + Number(cost) + Number(additional_cost)).toFixed(2);
        localStorage.setItem("subtotal", subtotal);
        let total = localStorage.getItem("subtotal")
        document.getElementById("total_amount").innerHTML = total;

        // Display Total Price in Checkout Section
        document.getElementById("totelItems").innerHTML = itemCount;
        document.getElementById("priceWithoutShipping").innerHTML = total;
        totalWithShipping = 9.99 + Number(total)
        document.getElementById("priceWithShipping").innerHTML = totalWithShipping;
    }

    /* ----------------- Meals Cart Section End-----------------*/


    /*-----------------Checkout Section Start-------------*/
    addPromoBtn = document.getElementById("addPromo");
    addPromoBtn.addEventListener("click", function () {
        let NewInputBox = document.createElement("div");
        let newBtn=document.createElement("btn");


        // Then add the content (a new input box) of the element.
        NewInputBox.innerHTML = "<input type='text' id='newInputBox' class='form-control'> ";
        newBtn.innerHTML=`<button class="btn" id="apply-button">Apply</button>`

        // Finally put it where it is supposed to appear.
        addPromoBtn.appendChild(NewInputBox,newBtn);
    }, { once: true })

    /* ----------------- Form Validation Section start-----------------*/
    // getting form inputs
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const address1 = document.getElementById("address1");
    const city = document.getElementById("city");
    const contactNumber = document.getElementById("phone-num");
    const email = document.getElementById("email");
    const btn = document.getElementById("next-button");

    //adding event listener to call functions for validation
    firstName.addEventListener("focusout", validateFirstName)
    lastName.addEventListener("focusout", validateLastName)
    address1.addEventListener("focusout", validateAddress1)
    city.addEventListener("focusout", validateCity)
    contactNumber.addEventListener("focusout", validateContactNumber)
    email.addEventListener("focusout", validateEmail)
    btn.addEventListener("click", validateInput)

    // function to validate first name
    function validateFirstName() {
        let _firstName = firstName.value;
        if (_firstName.length <= 0) {
            document.getElementById("fnameerrorMsg").innerHTML = "Can't be blank";
        }
        else {
            document.getElementById("fnameerrorMsg").innerHTML = " ";
            return true
        }
    }
    // function to validate last name
    function validateLastName() {
        let _lastName = lastName.value;
        if (_lastName.length <= 0) {
            document.getElementById("lnameerrorMsg").innerHTML = "Can't be blank";
        }
        else {
            document.getElementById("lnameerrorMsg").innerHTML = " ";
            return true
        }
    }
    // function to validate address
    function validateAddress1() {
        let _address1 = address1.value;
        // reg exp to validate address
        const addressRegEx = /^[a-zA-Z0-9\s,'-]*$/;
        if (_address1.length <= 0 || !(_address1.match(addressRegEx))) {
            document.getElementById("addresserrorMsg").innerHTML = "Can't be blank";
        }
        else {
            document.getElementById("addresserrorMsg").innerHTML = " ";
            return true

        }
    }

    // function to validate city
    function validateCity() {
        let _city = city.value;
        if (_city.length <= 0) {
            document.getElementById("cityerrorMsg").innerHTML = "Can't be blank";
        }
        else {
            document.getElementById("cityerrorMsg").innerHTML = " ";
            return true
        }
    }
    // function to validate contact number
    function validateContactNumber() {
        let _contactNumber = contactNumber.value;
        if (_contactNumber.length < 10) {
            document.getElementById("contacterrorMsg").innerHTML = "Is not a valid phone number. Please enter a 10-digit phone number.";
        }
        else {

            document.getElementById("contacterrorMsg").innerHTML = " ";
            return true
        }
    }
    // function to validate email
    function validateEmail() {
        let _email = email.value;
        // reg exp to validate email
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (_email.length <= 0 || !(_email.match(emailRegEx))) {
            document.getElementById("emailerrorMsg").innerHTML = "Can't be blank";
        }
        else {
            document.getElementById("emailerrorMsg").innerHTML = " ";
            return true

        }

    }
    function validateInput() {
        if (validateFirstName() && validateLastName() && validateCity() && validateAddress1() && validateEmail() && validateContactNumber()) {
            alert("successfully submitted!")
            document.getElementById("myForm").reset();

        }
        else {
            // else display error
            validateFirstName(); validateLastName(); validateCity(); validateAddress1(); validateEmail(); validateContactNumber();
        }

    }
    /* ----------------- Form Validation Section End-----------------*/

}