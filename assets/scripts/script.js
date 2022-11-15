window.onload = () => {
    /* ----------------- Meal Plan Section Start-----------------*/
    let elements = document.getElementsByClassName("meals");
    // function to store meal Id
    function getMealID() {
        let meal_id = this.getAttribute("id");
        localStorage.setItem("meal_plan", meal_id);
         // Display total number of meals to be added in meals
        document.querySelector("#moveToCheckout").innerHTML = "Add " + localStorage.getItem("meal_plan") + " to continue";
    };

    // Add event listener on each meal card
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', getMealID);
    }
    /* ----------------- Meal Plan Section End-----------------*/

    /* ----------------- Date Section Start-----------------*/
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let curr_date = new Date();
    let day_info = 8.64e+7;
    let days_to_monday = 8 - curr_date.getDay();  //Calculate days left to Monday
    let monday_in_sec = curr_date.getTime() + days_to_monday * day_info;  //Get monday in seconds
    let next_monday = new Date(monday_in_sec); //Get Date of Monday

    //Loop to display dates starting from coming Monday
    for (let i = 0; i < 10; i++) {

        // Get Day and Months Name
        const dayName = days[next_monday.getDay() + i];
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
            activeDate = document.getElementsByClassName("date_list_item");
            for (i = 0; i < activeDate.length; i++) {
                activeDate[i].className = activeDate[i].className.replace(" active", "");
            }
            e.currentTarget.className += " active";
      
            // Storing Date 
            localStorage.setItem("selectedDate", selectedDate);

            //  Get selected date
            localStorage.getItem("selectedDate");
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
            //Display card content inside template
            for (let product of products) {
                var mealContent = document.getElementById("menu_template").content;
                var Meal_card_content = document.importNode(mealContent, true);
                Meal_card_content.querySelector(".card-img-top").src = product.img;
                Meal_card_content.querySelector(".card-title").textContent = product.title;
                Meal_card_content.querySelector(".card-text").textContent = product.description;
                if (product.additional_cost.length > 0) {
                    Meal_card_content.querySelector(".additional_cost").textContent = `+$${product.additional_cost}`;
                }
                Meal_card_content.querySelector(".calories").textContent = product.calories;
                //add product to cart on click
                Meal_card_content.querySelector(".addBtn").addEventListener("click", function (e) {
                    addToCart(product.id, product.title, product.additional_cost, product.cost, product.cart_img)
                })
                document.getElementById("meals_container").appendChild(Meal_card_content);

            }
        })

    let itemcount = 0;
    let subtotal = 0;
    let mealCart = [];
    function addToCart(productId, producTitle, additional_cost, productCost, cart_img) {
        itemcount++;
        subtotal = subtotal+ Number(productCost) + Number(additional_cost);
        subtotal.toFixed(2)
        //add products to mealCart array
        let products = {
            id: productId,
            title: producTitle,
            additionalCost: additional_cost,
            imgUrl: cart_img,
            cost: productCost,
            productCount: 1
        };
        //update product count if product already exists
        let product = productInCart(products.id);
        if (product == -1) {
            mealCart.push(products);
        } else {
            mealCart[product].productCount += 1;
        }
         // add meals to cart template
        let cartContent = document.getElementById("cart_template").content;
        let cartItemsTemplate = document.importNode(cartContent, true);
        cartItemsTemplate.querySelector(".cart_img").src = products.imgUrl;
        cartItemsTemplate.querySelector(".item_title").textContent = products.title;

        if (products.additionalCost.length > 0) {
            cartItemsTemplate.querySelector(".additional_cost").textContent = `+$${products.additionalCost}`;
        }
        // Add meals
        cartItemsTemplate.querySelector(".addIcon").addEventListener("click", function (e) {
            console.log("add button clicked")
            addToCart(productId, producTitle, additional_cost, productCost, cart_img)
        });
        // remove meals
        cartItemsTemplate.querySelector(".minusIcon").addEventListener("click", function (e) {
            removeFromCart(e, productId, productCost, additional_cost);
        });
        document.getElementById("mealsInCart").appendChild(cartItemsTemplate);
        //update cart
        updateCart();
        //add order summary
        addOrderSummary(subtotal, itemcount);
        // button for next section
        nextButton();
        // update summary in checkout
        updatCheckoutSummary()
  
    }
    function removeFromCart(e, id, cost, additionalCost) {
        itemcount--;
        subtotal =subtotal- (Number(cost) + Number(additionalCost));
        subtotal.toFixed(2)
        var element = e.target;
        // remove parent element if delete button clicked
        element.parentElement.parentElement.parentElement.parentElement.remove();
        //update product count 
        let count = productInCart(id);
        if (mealCart[count].productCount > 1) {
            mealCart[count].productCount--;
        } else {
            mealCart.splice(count, 1);
        }
        //update cart
        updateCart();
        //update order summary
        updateOrderSummary();
        // button for next section
        nextButton();
        // update summary in checkout
        updatCheckoutSummary()

    }
    //Display order summary in cart section
    function addOrderSummary() {
        document.querySelector("#meal-item-count").innerHTML = itemcount + 'meal';
        document.querySelector("#summary_total").innerHTML = subtotal;
        document.querySelector("#total").innerHTML = subtotal;

    }
    //Update order summary in cart section
    function updateOrderSummary() {
        if (itemcount <= 0 && subtotal <= 0) {
            document.querySelector("#meal-item-count").innerHTML = "";
            document.querySelector("#summary_total").innerHTML = "";
            document.querySelector("#total").innerHTML = "";
        }
        else {
            document.querySelector("#meal-item-count").innerHTML = itemcount + 'meal';
            document.querySelector("#summary_total").innerHTML = subtotal;
            document.querySelector("#total").innerHTML = subtotal;
        }

    }
    //Update cart
    function updateCart() {
        // get meal count
        let mealPlan = Number(localStorage.getItem("meal_plan"));
        let message = "";
        document.querySelector("#itemCount").innerHTML = itemcount;
        document.querySelector("#total_amount").innerHTML = subtotal;
        // Message to be displayed if all meals are selected
        if (itemcount === mealPlan) {
            document.querySelector("#moveToCheckout").innerHTML = "Next";
        }
          // Message to be displayed for remaining meals
        else if (itemcount < mealPlan) {
            message = "Add " + (mealPlan - itemcount) + " to continue "
            document.querySelector("#moveToCheckout").innerHTML = message;
        }
    }
    
    // move to next checkout section
    function nextButton() {
        if (itemCount === Number(localStorage.getItem("meal_plan"))) {
            document.querySelector("#moveToCheckout").disabled=false;
                  //display meals in checkout section
        } else {
            document.querySelector("#moveToCheckout").disabled = true;
        }
              //display meals in checkout section
              displayMeals();
    }
    // update and display summary in checkout
    function updatCheckoutSummary(){
        document.getElementById("totelItems").innerHTML = itemcount;
        document.getElementById("priceWithoutShipping").innerHTML = subtotal;
        // calculate total with shipping
        totalWithShipping = (9.99 + Number(subtotal)).toFixed(2)
        document.getElementById("priceWithShipping").innerHTML = totalWithShipping;
    }
       // Function to check if product is already in cart
       function productInCart(id) {
        for (let i = 0; i < mealCart.length; i++) {
            if (mealCart[i].id == id) {
                return i;
            }
        }
        return -1;
    }
    // display meals at checkout
    function displayMeals(){
        let checkoutMealSection = document.getElementById("checkout_meals").content;
     
        // iterate mealCart for each meal selected
        for(let i=0;i<mealCart.length;i++){
            let checkoutMealTemplate = document.importNode(checkoutMealSection, true);
            checkoutMealTemplate.querySelector(".mealCount").textContent=mealCart[i].count;
            checkoutMealTemplate.querySelector(".checkoutMealImg").src = mealCart[i].imgUrl;
            checkoutMealTemplate.querySelector(".checkout_meal_title").textContent = mealCart[i].title
            document.getElementById("my_meals").appendChild(checkoutMealTemplate);
        }
        
    }
    /* ----------------- Meals Cart Section End-----------------*/


    /*-----------------Checkout Section Start-------------*/

    //Add Promo code
    let addPromoBtn = document.getElementById("promoLink");
    let promoTextField = document.getElementById("addPromo");
    addPromoBtn.addEventListener("click", function () {
        addPromoBtn.style.display = "none";
        promoTextField.style.display = "block";
        promoTextField.addEventListener("keypress", (e) => {
            if (e.target.value != "" && e.key === "Enter") {
                promoTextField.style.display = "none";
                addPromoBtn.style.display = "block";
            }
        })
    })

    // Add Gift Card
    let addGiftCard = document.getElementById("giftCardLink");
    let giftCardTextField = document.getElementById("addGiftCard");
    addGiftCard.addEventListener("click", function () {
        addGiftCard.style.display = "none";
        giftCardTextField.style.display = "block";
        giftCardTextField.addEventListener("keypress", (e) => {
            if (e.target.value != "" && e.key === "Enter") {
                giftCardTextField.style.display = "none";
                addGiftCard.style.display = "block";
            }
        })
    }, { once: true })
    /* ----------------- Form Validation Section start-----------------*/
    // getting form inputs
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const address1 = document.getElementById("address1");
    const city = document.getElementById("city");
    const contactNumber = document.getElementById("phone-num");
    const email = document.getElementById("email");
    const btn = document.querySelector("#submit_btn");

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
        event.preventDefault()
        console.log("inside func")
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