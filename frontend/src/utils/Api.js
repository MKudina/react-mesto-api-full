class Api{
    constructor(options){
        this._baseUrl = options.baseUrl;
    }

    //checkError

    _checkError(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    //GET Profile

    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {
            method:'GET',
            headers: {
              authorization: this._getToken() 
            }
          })
          .then(this._checkError)
    }

    //PATCH Profile

      editProfile(profileData){
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
            })
          .then(this._checkError)
      }

      //PATCH Avatar

      editAvatar(avatar){
        return fetch(`${this._baseUrl}users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this._getToken(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(avatar)
        })
          .then(this._checkError)
      }

        //GET Cards

      getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            method: 'GET',
            headers: {
              authorization: this._getToken()
            }
        })
          .then(this._checkError)
      }

      //POST Card

      addCard(cardData){
          return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: this._getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
          })
            .then(this._checkError)
        }

        //DELETE Card

      deleteCard(idCard){
        return fetch(`${this._baseUrl}cards/${idCard}`, {
          method: 'DELETE',
          headers: {
            authorization: this._getToken()
          }
        })
          .then(this._checkError)
      }

      //PUT Like
      like(idCard){
        return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
          method: 'PUT',
          headers: {
            authorization: this._getToken()
          }
        })
          .then(this._checkError)
      }

      //DELETE Dislike
      dislike(idCard){
        return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: this._getToken()
          }
        })
          .then(this._checkError)
      }

      _getToken() {
        return `Bearer ${localStorage.getItem("token")}`;
      }
}

const api = new Api ({
  baseUrl:'https://kud.nomoredomains.sbs/'
})

export {api};
