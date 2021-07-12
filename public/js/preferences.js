const updatePreferenceHandler = async (event) => {
  event.preventDefault();

  const eatsMeat = document.querySelector('input[name="meat"]:checked').value || false;
  const eatsDairy = document.querySelector('input[name="dairy"]:checked').value || false;
  const eatsFish = document.querySelector('input[name="fish"]:checked').value || false;
  const eatsGluten = document.querySelector('input[name="gluten"]:checked').value || false;

  const response = await fetch(`/api/users/update`, {
    method: 'PUT',
    body: JSON.stringify({ eatsMeat, eatsDairy, eatsFish, eatsGluten }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    alert('Preferences updated.');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#update-preference-btn')
  .addEventListener('click', updatePreferenceHandler);