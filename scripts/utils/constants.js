export const cardsListContainerSelector = '.cards__items';

export const cardElementSelector = '.cards__item';

export const cardImageSelector = '.cards__image';
export const cardCaptionSelector = '.cards__caption';
export const cardLikeButtonSelector = '.cards__like-btn';
export const cardDeleteButtonSelector = '.cards__delete-btn';

export const cardLikeButtonActiveClass = 'cards__like-btn_status_active';

export const cardTemplateId = '#card';

export const popupWithImageSelector = '.popup_role_view-image';
export const popupCardSubmitSelector = '.popup_role_add-card';
export const popupProfileEditSelector = '.popup_role_edit-profile';

export const popupCloseButtonSelector = '.popup__close-btn';

export const popupVisibleClass = 'popup_status_show';

export const formSelector = '.popup__form';
export const inputSelector = '.popup__input-form';

export const usernameTextSelector = '.profile__username';
export const userinfoTextSelector = '.profile__userinfo';

const popupImageView = document.querySelector(popupWithImageSelector);
const imageContainer = popupImageView.querySelector('.popup__image-container');

export const popupImageCaption = imageContainer.querySelector('.popup__caption');
export const popupImage = imageContainer.querySelector('.popup__image');

const profile = document.querySelector('.profile');

export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const cardAddButton = profile.querySelector('.profile__add-btn');

const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');

export const formUsername = popupProfileEdit.querySelector('.popup__input-form_type_username');
export const formUserinfo = popupProfileEdit.querySelector('.popup__input-form_type_userinfo');

const formSubmitProfileContainer = popupProfileEdit.querySelector('.popup__container');
const formSubmitCardContainer = popupCardAdd.querySelector('.popup__container');

export const profileForm = formSubmitProfileContainer.querySelector(formSelector);
export const cardAddForm = formSubmitCardContainer.querySelector(formSelector);

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-form',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector: '.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input-form_type_error',
};

export const initialCards = [
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
