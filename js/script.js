// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. 
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
nameInput.focus();

// Add an “Other” option to the Job Role section
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

// Generates and adds an error Msg to section
const addErrorMsg = (location, msg) => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'errmsg';
  errorDiv.textContent = msg;
  errorDiv.style.color = 'red';
  document.querySelector(location).appendChild(errorDiv);
};

/*
When the form is initially loaded, we need to update the "Design" and "Color" fields so that it's clear to the user that they need to select a theme before selecting a color. 
Use javaScript to:
*/

// T-shirt Info Section
const addTshirtSection = () => {
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
};

addTshirtSection();

const addTotal = () => {
  // Selects and adds tally to Activities section
  const activities = document.querySelector('.activities');
  const total = document.createElement('p');
  total.className = 'fees';
  activities.appendChild(total);
};

addTotal();

let totalCost = 0;
const tallyTotal = (clicked) => {
  
  const clickedCost = +clicked.getAttribute('data-cost');
  // Selects and Updates total tally
  
  const total = document.querySelector('.fees');
  if (clicked.checked) {
    totalCost += clickedCost;
  } else {
    totalCost -= clickedCost;
  }
  total.textContent = `Total: $${totalCost}`;
  return totalCost;
};

const addActivities = () => {
  // Register for Activities Section
  const activities = document.querySelector('.activities');
  const checkboxes = document.querySelectorAll('.activities input');
  
  // Event listener for Activities checkboxes
  activities.addEventListener('change', (event) => {
    const clicked = event.target;
    const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    tallyTotal(clicked);

    for (let i = 0; i < checkboxes.length; i++) {
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
  const paymentMenu = document.getElementById('payment');
  paymentMenu.selectedIndex = 1;
  const paymentDivs = document.querySelectorAll('fieldset > div');
  paymentMenu[0].disabled = true;

  for (let i = 1; i < paymentDivs.length; i++) {
    if (paymentDivs[paymentMenu.selectedIndex] === paymentDivs[i]) {
      paymentDivs[i].style.display = '';
    } else {
      paymentDivs[i].style.display = 'none';
    }
  }

  // Display payment sections based on the payment option chosen in the select menu.
  paymentMenu.addEventListener('change', (event) => {
    let paymentOption = event.target.value;
    for (let i = 0; i < paymentDivs.length; i++) {
      if (paymentOption.startsWith(paymentDivs[i].className.substr(0, 3))) {
        paymentDivs[i].style.display = '';
      } else {
        paymentDivs[i].style.display = 'none';
      }
    }
  });
};

addPaymentSection();

// Form Validation
const addOutline = (input, cb) => {
  if (!cb(input)) {
    input.style.borderColor = 'red';
  } else {
    input.style.borderColor = 'white';
  }
};

const nameInputCheck = input => input.value.length > 0;

const nameValidator = name => {
  addOutline(name, nameInputCheck);
  return nameInputCheck(name);
};

const emailVerify = email => {
  const atSymbolIndex = email.value.indexOf('@');
  const dotSymbolIndex = email.value.lastIndexOf('.');
  return atSymbolIndex > 1 && dotSymbolIndex > atSymbolIndex + 1 ? true : false; 
};

const emailValidator = () => {
  // 1. Create a variable to store the `.value` of the `email` input and log it out
  const email = document.querySelector('#mail');
  addOutline(email, emailVerify);
  return emailVerify(email);
};

const ccNumVerify = input => {
  return input.value.length > 13 && input.value.length < 16;
};

const ccZipVerify = input => {
  return input.value.length === 5;
};

const ccCvvVerify = input => {
  return input.value.length === 3;
};

const ccValidator = input => {
  if (input.id === 'cc-num' && !ccNumVerify(input)) {
    addErrorMsg('#credit-card', 'Please enter a valid credit card number.');
    addOutline(input, ccNumVerify);
  } 
  if (input.id === 'zip' && !ccZipVerify(input)) {
    addErrorMsg('#credit-card', 'Please enter a valid 5 digit zipcode.');
    addOutline(input, ccZipVerify);
  } 
  if (input.id === 'cvv' && !ccCvvVerify(input)) {
    addErrorMsg('#credit-card', 'Please enter a valid 3 digit CVV');
    addOutline(input, ccCvvVerify);
  } 
};
    
// Form Validation Messages
form.addEventListener('submit', (event) => {
  if (!nameValidator(nameInput)) {
    event.preventDefault();
    addErrorMsg('fieldset', 'Please enter your fullname.');
  }
  if (!emailValidator()) {
    event.preventDefault();
    addErrorMsg('fieldset', 'Please enter a valid email address.');
  } 
  
  let total = document.querySelector('.fees').textContent;
  if (!total.length) {
    event.preventDefault();
    addErrorMsg('.activities', 'Please select at least one activity.');
  } 
  
  if (document.getElementById('payment').selectedIndex === 1) {
    const ccInputs = document.querySelectorAll('div > input');
    for (let i = 0; i < ccInputs.length; i++) {
      event.preventDefault();
      if(!ccValidator(ccInputs[i])){
        event.preventDefault();
      }
    }
  } 
});
