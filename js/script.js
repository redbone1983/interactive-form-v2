// Put the first field in the `focus` state
// Use JavaScript to select the 'Name' input element and place focus on it. Add an “Other” option to the Job Role section

const nameInput = document.querySelector('#name');

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
 
// Event listener for Activities checkboxes
document.querySelector('.activities').addEventListener('change', (event) => {
  const clicked = event.target;
  const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
  for (let i = 0; i < checkboxes.length; i++) {
    const checkboxDayAndTime = checkboxes[i].getAttribute('data-day-and-time');
    if (clicked !== checkboxes[i] && clickedDayAndTime === checkboxDayAndTime) {
      if (clicked.checked) {
        checkboxes[i].disabled = true;
      } else {
        checkboxes[i].disabled = false;
      }
    }
  }
  console.log('The activities checkboxes `change` event listener is functional!');
});



