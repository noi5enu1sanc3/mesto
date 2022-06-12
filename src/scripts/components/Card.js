export default class Card {
  constructor({data, handleCardClick, handleLike, handleDelete}, templateSelector, elementsConfig, user) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;

    this._templateSelector = templateSelector;

    this._elementsConfig = elementsConfig;

    this._user = user._id;
    this._owner = data.owner._id;

    this._handleCardClick = this._handleCardClick.bind(this._element);
  }

  getCardId() {
    return this._data._id
  }

  _isFromMe() {
    return (this._user === this._owner)
  }

  isLiked() {
    return (this._likes.some(elem => elem._id === this._user))
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._elementsConfig.cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._elementsConfig.cardImageSelector);
    this._cardName = this._element.querySelector(this._elementsConfig.cardCaptionSelector);
    this._cardLikeButton = this._element.querySelector(this._elementsConfig.cardLikeButtonSelector);
    this._cardDeleteButton = this._element.querySelector(this._elementsConfig.cardDeleteButtonSelector);
    this._cardLikeCount = this._element.querySelector(this._elementsConfig.cardLikesCountSelector);

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._likes.length;

    if (!this._isFromMe()) {
      this._cardDeleteButton.classList.add(this._elementsConfig.hiddenDeleteButtonClass);
    }

    this._renderLikes();

    this._setEventListeners();

    return this._element;
  }

  _renderLikes() {
    this._cardLikeCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardLikeButton.classList.add(this._elementsConfig.cardLikeButtonActiveClass);
    } else {
      this._cardLikeButton.classList.remove(this._elementsConfig.cardLikeButtonActiveClass);
    }
  }

  updateLikes(res) {
    this._likes = res.likes;
    this._renderLikes();
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', this._handleCardClick);
    if (this._isFromMe()) {
      this._cardDeleteButton.addEventListener('click', this._handleDelete)
    }
  }
}
