const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const username = profile.querySelector('.profile__username');
const userinfo = profile.querySelector('.profile__userinfo');
const formUsername = popup.querySelector('.popup__input-form_type_username');
const formUserinfo = popup.querySelector('.popup__input-form_type_userinfo');
const formElement = popup.querySelector('.popup__container');

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
  const cardsTemplate = document.querySelector('#card').content;
  const cardsList = document.querySelector('.cards__items');
  initialCards.forEach(function(card) {
    const cardElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__image').src = card.link;
    cardElement.querySelector('.cards__caption').textContent = card.name;
    cardsList.appendChild(cardElement);
  });
}

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

window.addEventListener("load", addInitialCards);
profileEditBtn.addEventListener('click', openPopupHandler);
popupCloseBtn.addEventListener('click', closePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
