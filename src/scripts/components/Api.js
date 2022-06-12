export default class Api {
  constructor({ token, id }, options) {
    this._token = token;
    this._id = id;
    this._baseUrl = options.baseUrl;
  }

  _getResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getUserInfo() {
    return fetch(`${this._baseUrl}${this._id}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._getResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${this._id}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._getResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar
      }),
    })
    .then((res) => this._getResponse(res));
  }

  uploadNewCard(data) {
    return fetch(`${this._baseUrl}${this._id}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
    }),
    })
    .then(res => this._getResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${this._id}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      }
    })
    .then(res => this._getResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}${this._id}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._getResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}${this._id}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._getResponse(res));
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}${this._id}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar
    })
    })
    .then(res => this._getResponse(res))
  }
}
