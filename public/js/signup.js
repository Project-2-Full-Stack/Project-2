const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const eatsMeat = document.querySelector('input[name="meat"]:checked').value || false;
  const eatsDairy = document.querySelector('input[name="dairy"]:checked').value || false;
  const eatsFish = document.querySelector('input[name="fish"]:checked').value || false;
  const eatsGluten = document.querySelector('input[name="gluten"]:checked').value || false;

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, eatsMeat, eatsDairy, eatsFish, eatsGluten }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
