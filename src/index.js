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
  formUsername,
  formUserinfo,
  profileForm,
  cardAddForm,
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
  cardsListContainerSelector,
} from "./scripts/utils/constants.js";

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardAddForm);
cardFormValidator.enableValidation();

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

const userInfo = new UserInfo({
  nameSelector: usernameTextSelector,
  jobSelector: userinfoTextSelector,
  avatarSelector: avatarSelector,
});

// function handleDelete(card) {
//   api
//     .deleteCard(card._id)
    
// }

const popupConfirmDelete = new PopupWithConfirmation(popupConfirmSelector, elementsConfigPopup, (card) => {
  api
    .deleteCard(card.getCardId())
    .then(() => console.log(card))
    .then(() => card.deleteCard())
    .catch((err) => console.log("Такая ошибка:", err))
});
popupConfirmDelete.setEventListeners();

api
  .getUserInfo()
  .then((data) => userInfo.setUserInfo(data))
  .catch((err) => console.log(err))

// function likeCard(card) {
//   api
//     .addLike(card.getCardId())
//     .then(res => card.renderLike(res))
//     .catch(err => console.log(err))
// }

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

api
  .getInitialCards()
  .then((cards) => {
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
  })
  .catch((err) => console.log(err)
  );



const popupImageView = new PopupWithImage(
  popupWithImageSelector,
  elementsConfigPopup
);
const cardClickHandler = (item) => {
  popupImageView.open(item);
};

popupImageView.setEventListeners();

const popupCardSubmit = new PopupWithForm({
  popupSelector: popupCardSubmitSelector,
  elementsConfig: elementsConfigPopup,
  handleFormSubmit: (inputsData) => {
    api
      .uploadNewCard(inputsData)
      .then(data => {
        return getCard(data)})
      .then((card) => initiallyRenderedCards.addItem(card, true))
      .catch((err) => console.log(err));
    
  },
  shouldReset: true,
});

popupCardSubmit.setEventListeners();

const popupUserInfoSubmit = new PopupWithForm({
  popupSelector: popupProfileEditSelector,
  elementsConfig: elementsConfigPopup,
  handleFormSubmit: (inputsData) => {
    api
      .setUserInfo(inputsData)
      .then((data) => userInfo.setUserInfo(data))
      .catch((err) => console.log(err));
  },
  shouldReset: false,
});

popupUserInfoSubmit.setEventListeners();

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
