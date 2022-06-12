import "./pages/index.css";

import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "./scripts/components/PopupWithConfirmation.js";
import UserInfo from "./scripts/components/UserInfo.js";
import Api from "./scripts/components/Api.js";

import {
  profileEditBtn,
  cardAddButton,
  avatarEditElem,
  formUsername,
  formUserinfo,
  profileForm,
  cardAddForm,
  changeAvatarForm,
  usernameTextSelector,
  userinfoTextSelector,
  avatarSelector,
  cardTemplateId,
  config,
  elementsConfigCard,
  elementsConfigPopup,
  popupWithImageSelector,
  popupCardSubmitSelector,
  popupProfileEditSelector,
  popupConfirmSelector,
  popupChangeAvatarSelector,
  cardsListContainerSelector,
} from "./scripts/utils/constants.js";

// -------init form Validation-------
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardAddForm);
cardFormValidator.enableValidation();

const changeAvatarValidator = new FormValidator(config, changeAvatarForm);
changeAvatarValidator.enableValidation();

//-------function creating and rendering card element-------
function getCard(item) {
  const card = new Card(
    { 
      data: item, 
      handleCardClick: () => cardClickHandler(item),
      handleDelete: () => popupConfirmDelete.open(card),
      handleLike: () => handleLike(card)
    },
    cardTemplateId,
    elementsConfigCard,
    userInfo
  );
  return card.renderCard();
}

//-------function creating section and rendering initial cards-------
function renderInitialCards(cards) {
  const initiallyRenderedCards = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = getCard(item);
        initiallyRenderedCards.addItem(card, false);
      },
    },
    cardsListContainerSelector
  );

  initiallyRenderedCards.renderItems();
}

//-------function sending likes and dislikes to server-------
function handleLike(card) {
  if (card.isLiked()) {
    api
      .removeLike(card.getCardId())
      .then(res => card.updateLikes(res))
      .catch(err => console.log(err))
  } else {
    api
      .addLike(card.getCardId())
      .then(res => card.updateLikes(res))
      .catch(err => console.log(err))
  }
}

//-------init api-------
const api = new Api(
  {
    token: "e0205997-951b-4911-8a29-7b97b6aecfba",
    id: "cohort-43",
  },
  {
    baseUrl: "https://nomoreparties.co/v1/",
    headers: {
      authorization: "e0205997-951b-4911-8a29-7b97b6aecfba",
      "Content-Type": "application/json",
    },
  }
);

//-------init user-------
const userInfo = new UserInfo({
  nameSelector: usernameTextSelector,
  jobSelector: userinfoTextSelector,
  avatarSelector: avatarSelector,
});

//-------get user info and cards info from server and then set user info and render cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userinfo, cards]) => {
    userInfo.setUserInfo(userinfo);
    userInfo.setAvatar(userinfo);
    renderInitialCards(cards);
  })
  .catch(err => console.log(err));

//-------POPUPS-------

//-------init popup with confirmation-------
const popupConfirmDelete = new PopupWithConfirmation(
  popupConfirmSelector, 
  elementsConfigPopup, 
  (card) => {
    popupConfirmDelete.renderButtonText('Удаление...')
    api
      .deleteCard(card.getCardId())
      .then(() => card.deleteCard())
      .catch((err) => console.log(err))
      .finally(() => popupConfirmDelete.renderButtonText('Да'))
});
popupConfirmDelete.setEventListeners();

//-------init change avatar popup-------
const popupChangeAvatar = new PopupWithForm({
  popupSelector: popupChangeAvatarSelector,
  elementsConfig: elementsConfigPopup,
  handleFormSubmit: (inputsData) => {
    popupChangeAvatar.renderButtonText('Сохранение...');
    api
      .changeAvatar(inputsData)
      .then(data => userInfo.setAvatar(data))
      .catch((err) => console.log(err))
      .finally(() => popupChangeAvatar.renderButtonText('Сохранить'))
  },
  shouldReset: true
});

popupChangeAvatar.setEventListeners();

//-------init image view popup-------
const popupImageView = new PopupWithImage(
  popupWithImageSelector,
  elementsConfigPopup
);
const cardClickHandler = (item) => {
  popupImageView.open(item);
};

popupImageView.setEventListeners();

//-------init card upload popup-------
const popupCardSubmit = new PopupWithForm({
  popupSelector: popupCardSubmitSelector,
  elementsConfig: elementsConfigPopup,
  handleFormSubmit: (inputsData) => {
    popupCardSubmit.renderButtonText('Сохранение...');
    api
      .uploadNewCard(inputsData)
      .then(data => {
        return getCard(data)
      })
      .then((card) => initiallyRenderedCards.addItem(card, true))
      .catch((err) => console.log(err))
      .finally(() => popupCardSubmit.renderButtonText('Создать'))
  },
  shouldReset: true,
});

popupCardSubmit.setEventListeners();

//-------init user info popup-------
const popupUserInfoSubmit = new PopupWithForm({
  popupSelector: popupProfileEditSelector,
  elementsConfig: elementsConfigPopup,
  handleFormSubmit: (inputsData) => {
    popupUserInfoSubmit.renderButtonText('Сохранение...');
    api
      .setUserInfo(inputsData)
      .then((data) => userInfo.setUserInfo(data))
      .catch((err) => console.log(err))
      .finally(() => popupUserInfoSubmit.renderButtonText('Сохранить'))
  },
  shouldReset: false,
});

popupUserInfoSubmit.setEventListeners();

//-------EVENT LISTENERS-------
profileEditBtn.addEventListener("click", () => {
  profileFormValidator.resetErrors();
  const userCurrentData = userInfo.getUserInfo();
  formUsername.value = userCurrentData.name;
  formUserinfo.value = userCurrentData.about;
  popupUserInfoSubmit.open();
});

cardAddButton.addEventListener("click", () => {
  cardFormValidator.resetErrors();
  popupCardSubmit.open();
});

avatarEditElem.addEventListener("click", () => {
  changeAvatarValidator.resetErrors();
  popupChangeAvatar.open();
})
