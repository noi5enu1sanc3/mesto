let profile = document.querySelector('.profile');
let profileEditBtn = profile.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let username = profile.querySelector('.profile__username');
let userinfo = profile.querySelector('.profile__userinfo');
let formUsername = popup.querySelector('.popup__input-form_type_username');
let formUserinfo = popup.querySelector('.popup__input-form_type_userinfo');
let formElement = popup.querySelector('.popup__container');

function openPopupHandler() {
  popup.classList.add('popup_status_show');
  formUsername.value = username.textContent;
  formUserinfo.value = userinfo.textContent;
}

function closePopupHandler() {
  popup.classList.remove('popup_status_show');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  username.textContent = formUsername.value;
  userinfo.textContent = formUserinfo.value;
  closePopupHandler();
}

profileEditBtn.addEventListener('click', openPopupHandler);
popupCloseBtn.addEventListener('click', closePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
