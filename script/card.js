import { openPopup } from './index.js'

const popupImageView = document.querySelector('.popup_role_view-image');
const imageContainer = popupImageView.querySelector('.popup__image-container');
const popupImageCaption = imageContainer.querySelector('.popup__caption');
const popupImage = imageContainer.querySelector('.popup__image');

export class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card')
      .content
      .querySelector(this._templateSelector)
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardName = this._element.querySelector('.cards__caption');
    this._cardLikeButton = this._element.querySelector('.cards__like-btn');
    this._cardDeleteButton = this._element.querySelector('.cards__delete-btn');

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleViewImage() {
    popupImageCaption.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    
    openPopup(popupImageView);
  }

  _handleLike() {
    this._cardLikeButton.classList.toggle('cards__like-btn_status_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {this._handleLike()});
    this._cardDeleteButton.addEventListener('click', () => {this._handleDeleteCard()});
    this._cardImage.addEventListener('click', () => {this._handleViewImage()});
  }
}
