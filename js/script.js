// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. 
const form = document.querySelector('form');

const errMsgs = {
  'name': 'Please enter your full name',
  'mail': 'Please enter a valid email',
  'activities': 'Please select at least one activity',
  'cc-num': 'Please enter a credit card number.',
  'zip': 'Please enter a valid 5 digit zipcode',
  'cvv': 'Please enter a valid 3 digit CVV'
};

console.log('script.js is connected to browser');

// Add default Err message for each input func
const addInputErrs = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach( input => {
    if (input.type !== 'checkbox') {
      const errSpan = document.createElement('span');
      errSpan.className = input.id;
      errSpan.style.color = 'red';
      errSpan.style.fontSize = '14px';
      errSpan.textContent = errMsgs[`${input.id}`];
      input.parentNode.insertBefore(errSpan, input);
    } 
  });
};

addInputErrs();

const addCheckBoxErr = input => {
  const firstChild = input.firstElementChild;
  const errSpan2 = document.createElement('span');
  errSpan2.id = input.className;
  errSpan2.style.color = 'red';
  errSpan2.style.fontSize = '14px';
  errSpan2.style.marginBottom = '10px';
  errSpan2.textContent = (errMsgs[`${firstChild.parentNode.className}`]);
  return firstChild.parentNode.insertBefore(errSpan2, firstChild);
};

const inputRegex = {
  name : /^[a-zA-Z]+ [a-zA-Z]+$/,
  email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  credit : {
    ccNum: /^\d{13,16}$/,
    zip: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
    cvv: /^[0-9]{3,4}$/
  } 
};

const inputVerify = (input, regex) => {
  const inputErr = document.querySelector(`.${input.id}`);
  if (!regex.test(input.value)) {
    // 'show' error message 
    inputErr.style.display = '';
    input.style.borderColor = 'red';
  } else {
    // 'hide' error message 
    inputErr.style.display = 'none';
    input.style.borderColor = 'white';
  }
};

const checkBoxVerify = input => {
  if (totalCost === 0) {
    input.style.display = '';
    return false;
  } else {
    input.style.display = 'none';
    return true;
  }
};

const basicInfoSection = () => {
  const nameInput = document.getElementById('name');
  nameInput.focus();

  nameInput.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex.name);
  });
  
  const emailInput = document.getElementById('mail');
  
  emailInput.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex.email);
  });
  
  // Add an “Other” option to the Job Role section
  const otherInput = document.querySelector('#other-title');
  otherInput.style.display = 'none';

  const jobTitles = document.getElementById('title');
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

  let checkSpan = addCheckBoxErr(activities);

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
    checkBoxVerify(checkSpan);
  });
};

addActivities();

// Payment Section
const addPaymentSection = () => {
  const ccNum = document.getElementById('cc-num');
  const zip = document.getElementById('zip');
  const cvv = document.getElementById('cvv');

  ccNum.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex.credit.ccNum);
  });
 
  zip.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex.credit.zip);
  });

  cvv.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex.credit.cvv);
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
  const inputs = document.querySelectorAll('input');
  inputs.forEach( input => {
    if (input.style.borderColor === 'red') {
      input.parentNode.scrollIntoView();
      event.preventDefault();
    } else if (input.type === 'checkbox' && totalCost === 0) {
      input.parentNode.parentNode.scrollIntoView();
      event.preventDefault();
    }
  });
});

