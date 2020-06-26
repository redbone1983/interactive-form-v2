// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. 
const form = document.querySelector('form');

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
  checkErr.textContent = errMsgs[`${input.parentNode.className}`];
  checkErr.style.display = 'none';
  return legend.parentNode.insertBefore(checkErr, legend);
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
  if (!regex.test(input.value) || input.value.length === 0) {
    // 'show' error message 
    inputErr.style.display = '';
    input.style.borderColor = 'red';
    return false;
  } else {
    // 'hide' error message 
    inputErr.style.display = 'none';
    input.style.borderColor = 'white';
    return true;
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
  const activities = document.querySelector('.activities');
  const checkboxes = document.querySelectorAll('.activities input');

  let checkErr = addCheckBoxErr(activities);

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
    checkBoxVerify(checkErr);
  });
};

addActivities();

// Payment Section
const addPaymentSection = () => {
  const ccNum = document.getElementById('cc-num');
  const zip = document.getElementById('zip');
  const cvv = document.getElementById('cvv');

  ccNum.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });
 
  zip.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });

  cvv.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
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
  const checkErr = document.getElementById('checkErr');
  const inputs = document.querySelectorAll('input');
  inputs.forEach( input => {
    
    if (input.id !== 'other-title' && input.type !== 'checkbox') {
      console.log(input.id);
      if (!inputVerify(input, inputRegex[`${input.id}`]) || input.value.length === 0) {
        input.parentNode.scrollIntoView();
        event.preventDefault();
      } else if (input.type === 'checkbox' && !checkBoxVerify(checkErr)) {
        input.parentNode.parentNode.scrollIntoView();
        event.preventDefault();
      }
    }
  });
});