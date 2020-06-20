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
const addErrorMsg = (input, msg) => {
  input.setAttribute('placeholder', msg);
  // errorDiv.className = 'errmsg';
  // errorDiv.textContent = msg;
  // errorDiv.style.color =  'red';
  // document.querySelector(location).appendChild(errorDiv);
};

addErrorMsg(nameInput, 'Please enter your fullname.');
// addErrorMsg('fieldset', 'Please enter a valid email address.');

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

  // Extra Credit #1 - Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
  const colorSection = document.getElementById('colors-js-puns');
  colorSection.style.display = 'none';

  designMenu.addEventListener('change', (event) => {
    colorSection.style.display = '';

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
const tallyTotal = clicked => {
  
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
  paymentMenu[0].disabled = true;
  paymentMenu.selectedIndex = 1;
  
  const paymentDivs = document.querySelectorAll('fieldset > div');
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
  if (!cb(input)) {
    input.style.borderColor = 'red';
    return false;
  } else {
    input.style.borderColor = 'white';
    return true;
  }
};

const nameVerify = name => name.value.length > 0;
const nameValidator = (name, cb) => addOutline(name, cb);

nameInput.addEventListener('keyup', event => {
  if (nameValidator(event.target, nameVerify)) {
    const nameError = document.querySelector('.errmsg');
    const nameParent = nameError.parentNode;
    nameParent.removeChild(nameError);
  } 
});

const emailVerify = email => {
  const atSymbolIndex = email.value.indexOf('@');
  const dotSymbolIndex = email.value.lastIndexOf('.');
  return atSymbolIndex > 1 && dotSymbolIndex > atSymbolIndex + 1 ? true : false; 
};

const emailValidator = cb => {
  const email = document.querySelector('#mail');
  return addOutline(email, cb);
};

const ccNumVerify = input => {
  if (input.value.length === 0) {
    addErrorMsg('#credit-card', 'Please enter a credit card number.');
    return false;
  } 
  if (input.value.length > 13 && input.value.length < 16) {
    return true;
  } else {
    addErrorMsg('#credit-card', 'Please enter a number that is between 13 and 16 digits long.');
  }
};

const ccZipVerify = input => input.value.length === 5; 
    
const ccCvvVerify = input => input.value.length === 3;

// Form Validation Messages
form.addEventListener('submit', (event) => {
  let currentErrors = document.querySelectorAll('.errmsg');
  for (let i = 0; i < currentErrors.length; i++) {
    const errParent = currentErrors[i].parentNode;
    errParent.removeChild(currentErrors[i]);
  }
  
  // Basic Info Validation
  if (!nameValidator(nameInput, nameVerify)) {
    addErrorMsg('fieldset', 'Please enter your fullname.');
    event.preventDefault();
  }
  if (!emailValidator(emailVerify)) {
    addErrorMsg('fieldset', 'Please enter a valid email address.');
    event.preventDefault();
  } 
  
  // Register for Activities
  let total = document.querySelector('.fees');
  if (!total.textContent.length) {
    addErrorMsg('.activities', 'Please select at least one activity.');
    event.preventDefault();
  } 

  // Payment Info Validation
  if (document.getElementById('payment').selectedIndex === 1) {
    const ccPayment = document.querySelectorAll('div > input');
    ccPayment.forEach( ccInput => {
      if (ccInput.id === 'cc-num' && !addOutline(ccInput, ccNumVerify)) {
        event.preventDefault();
      } else if (ccInput.id === 'zip' && !addOutline(ccInput, ccZipVerify)) {
        addErrorMsg('#credit-card', 'Please enter a valid 5 digit zipcode.');
        event.preventDefault();
      } else if (ccInput.id === 'cvv' && !addOutline(ccInput, ccCvvVerify)) {
        addErrorMsg('#credit-card', 'Please enter a valid 3 digit CVV');
        event.preventDefault();
      } else {
        return;
      }
    });
    
  } 

});

