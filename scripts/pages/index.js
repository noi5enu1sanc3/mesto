import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  profileEditBtn,
  cardAddButton,
  formUsername,
  formUserinfo,
  profileForm,
  cardAddForm,
  usernameTextSelector,
  userinfoTextSelector,
  cardTemplateId,
  config,
  initialCards,
  popupWithImageSelector,
  popupCardSubmitSelector,
  popupProfileEditSelector,
  cardsListContainerSelector
} from "../utils/constants.js";


const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardAddForm);
cardFormValidator.enableValidation();

function getCard(item) {
    const card = new Card({data: item, handleCardClick: () => cardClickHandler(item)}, cardTemplateId);
    return card.renderCard();
}

const popupImageView = new PopupWithImage(popupWithImageSelector);
const cardClickHandler = (item) => {popupImageView.open(item)};

popupImageView.setEventListeners();

const initiallyRenderedCards = new Section({ 
  items: initialCards,
  renderer: (item) => {
   const card = getCard(item);
   initiallyRenderedCards.addItem(card, false);
  }
},
cardsListContainerSelector);

initiallyRenderedCards.renderItems();

const popupCardSubmit = new PopupWithForm({
  popupSelector: popupCardSubmitSelector, 
  handleFormSubmit: (inputsData) => {
    const card = getCard(inputsData);
    initiallyRenderedCards.addItem(card, true);
  },
  shouldReset: true
});

popupCardSubmit.setEventListeners();
const userInfo = new UserInfo ({nameSelector: usernameTextSelector, jobSelector: userinfoTextSelector});

const popupUserInfoSubmit = new PopupWithForm({
  popupSelector: popupProfileEditSelector,
  handleFormSubmit: (inputsData) => {
    
  userInfo.setUserInfo(inputsData);
  },
  shouldReset: false
});

popupUserInfoSubmit.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  profileFormValidator.resetErrors();
  const userCurrentData = userInfo.getUserInfo();
  formUsername.value = userCurrentData.username;
  formUserinfo.value = userCurrentData.userinfo;
  popupUserInfoSubmit.open();
});

cardAddButton.addEventListener("click", () => {
  cardFormValidator.resetErrors();
  popupCardSubmit.open();
});
