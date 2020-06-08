// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. Add an “Other” option to the Job Role section

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');

// Generates and adds an error Msg to section
const addErrorMsg = (location, msg) => {
  const position = document.querySelector(location);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'errmsg';
  errorDiv.textContent = msg;
  
  position.appendChild(errorDiv);
  let errorMessages = document.querySelectorAll('.errmsg');
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].style.color = 'red';
  }
};

nameInput.focus();

const otherInput = document.querySelector('#other-title');
otherInput.style.display = 'none';

const jobTitles = document.querySelector('#title');
jobTitles.addEventListener('change', (event) => {
  if (event.target.value === 'other') {
    otherInput.style.display = '';
  } else {
    otherInput.style.display = 'none';
  }
});

/*
When the form is initially loaded, we need to update the "Design" and "Color" fields so that it's clear to the user that they need to select a theme before selecting a color. Use javaScript to:
*/

// T-shirt Info Section
  
  // ● Hide the “Select Theme” `option` element in the “Design” menu.
  const designMenu = document.querySelector('#design');
  const selectTheme = designMenu.firstElementChild;
  selectTheme.hidden = true;

  // ● Update the “Color” field to read “Please select a T-shirt theme”.
  const colorMenu = document.querySelector('#color');
  let colorOptions = colorMenu.options;
  const firstOption = colorMenu.firstElementChild;

  const selectColor = document.createElement('option');
  selectColor.textContent = "Please select a T-shirt theme";
  colorMenu.insertBefore(selectColor, firstOption);
  colorMenu.selectedIndex = 0;

  // ● Hide the colors in the “Color” drop down menu.
  for (let i = 0; i < colorOptions.length; i++) {
    colorOptions[i].style.display = 'none';
  }

  const showThemeColors = (regex, colorOptions) => {
    for (let i = 0; i < colorOptions.length; i++) {
      let colorString = colorOptions[i].textContent;
      if (regex.test(colorString)) {
        colorOptions[i].style.display = '';
      } else {
        colorOptions[i].style.display = 'none';
      }
    }
  };

  designMenu.addEventListener('change', (event) => {
    if (event.target.value === 'js puns') {
      colorMenu.selectedIndex = 1;
      showThemeColors(/JS Puns/, colorOptions);
    } 
    if (event.target.value === 'heart js') {
      colorMenu.selectedIndex = 4;
      showThemeColors(/I ♥ JS/, colorOptions);
    } 
  });


// Register for Activities Section
const checkboxes = document.querySelectorAll('.activities input');
let totalCost = 0;

const addTotal = () => {
  const activities = document.querySelector('.activities');
  const total = document.createElement('p');
  total.className = 'fees';
  activities.appendChild(total);
};

addTotal();

const tallyTotal = (clicked, clickedCost) => {
  if (clicked.checked) {
    totalCost += clickedCost;
  } else {
    totalCost -= clickedCost;
  }
  return totalCost;
};

const addActivities = () => {
  const activities = document.querySelector('.activities');
  
  // Event listener for Activities checkboxes
  activities.addEventListener('change', (event) => {
    const clicked = event.target;
    const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    const clickedCost = +clicked.getAttribute('data-cost');
  
  // Selects and adds total tally to Activities section
  const total = document.querySelector('.fees');
  total.textContent = `Total: $${tallyTotal(clicked, clickedCost)}`;
  
  for (let i = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i]);
    const checkboxDayAndTime = checkboxes[i].getAttribute('data-day-and-time');
    // This disables activities that are scheduled at the same time
    if (clicked !== checkboxes[i] && clickedDayAndTime === checkboxDayAndTime) {
      if (clicked.checked) {
        checkboxes[i].disabled = true;
        checkboxes[i].parentNode.style.textDecoration = "line-through";
      } else {
        checkboxes[i].disabled = false;
        checkboxes[i].parentNode.style.textDecoration = "none";
      }
    } 
  }
});
};

addActivities();

// Payment Section
const addPaymentSection = () => {
  //  Display payment sections based on the payment option chosen in the select menu.
  const paymentMenu = document.getElementById('payment');
  const paymentOptions = paymentMenu.options;

  // The "Credit Card" payment option should be selected by default. 
  paymentMenu.selectedIndex = 1;

  // Display the `#credit-card` div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
  const paymentDivs = document.querySelectorAll('fieldset > div');

  // Disable "Select Payment Method" option.
  paymentOptions[0].disabled = true;
  
  for (let i = 1; i < paymentDivs.length; i++) {
    if (paymentDivs[paymentMenu.selectedIndex] === paymentDivs[i]) {
      paymentDivs[i].style.display = '';
    } else {
      paymentDivs[i].style.display = 'none';
    }
  }

  // Display payment sections based on the payment option chosen in the select menu.
  paymentMenu.addEventListener('change', (event) => {
    for (let i = 1; i < paymentDivs.length; i++) {
      if (event.target.value.startsWith(paymentDivs[i].className.substr(0, 3))) {
        paymentDivs[i].style.display = '';
      } else {
        paymentDivs[i].style.display = 'none';
      }
    }
  });
};

addPaymentSection();

nameInput.addEventListener('change', (event) => {
  if (event.target.value.length > 0) {
    event.target.style.borderColor = 'white';
    console.log(`Hello, ${event.target.value}!`);
  } else {
    event.target.style.borderColor = 'red';
    console.log('Please enter your name.');
  }
});



  // 1. Create a variable to store the `.value` of the `email` input and log it out

  const email = document.querySelector('#mail');

  // const isValidEmail = email => {
  //   return /[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  // };

  const emailValidator = emailElement => {
    const emailInput = emailElement.value;
    // 3. Create a variable to store the .indexOf of the `@` in the email value
    const atSymbolIndex = emailInput.indexOf('@');
    
    // 4. Create a variable to store the .lastIndexOf of the `.` in the email value
    const dotSymbolIndex = emailInput.lastIndexOf('.');
    
    // 5. Log out the two variables above
    console.log(atSymbolIndex);
    console.log(dotSymbolIndex );
    
    // 5. Create an if/else statement
    // If the `@` index is greater than one AND the `.` last index is greater than the `@` index + 1, 

    // Set the email's border to white and return true
    // Else, set the email's border to red and return false
    if (atSymbolIndex > 1 && dotSymbolIndex > atSymbolIndex + 1) {
      emailElement.style.borderColor = 'white';
      return true;
    } else {
      emailElement.style.borderColor = 'red';
      return false;
    }

  };

  form.addEventListener('submit', (event) => {

    
    if (!emailValidator(email)) {
      event.preventDefault();
      console.log(event.target.firstElementChild);
      addErrorMsg('fieldset', 'Please enter a valid email address.');
    } 
    if (totalCost === 0) {
      event.preventDefault();
      addErrorMsg('.activities', 'Please select at least one activity.');
    } 
    
  });

  


  






// Form Validation
// const addFormValidation = () => {

// };

// Form Validation Messages

