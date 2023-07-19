const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, errorMessage) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = errorMessage;
}
// Show the success message

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}
// Show valid email address

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkRequired(inputs) {
  inputs.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, ` ${capitalizeFirstLetter(input.id)} is required`);
    }
  });
}
// function check password match

function checkPasswordMatch(input, password2) {
  if (input.value.length === 0 && password2.value.length === 0) {
    showError(input, "Password is required");
    showError(password2, "Password is required");
  } else if (input.value !== password2.value) {
    // showError(input, "Passwords do not match");
    showError(password2, "Passwords do not match");
  } else {
    showSuccess(input);
    showSuccess(password2);
  }
}
// check if email is valid or not
function checkEmail(input) {
  if (!validateEmail(input.value.trim())) {
    showError(input, "Email is not valid");
  } else {
    showSuccess(input);
  }
}

// check the length of the password field

function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength || input.value.length > maxLength) {
    showError(
      input,
      ` ${capitalizeFirstLetter(
        input.id
      )} must be between ${minLength} and ${maxLength}`
    );
  } else {
    showSuccess(input);
  }
}

// change first letter to uppercase

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 3, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
