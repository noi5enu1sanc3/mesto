const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');

const cardAddButton = profile.querySelector('.profile__add-btn');

const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');
const popupImageView = document.querySelector('.popup_role_view-image');

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');

const imageContainer = popupImageView.querySelector('.popup__image-container');
const popupImage = imageContainer.querySelector('.popup__image');
const popupImageCaption = imageContainer.querySelector('.popup__caption');

const username = profile.querySelector('.profile__username');
const userinfo = profile.querySelector('.profile__userinfo');
const formUsername = popupProfileEdit.querySelector('.popup__input-form_type_username');
const formUserinfo = popupProfileEdit.querySelector('.popup__input-form_type_userinfo');

const formSubmitButtonProfile = popupProfileEdit.querySelector('.popup__container');
const formSubmitButtonCard = popupCardAdd.querySelector('.popup__container');
const cardAddInput = formSubmitButtonCard.querySelector('.popup__form');

const formCardName = popupCardAdd.querySelector('.popup__input-form_type_card-name');
const formCardLink = popupCardAdd.querySelector('.popup__input-form_type_card-link');

const cardsTemplate = document.querySelector('#card').content;
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

function addInitialCards() {
  initialCards.forEach(function(element) {
    const initialCardElement = renderCard(element);
    cardsList.append(initialCardElement);
  });
}

function renderCard(element) {
  const cardElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardName = cardElement.querySelector('.cards__caption');
  const cardLikeButton = cardElement.querySelector('.cards__like-btn');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-btn');

  cardName.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardLikeButton.addEventListener('click', likeCardHandler);
  cardDeleteButton.addEventListener('click', deleteCardHandler);
  cardImage.addEventListener('click', imageViewHandler);

  return cardElement;
}

function imageViewHandler(evt) {
  popupImageCaption.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
  openPopupHandler(popupImageView);
}

function submitNewCardHandler(evt) {
  evt.preventDefault();
  const newCardElement = renderCard({name: formCardName.value, link: formCardLink.value});
  cardsList.prepend(newCardElement);
  closePopup(popupCardAdd);
}

function likeCardHandler(evt) {
  evt.target.classList.toggle('cards__like-btn_status_active');
}

function deleteCardHandler(evt) {
  evt.target.closest('.cards__item').remove();
}

function openPopupHandler(popup) {
  document.addEventListener('keydown', closePopupOnEsc);
  popup.classList.add('popup_status_show');
}

function editProfileHandler() {
  formUsername.value = username.textContent;
  formUserinfo.value = userinfo.textContent;
  openPopupHandler(popupProfileEdit);
}

function submitProfileHandler(evt) {
  evt.preventDefault();
  username.textContent = formUsername.value;
  userinfo.textContent = formUserinfo.value;
  closePopup(popupProfileEdit);
}

function addCardHandler() {
  cardAddInput.reset();
  openPopupHandler(popupCardAdd);
}

function resetErrors() {
  errorMessages.forEach((message) => message.textContent = '');
  inputs.forEach((input) => input.classList.remove('popup__input-form_type_error'));
}

function closePopup(popup) {
  popup.classList.remove('popup_status_show');
  resetErrors();
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => closePopup(popup));
  }
}

window.addEventListener("load", addInitialCards);
profileEditBtn.addEventListener('click', editProfileHandler);
cardAddButton.addEventListener('click', addCardHandler);
formSubmitButtonProfile.addEventListener('submit', submitProfileHandler);
formSubmitButtonCard.addEventListener('submit', submitNewCardHandler);

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
  })
});
