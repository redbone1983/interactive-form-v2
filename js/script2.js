// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. 
const form = document.querySelector('form');
const checkMark = document.createElement('img');
checkMark.src = 'imgs/greencheck.png';
checkMark.width = '15';

const addErrorMsg = (input, msg) => {
  input.setAttribute('placeholder', msg);
};

const inputRegex = {
  name : /^[a-zA-Z]+ [a-zA-Z]+$/,
  email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  credit : {
    ccNum: /^(?:[0-9]{12}(?:[0-9]{3})?)$/,
    zip: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
    cvv: /^[0-9]{3,4}$/
  } 
};

const inputVerify = (input, regex) => {
  if (!regex.test(input.value)) {
    input.focus();
    input.style.borderColor = 'red';
    return false;
  } else {
    input.removeAttribute('placeholder');
    input.style.borderColor = 'white';
    input.parentNode.insertBefore(checkMark, input);
    return true;
  }
};

const nameVerify = name => inputVerify(name, inputRegex.name);
const emailVerify = email => inputVerify(email, inputRegex.email);
const ccNumVerify = ccNum => inputVerify(ccNum, inputRegex.credit.ccNum);
const ccZipVerify = zip => inputVerify(zip, inputRegex.credit.zip);
const ccCvvVerify = cvv => inputVerify(cvv, inputRegex.credit.cvv);

const basicInfoSection = () => {
  // Name
  const nameInput = document.querySelector('#name');
  addErrorMsg(nameInput, 'Please enter your full name');
  
  nameInput.addEventListener('keyup', event => {
    nameVerify(event.target);
  });
  
  // Email
  const emailInput = document.querySelector('#mail');
  addErrorMsg(emailInput, 'Please enter a valid email address');

  emailInput.addEventListener('keyup', event => {
    emailVerify(event.target);
  });
  
  // Job Role
  
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
};

basicInfoSection();

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
  const ccNum = document.getElementById('cc-num');
  const zip = document.getElementById('zip');
  const cvv = document.getElementById('cvv');

  if (ccNum.value.length === 0) {
    addErrorMsg(ccNum, 'Please enter a credit card number.');
  } 
  if (ccNum.value.length > 13 && ccNum.value.length < 16) {
    addErrorMsg(ccNum, 'Please enter a number that is between 13 and 16 digits long.');
  } 

  ccNum.addEventListener('keyup', event => {
    ccNumVerify(event.target);
  });
 
  addErrorMsg(zip, 'Please enter a valid 5 digit zipcode');
  zip.addEventListener('keyup', event => {
    ccZipVerify(event.target);
  });

  addErrorMsg(cvv, 'Please enter a valid 3 digit CVV');
  cvv.addEventListener('keyup', event => {
    ccCvvVerify(event.target);
  });
  
  const paymentMenu = document.getElementById('payment');
  // Selects credit card as default payment option
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


// Form Validation Messages
form.addEventListener('submit', (event) => {
  
  if (!nameValidator(nameInput, nameVerify)) {
    addErrorMsg('fieldset', 'Please enter your fullname.');
    event.preventDefault();
  }
  if (!emailValidator(emailInput, emailVerify)) {
    addErrorMsg('fieldset', 'Please enter a valid email address.');
    event.preventDefault();
  } 
  
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