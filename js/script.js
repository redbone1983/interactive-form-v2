// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. 
const form = document.querySelector('form');
let creditSelected = true;

const errMsgs = {
  'name': 'Please enter your full name',
  'mail': 'Please enter a valid email',
  'activities': 'Please select at least one activity',
  'cc-num': 'Please enter a credit card number between 13 and 16 digits.',
  'zip': 'Please enter a valid 5 digit zipcode',
  'cvv': 'Please enter a valid 3 digit CVV'
};

// Add default Err message for each input func
const addInputErrs = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach( input => {
    if (input.type !== 'checkbox' && input.id !== 'other-title') {
      const errSpan = document.createElement('span');
      errSpan.className = input.id;
      errSpan.style.color = 'red';
      errSpan.style.fontSize = '14px';
      errSpan.style.display = 'none';
      errSpan.textContent = errMsgs[`${input.id}`];
      input.parentNode.insertBefore(errSpan, input);
      if (input.parentNode.parentNode.id === 'credit-card') {
        input.className = 'credit';
      }
    } 
  });
};

addInputErrs();

const addCheckBoxErr = input => {
  const legend = input.firstElementChild;
  const checkErr = document.createElement('p');
  checkErr.id = 'checkErr';
  checkErr.style.color = 'red';
  checkErr.style.fontSize = '16px';
  checkErr.style.paddingBottom = '15px';
  checkErr.textContent = errMsgs[`${input.className}`];
  checkErr.style.display = 'none';
  legend.parentNode.insertBefore(checkErr, legend);
};

const inputRegex = {
  'name': /^[a-zA-Z]+ [a-zA-Z]+$/,
  'mail': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'cc-num': /^\d{13,16}$/,
  'zip': /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  'cvv': /^[0-9]{3}$/
};

const inputVerify = (input, regex) => {
  const inputErr = document.querySelector(`.${input.id}`);
  let verified = false;
  if (!regex.test(input.value) || input.value.length === 0) {
    inputErr.style.display = '';
    input.style.borderColor = 'red';
  } else {
    inputErr.style.display = 'none';
    input.style.borderColor = 'white';
    verified =  true;
  }
  return verified;
};

const checkBoxVerify = () => {
  let verified = false;
  const err = document.getElementById('checkErr');
  if (totalCost !== 0) {
    err.style.display = 'none';
    verified = true;
  } else {
    err.style.display = '';
  }
  return verified;
};

const verifyAllInputs = inputs => inputs.every(inputVerify);

const basicInfoSection = () => {
  const nameInput = document.getElementById('name');
  nameInput.focus();

  nameInput.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });
  
  const emailInput = document.getElementById('mail');
  
  emailInput.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
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
  const designMenu = document.querySelector('#design');
  const designOptions = designMenu.options;
  
  // Hides the “Select Theme” `option` element in the “Design” menu.
  const selectTheme = designMenu.firstElementChild;
  selectTheme.disabled = true;
  
  const colorMenu = document.querySelector('#color');
  const colorOptions = colorMenu.options;
  
  const showThemeColors = (theme, colorOptions) => {
      for (let i = 0; i < colorOptions.length; i++) {
        if (colorOptions[i].innerText.includes(theme)) {
          colorMenu.selectedIndex = i;
          colorOptions[i].style.display = '';
        } else {
          colorOptions[i].style.display = 'none';
        }
      }
    };

    colorMenu.style.display = 'none';
    
    // Extra Credit #1 - Hide the "Color" label 
    designMenu.addEventListener('change', (event) => {
      // Shows menu when design theme is selected
      colorMenu.style.display = '';
      let userSelect = designOptions[event.target.selectedIndex];
      let designTheme = userSelect.innerText.substring(8, 14);
      showThemeColors(designTheme, colorOptions);
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
  const activitiesFieldset = document.querySelector('.activities');
  const activitiesCheckboxes = document.querySelectorAll('.activities input');

  // Adds Activities Checkbox Err to activitiesFieldset
  addCheckBoxErr(activitiesFieldset);

  // Adds real-time varification to checkboxes
  activitiesFieldset.addEventListener('change', (event) => {
    const clicked = event.target;
    const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    
    // Sums total fee of each activity selected
    tallyTotal(clicked);

    for (let i = 0; i < activitiesCheckboxes .length; i++) {
      const checkboxDayAndTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
    
      if (clicked !== activitiesCheckboxes[i] && clickedDayAndTime === checkboxDayAndTime) {
        if (clicked.checked) {
          activitiesCheckboxes[i].disabled = true;
          activitiesCheckboxes[i].parentNode.style.textDecoration = "line-through";
        } else {
          activitiesCheckboxes[i].disabled = false;
          activitiesCheckboxes[i].parentNode.style.textDecoration = "none";
        }
      } 
    }
    // Shows Checkbox Err if Activity is selected and then deselected
    checkBoxVerify();
  });
};

addActivities();

// Payment Section
const addPaymentSection = () => {
  const ccNum = document.getElementById('cc-num');
  const zip = document.getElementById('zip');
  const cvv = document.getElementById('cvv');

  // Each ccField has its own Event listener that is activated once a user types into the field
  ccNum.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });
 
  zip.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });

  cvv.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });
  
  // Selects payment selection menu
  const paymentSelectionMenu = document.getElementById('payment');
  
  // Selects credit card as default payment option
  paymentSelectionMenu.selectedIndex = 1;

  // Selects payment input divs
  const paymentDivs = document.querySelectorAll('fieldset > div');

  // Disables 'Select Payment Method' option
  paymentSelectionMenu[0].disabled = true;

  // Sets Payment Div view based on default payment Selection
  for (let i = 1; i < paymentDivs.length; i++) {
    if (paymentDivs[paymentSelectionMenu.selectedIndex] === paymentDivs[i]) {
      paymentDivs[i].style.display = '';
    } else {
      paymentDivs[i].style.display = 'none';
    }
  }

  // Displays payment sections based on payment option selected by user
  paymentSelectionMenu.addEventListener('change', (event) => {
    if (event.target.selectedIndex === 1) {
      creditSelected = true;
    } else {
      creditSelected = false;
    }

    let paymentOption = event.target.value;
    // Payment view is showed or hidden based on users selection
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
    if (creditSelected) {
      // Verify all user input values
      if (input.id !== 'other-title' && input.type !== 'checkbox') {
        if (!inputVerify(input, inputRegex[`${input.id}`])) {
          input.parentNode.scrollIntoView();
          console.log(`Input Error is located here: ${input.id}`);
          event.preventDefault();
        }
     }  
     if (input.type === 'checkbox' && !checkBoxVerify()) {
        console.log(`Activities Error Stops Submission.`);
        input.parentNode.parentNode.scrollIntoView();
        event.preventDefault();
     }
     // Otherwise, verify all user input values EXCEPT credit-card values
    } else {
      if (input.id !== 'other-title' && input.type !== 'checkbox') {
        if (input.parentNode.parentNode.id !== 'credit-card') {
          if (!inputVerify(input, inputRegex[`${input.id}`])) {
            input.parentNode.scrollIntoView();
            console.log(`Input Error is located here: ${input.id}`);
            event.preventDefault();
          }
        }
      }
    if (input.type === 'checkbox' && !checkBoxVerify()) {
      console.log(`Activities Error Stops Submission.`);
      input.parentNode.parentNode.scrollIntoView();
      event.preventDefault();
   }
  }
  });
});

