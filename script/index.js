import { Card } from "./card.js";

const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');

const cardAddButton = profile.querySelector('.profile__add-btn');

const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');
//const popupImageView = document.querySelector('.popup_role_view-image');

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');

const formElement = document.querySelector('.popup__form');

//const imageContainer = popupImageView.querySelector('.popup__image-container');
//const popupImage = imageContainer.querySelector('.popup__image');
//const popupImageCaption = imageContainer.querySelector('.popup__caption');

const username = profile.querySelector('.profile__username');
const userinfo = profile.querySelector('.profile__userinfo');
const formUsername = popupProfileEdit.querySelector('.popup__input-form_type_username');
const formUserinfo = popupProfileEdit.querySelector('.popup__input-form_type_userinfo');

const formSubmitProfileContainer = popupProfileEdit.querySelector('.popup__container');
const formSubmitCardContainer = popupCardAdd.querySelector('.popup__container');
const cardAddForm = formSubmitCardContainer.querySelector('.popup__form');

const cardSubmitButton = cardAddForm.querySelector('.popup__save-btn');
const cardSubmitInputsList = Array.from(cardAddForm.querySelectorAll('.popup__input-form'));

const formCardName = popupCardAdd.querySelector('.popup__input-form_type_card-name');
const formCardLink = popupCardAdd.querySelector('.popup__input-form_type_card-link');

//const cardsTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__items');

const errorMessages = document.querySelectorAll('.popup__input-error');
const inputs = document.querySelectorAll('.popup__input-form');

const initialCards = [
  {
    name: 'Сон о Петербурге',
    link: 'images/st-pete-dream.jpeg'
  },
  {
    name: 'Сон о Москве',
    link: 'images/moscow-dream.jpeg'
  },
  {
    name: 'Сон о Тайге',
    link: 'images/taiga-dream.jpg'
  },
  {
    name: 'Сон о Кавказе',
    link: 'images/caucasus-dream.jpeg'
  },
  {
    name: 'Сон о Байкале',
    link: 'images/Baikal-dream.jpeg'
  },
  {
    name: 'Сон о Сочи',
    link: 'images/Sochi-dream.jpeg'
  }
];

initialCards.forEach((item) => {
  const card = new Card(item, '.cards__item');
  const cardElement = card.renderCard();

  cardsList.append(cardElement);
});

function submitNewCard(evt) {
  evt.preventDefault();
  const card = new Card({name: formCardName.value, link: formCardLink.value}, '.cards__item');
  const newCardElement = card.renderCard();
  
  cardsList.prepend(newCardElement);
  closePopup(popupCardAdd);
}

export function openPopup(popup) {
  document.addEventListener('keydown', closePopupOnEsc);
  popup.classList.add('popup_status_show');
}

function openProfileEditHandler() {
  formUsername.value = username.textContent;
  formUserinfo.value = userinfo.textContent;
  resetErrors(errorMessages, inputs);
  openPopup(popupProfileEdit);
}

function submitProfileEdit(evt) {
  evt.preventDefault();
  username.textContent = formUsername.value;
  userinfo.textContent = formUserinfo.value;
  closePopup(popupProfileEdit);
}

function isInputEmpty(inputList) {
  return inputList.some((input) => !input.value);
}

function disableSubmitButton(button, form) {
  button.disabled = isInputEmpty(form);
  button.classList.add('popup__save-btn_disabled');
}

function addCardHandler() {
  cardAddForm.reset();
  disableSubmitButton(cardSubmitButton, cardSubmitInputsList);
  resetErrors(errorMessages, inputs);
  openPopup(popupCardAdd);
}

function resetErrors(errorElements, inputElements) {
  errorElements.forEach((message) => message.textContent = '');
  inputElements.forEach((input) => input.classList.remove('popup__input-form_type_error'));
}

function closePopup(popup) {
  popup.classList.remove('popup_status_show');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => closePopup(popup));
  }
}

profileEditBtn.addEventListener('click', openProfileEditHandler);
cardAddButton.addEventListener('click', addCardHandler);
formSubmitProfileContainer.addEventListener('submit', submitProfileEdit);
formSubmitCardContainer.addEventListener('submit', submitNewCard);

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
  })
});
