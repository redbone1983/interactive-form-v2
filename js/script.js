const form = document.querySelector('form');
let creditSelected = true;

// Sets an object literal to store error msgs for each input field
const errMsgs = {
  'name': 'Please enter your full name',
  'mail': 'Please enter a valid email',
  'activities': 'Please select at least one activity',
  'cc-num': 'Please enter a credit card number between 13 and 16 digits.',
  'zip': 'Please enter a valid 5 digit zipcode',
  'cvv': 'Please enter a valid 3 digit CVV'
};

// Creates and Adds each err message above its text input in the DOM
const addInputErrs = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach( input => {
    if (input.type !== 'checkbox' && input.id !== 'other-title') {
      const errSpan = document.createElement('span');
      errSpan.className = input.id;
      errSpan.style.color = 'red';
      errSpan.style.fontSize = '14px';

      // Hides error message as default
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

// Adds an error message above activities section in the DOM
const addCheckBoxErr = input => {
  const legend = input.firstElementChild;
  const checkErr = document.createElement('p');
  checkErr.id = 'checkErr';
  checkErr.style.color = 'red';
  checkErr.style.fontSize = '16px';
  checkErr.style.paddingBottom = '15px';
  checkErr.textContent = errMsgs[`${input.className}`];

  // Hides error message as default
  checkErr.style.display = 'none';

  legend.parentNode.insertBefore(checkErr, legend);
};

// Sets an object literal to store regex condtions for each input error
const inputRegex = {
  'name': /^[a-zA-Z]+ [a-zA-Z]+$/,
  'mail': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'cc-num': /^\d{13,16}$/,
  'zip': /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  'cvv': /^[0-9]{3}$/
};

// Verifies and adds error or visual validation styling to input value
const inputVerify = (input, regex) => {
  const inputErr = document.querySelector(`.${input.id}`);
  if (input.value.length === 0) {
    inputErr.textContent = `Input field is empty. Please enter your ${input.id}.`;
    inputErr.style.display = '';
    input.style.borderColor = 'red';
    return false;
  } else if (!regex.test(input.value)) {
    inputErr.textContent = errMsgs[`${input.id}`];
    inputErr.style.display = '';
    input.style.borderColor = 'red';
    return false;
  } else {
    inputErr.style.display = 'none';
    input.style.borderColor = 'white';
    return true;
  }
};

// Verifies if activity event checkboxes have been selected
const checkBoxVerify = () => {
  const err = document.getElementById('checkErr');
  if (totalCost !== 0) {
    err.style.display = 'none';
    return true;
  } else {
    err.style.display = '';
    return false;
  }
};

// *** Adds Basic Info Section Validation Functions ***
const basicInfoSection = () => {
  // Selects and puts the name input field in the `focus` state
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

// *** Adds Tshirt Section Validation Functions ***
const addTshirtSection = () => {
  // Object stores color themes organized by design theme
  const colorThemes = {};
  const designMenu = document.getElementById('design');
  const designOptions = designMenu.options;

  // Disables the “Select Theme” `option` element in the “Design” menu.
  const selectTheme = designMenu.firstElementChild;
  selectTheme.disabled = true;
  
  const parentColorDiv = document.getElementById('colors-js-puns');
  const colorMenu = document.getElementById('color');
  const colorElements = colorMenu.options;

  // When page loads, t-shirt colors are organzed by design theme
  const getTshirtThemes = () => {
    for (let i = 1; i < designOptions.length; i++) {
      let tshirtTheme = designOptions[i].innerText.substring(8, 14);
      if (!Object.keys(colorThemes).includes(tshirtTheme)) {
        colorThemes[`${tshirtTheme}`] = [];
      } 
    }
    return colorThemes;
  };

  // Color elements textContent is shortened and pushed colorThemes array
  const getTshirtColors = colorThemes => {
    for (let theme in colorThemes) {
      for (let i = 0; i < colorElements.length; i++) {
        let endIndex = colorElements[i].textContent.indexOf('(');
        let justColor = colorElements[i].textContent.slice(0, endIndex - 1);
        if (colorElements[i].textContent.includes(theme)) {
          colorElements[i].textContent = justColor;
          colorThemes[theme].push(colorElements[i]);
        }
      }
    }
    return colorThemes;
  };

  getTshirtColors(getTshirtThemes());

  const showTshirtColors = userTheme => {
    for (let theme in colorThemes) {
      colorThemes[theme].forEach( color => {
        if (userTheme === theme) {
          color.style.display = '';
        } else {
          color.style.display = 'none';
        }
      });
    }
  };

  // Extra Credit #1 - Hide the "Color" label 
  parentColorDiv.style.display = 'none';
  
  // Changes tshirt color options menu based on user's selected Design theme
  designMenu.addEventListener('change', (event) => {
    parentColorDiv.style.display = '';
    let userSelect = event.target.selectedIndex;
    let themeName = designOptions[userSelect];
    let userTheme = themeName.innerText.substring(8, 14);
    showTshirtColors(userTheme);
    if (event.target.selectedIndex === 1) {
      firstColorIndex = 0;
    } else if (event.target.selectedIndex === 2) {
      firstColorIndex = 3;
    }
    colorMenu.selectedIndex = firstColorIndex;
  });
};

addTshirtSection();

// Selects and adds total to Activities section in the DOM
const addTotal = () => {
  const activities = document.querySelector('.activities');
  const total = document.createElement('p');
  total.className = 'fees';
  activities.appendChild(total);
};

addTotal();

// Stores the total sum of Activity fees
let totalCost = 0;

// Tallys the sum of each clicked workshop event
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

// *** Adds Activities Section Validation Functions ***
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

// *** Adds Payment Section Validation Functions ***
const addPaymentSection = () => {
  
  // Selects each credit card input element
  const ccNum = document.getElementById('cc-num');
  const zip = document.getElementById('zip');
  const cvv = document.getElementById('cvv');

  // Real-time credit-card input field validation
  ccNum.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });
 
  zip.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });

  cvv.addEventListener('keyup', event => {
    inputVerify(event.target, inputRegex[`${event.target.id}`]);
  });
  
  // Selects payment menu
  const paymentMenu = document.getElementById('payment');
 
  // Selects credit card as default payment option
  paymentMenu.selectedIndex = 1;

  // Selects payment form divs
  const paymentDivs = document.querySelectorAll('fieldset > div');

  // Disables 'Select Payment Method' option
  paymentMenu[0].disabled = true;

  // Sets payment form view based on default payment selection
  for (let i = 1; i < paymentDivs.length; i++) {
    if (paymentMenu.selectedIndex === i) {
      paymentDivs[i].style.display = '';
    } else {
      paymentDivs[i].style.display = 'none';
    }
  }

  // Displays payment form view in real-time based on users selection
  paymentMenu.addEventListener('change', (event) => {

    // Toggles global boolean variable based on payment selection
    if (event.target.selectedIndex !== 1) {
      creditSelected = false;
    } else {
      creditSelected = true;
    }

    for (let i = 1; i < paymentDivs.length; i++) {
      if (event.target.selectedIndex === i) {
        paymentDivs[i].style.display = '';
      } else {
        paymentDivs[i].style.display = 'none';
      }
    }
  });
};

addPaymentSection();

// Submit Form Validation
form.addEventListener('submit', (event) => {
  const inputs = document.querySelectorAll('input');
  
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id === 'name' || inputs[i].id === 'mail') {
      if (!inputVerify(inputs[i], inputRegex[`${inputs[i].id}`])) {
        inputs[i].parentNode.scrollIntoView();
        event.preventDefault();
      }
    } else if (inputs[i].type === 'checkbox') {
      if (!checkBoxVerify()) {
        inputs[i].parentNode.parentNode.scrollIntoView();
        event.preventDefault();
      }
    } else if (creditSelected && inputs[i].className === 'credit') {
      if (!inputVerify(inputs[i], inputRegex[`${inputs[i].id}`])) {
        inputs[i].parentNode.scrollIntoView();
        event.preventDefault();
      }
    }
  }
});