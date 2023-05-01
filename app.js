const loginForm = document.querySelector('form');
const loginButton = document.querySelector('#login');
const signupButton = document.querySelector('#signup');

// Log in existing users
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect user to dashboard or homepage
      console.log(userCredential)
    })
    .catch((error) => {
      console.error(error);
    });
});
