# interactive-form-v2

#### What?

- This is a Javascript application that when enabled, adds interactive validation errors to the form fields of a webpage (DOM).

#### When & How?

##### When the webpage loads, an error message is added to each form section in the DOM and then its default display view is set to 'none'.

##### Real-time user text input, drop down menu selection or clicked checkbox.

- Each time a user interacts with a specific form input field on the webpage.

##### On Form Submission Validation

- Each time a user submits the form by clicking the "Register button".
- If the input value is *INVALID* or *EMPTY*, its corresponding error message is set to *SHOW* on the webpage and form submission is prevented.
- If the input value is *VALID*, its corresponding error message is set to *NOT SHOW* on the webpage and form submission is granted.

