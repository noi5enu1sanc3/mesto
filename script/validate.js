function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  
  forms.forEach((form) => form.addEventListener('input', (evt) => handleFormInput(evt, form, config)));
  
  forms.forEach((form) => toggleButton(form, config));
}

function handleFormInput(evt, form, config)  {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorNode.textContent = '';
    input.classList.remove(config.inputErrorClass);
  } else {
    errorNode.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
  toggleButton(form, config);
}

function toggleButton (form, config) {
  const buttons = document.querySelectorAll(config.submitButtonSelector);

  buttons.forEach((button) => button.disabled = !form.checkValidity());
  buttons.forEach((button) => button.classList.toggle(config.inactiveButtonClass, !form.checkValidity()));
}

enableValidation({
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input-form_type_error',
}); 
