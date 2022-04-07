const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');

const cardAddButton = profile.querySelector('.profile__add-btn');

const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');
const popupProfileEditCloseButton = popupProfileEdit.querySelector('.popup__close-btn');
const popupCardAddCloseButton = popupCardAdd.querySelector('.popup__close-btn');

const username = profile.querySelector('.profile__username');
const userinfo = profile.querySelector('.profile__userinfo');
const formUsername = popupProfileEdit.querySelector('.popup__input-form_type_username');
const formUserinfo = popupProfileEdit.querySelector('.popup__input-form_type_userinfo');

const formElementProfile = popupProfileEdit.querySelector('.popup__container');
const formElementCard = popupCardAdd.querySelector('.popup__container');

const formCardName = popupCardAdd.querySelector('.popup__input-form_type_card-name');
const formCardLink = popupCardAdd.querySelector('.popup__input-form_type_card-link');

const cardsTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__items');

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
  initialCards.forEach(function(element) {
    const InitialCardElement = renderCard(element);
    cardsList.append(InitialCardElement);
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

  return cardElement;
}

function addNewCardHandler(evt) {
  evt.preventDefault();
  const newCardElement = renderCard({name: formCardName.value, link: formCardLink.value});
  cardsList.prepend(newCardElement);
  closePopupHandler(popupCardAdd);
}

function likeCardHandler(evt) {
  evt.target.classList.toggle('cards__like-btn_status_active');
}

function deleteCardHandler(evt) {
  evt.target.closest('.cards__item').remove();
}

function openPopupHandler(role) {
  role.classList.add('popup_status_show');
}

function profileEditHandler() {
  formUsername.value = username.textContent;
  formUserinfo.value = userinfo.textContent;
  openPopupHandler(popupProfileEdit);
}

function profileSubmitHandler(evt) {
  evt.preventDefault();
  username.textContent = formUsername.value;
  userinfo.textContent = formUserinfo.value;
  closePopupHandler(popupProfileEdit);
}

function cardAddHandler() {
  formCardName.value = '';
  formCardLink.value = '';
  openPopupHandler(popupCardAdd);
}

function closePopupHandler(role) {
  role.classList.remove('popup_status_show');
}

function closeProfileEditPopupHandler() {
  closePopupHandler(popupProfileEdit);
}

function closeCardAddPopupHandler() {
  closePopupHandler(popupCardAdd);
}

window.addEventListener("load", addInitialCards);
profileEditBtn.addEventListener('click', profileEditHandler);
cardAddButton.addEventListener('click', cardAddHandler);
formElementProfile.addEventListener('submit', profileSubmitHandler);
formElementCard.addEventListener('submit', addNewCardHandler);
popupProfileEditCloseButton.addEventListener('click', closeProfileEditPopupHandler);
popupCardAddCloseButton.addEventListener('click', closeCardAddPopupHandler);
