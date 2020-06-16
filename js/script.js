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
  errorDiv.style.color =  'red';
  document.querySelector(location).appendChild(errorDiv);
};


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
  const activities = document.querySelector('.activities');
  const checkboxes = document.querySelectorAll('.activities input');
  
  activities.addEventListener('change', (event) => {
    const clicked = event.target;
    const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    tallyTotal(clicked);

    for (let i = 0; i < checkboxes.length; i++) {
      const checkboxDayAndTime = checkboxes[i].getAttribute('data-day-and-time');
    
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

  // Displays payment sections based on the payment option chosen in the select menu.
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
  let output;
  if (!cb(input)) {
    input.style.borderColor = 'red';
    output = false; 
  } else {
    input.style.borderColor = 'white';
    output = true; 
  }
  return output;
};

const nameVerify = name => name.value.length > 0;
const nameValidator = (name, cb) => addOutline(name, cb);

const emailVerify = email => {
  const atSymbolIndex = email.value.indexOf('@');
  const dotSymbolIndex = email.value.lastIndexOf('.');
  return atSymbolIndex > 1 && dotSymbolIndex > atSymbolIndex + 1 ? true : false; 
};

const emailValidator = cb => {
  const email = document.querySelector('#mail');
  return addOutline(email, cb);
};

const ccNumVerify = input => input.value.length > 13 && input.value.length < 16;

const ccZipVerify = input => input.value.length === 5; 
    
const ccCvvVerify = input => input.value.length === 3;

const ccValidator = input => {
  if (input.id === 'cc-num') {
    if (!addOutline(input, ccNumVerify)) {
      addErrorMsg('#credit-card', 'Please enter a valid credit card number.');
    }
  } else if (input.id === 'zip') {
    if (!addOutline(input, ccZipVerify)) {
      addErrorMsg('#credit-card', 'Please enter a valid 5 digit zipcode.');
    }
  } else if (input.id  === 'cvv') {
    if (!addOutline(input, ccCvvVerify)) {
      addErrorMsg('#credit-card', 'Please enter a valid 3 digit CVV');
    }
  } 
};

// Form Validation Messages
form.addEventListener('submit', (event) => {
  currentErrors = document.querySelectorAll('.errmsg');
  for (let i = 0; i < currentErrors.length; i++) {
    const errParent = currentErrors[i].parentNode;
    errParent.removeChild(currentErrors[i]);
  }
  
  if (!nameValidator(nameInput, nameVerify)) {
    addErrorMsg('fieldset', 'Please enter your fullname.');
    event.preventDefault();
  }
  if (!emailValidator(emailVerify)) {
    addErrorMsg('fieldset', 'Please enter a valid email address.');
    event.preventDefault();
  } 
  
  let total = document.querySelector('.fees');
  
  if (!total.textContent.length) {
    addErrorMsg('.activities', 'Please select at least one activity.');
    event.preventDefault();
  }
  
  if (document.getElementById('payment').selectedIndex === 1) {
    const ccInputs = document.querySelectorAll('div > input');
    for (let i = 0; i < ccInputs.length; i++) {
      ccValidator(ccInputs[i]);
    }
  } 

  if (currentErrors.length > 0) {
    event.preventDefault();
  } 
});
