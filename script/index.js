import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profile = document.querySelector('.profile');

const profileEditBtn = profile.querySelector('.profile__edit-btn');
const cardAddButton = profile.querySelector('.profile__add-btn');

const popups = document.querySelectorAll('.popup');

const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');

const username = profile.querySelector('.profile__username');
const userinfo = profile.querySelector('.profile__userinfo');
const formUsername = popupProfileEdit.querySelector('.popup__input-form_type_username');
const formUserinfo = popupProfileEdit.querySelector('.popup__input-form_type_userinfo');

const formSubmitProfileContainer = popupProfileEdit.querySelector('.popup__container');
const formSubmitCardContainer = popupCardAdd.querySelector('.popup__container');

const profileForm = formSubmitProfileContainer.querySelector('.popup__form');
const cardAddForm = formSubmitCardContainer.querySelector('.popup__form');

const formCardName = popupCardAdd.querySelector('.popup__input-form_type_card-name');
const formCardLink = popupCardAdd.querySelector('.popup__input-form_type_card-link');

const cardsList = document.querySelector('.cards__items');

const cardTemplate = '#card';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-form',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector: '.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input-form_type_error',
};

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

const profileFormValidator = new FormValidator(config, profileForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

function getCard(data, templateSelector) {
  return new Card(data, templateSelector).renderCard();
}

initialCards.forEach((item) => {
  cardsList.append(getCard(item, cardTemplate));
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

function submitNewCard(evt) {
  evt.preventDefault();
  
  cardsList.prepend(getCard({name: formCardName.value, link: formCardLink.value}, cardTemplate));
  closePopup(popupCardAdd);
}

export function openPopup(popup) {
  document.addEventListener('keydown', closePopupOnEsc);
  popup.classList.add('popup_status_show');
}

function openProfileEditHandler() {
  formUsername.value = username.textContent;
  formUserinfo.value = userinfo.textContent;
  profileFormValidator.resetErrors();
  openPopup(popupProfileEdit);
}

function submitProfileEdit(evt) {
  evt.preventDefault();
  username.textContent = formUsername.value;
  userinfo.textContent = formUserinfo.value;
  closePopup(popupProfileEdit);
}

function addCardHandler() {
  cardAddForm.reset();
  cardFormValidator.resetErrors();
  openPopup(popupCardAdd);
}

function closePopup(popup) {
  popup.classList.remove('popup_status_show');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_status_show');
    closePopup(openedPopup);
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
