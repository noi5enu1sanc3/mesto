const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const cardAddBtn = profile.querySelector('.profile__add-btn');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const username = profile.querySelector('.profile__username');
const userinfo = profile.querySelector('.profile__userinfo');
const formUsername = popup.querySelector('.popup__input-form_type_username');
const formUserinfo = popup.querySelector('.popup__input-form_type_userinfo');
const formElementProfile = popupProfileEdit.querySelector('.popup__container');
const formElementCard = popupCardAdd.querySelector('.popup__container');
const formCardName = popupCardAdd.querySelector('.popup__input-form_type_card-name');
const formCardLink = popupCardAdd.querySelector('.popup__input-form_type_card-link');
const cardsTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__items');
const cardElement = cardsTemplate.querySelector('.cards__item');

function addInitialCards() {
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
  initialCards.forEach(function(card) {
    const InitialCardElement = cardElement.cloneNode(true);
    InitialCardElement.querySelector('.cards__image').src = card.link;
    InitialCardElement.querySelector('.cards__caption').textContent = card.name;
    cardsList.append(InitialCardElement);
  });
}

function addNewCardHandler(evt) {
  evt.preventDefault();
  const newCardElement = cardElement.cloneNode(true);
  newCardElement.querySelector('.cards__image').src = formCardLink.value;
  newCardElement.querySelector('.cards__caption').textContent = formCardName.value;
  cardsList.prepend(newCardElement);
  closePopupHandler();
}

function openPopupHandler(role) {
  role.classList.add('popup_status_show');
}

function closePopupHandler() {
  popups.forEach(function(item) {
    item.classList.remove('popup_status_show');
  });
}

function profileEditHandler() {
  formUsername.value = username.textContent;
  formUserinfo.value = userinfo.textContent;
  openPopupHandler(popupProfileEdit);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  username.textContent = formUsername.value;
  userinfo.textContent = formUserinfo.value;
  closePopupHandler();
}

function cardAddHandler() {
  formCardName.value = '';
  formCardLink.value = '';
  openPopupHandler(popupCardAdd);
}

window.addEventListener("load", addInitialCards);
profileEditBtn.addEventListener('click', profileEditHandler);
cardAddBtn.addEventListener('click', cardAddHandler);
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', addNewCardHandler);
popupCloseButtons.forEach(function(button) {
  button.addEventListener('click', closePopupHandler);
});
