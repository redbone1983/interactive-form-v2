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
  
  // ● Hide the “Select Theme” `option` element in the “Design” menu.
  const designMenu = document.querySelector('#design');
  const selectTheme = designMenu.firstElementChild;
  selectTheme.style.display = 'none';



  
  // ● Update the “Color” field to read “Please select a T-shirt theme”.

    const colorMenu = document.querySelector('#color');
    const selectTshirt = document.createElement('option');
    selectTshirt.textContent = "Please select a T-shirt theme";
    let selectedOption = colorMenu[colorMenu.selectedIndex];
    colorMenu.insertBefore(selectTshirt, selectedOption);
    colorMenu.selectedIndex = 0;

    const colorOptions = document.querySelectorAll('#color option');
    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].style.display = 'none';
    }
    
    const showThemeColors = (regex, colors) => {
      for (let i = 1; i < colors.length; i++) {
        let colorString = colors[i].textContent;
        if (regex.test(colorString)) {
          colors[i].style.display = '';
        } else {
          colors[i].style.display = 'none';
        }
      }
    };

    designMenu.addEventListener('change', (event) => {
      if (event.target.value === 'js puns') {
        showThemeColors(/JS Puns/, colorOptions);
      }
       if (event.target.value === 'heart js') {
        showThemeColors(/I ♥ JS/, colorOptions);
      }
    });


    
    




  // ● Hide the colors in the “Color” drop down menu.
  
  // ● NOTE: Be sure to check out the helpful links in the second section of this Study Guide if you’re unsure of how to accomplish these steps.

