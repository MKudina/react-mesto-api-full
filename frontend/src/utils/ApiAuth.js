class ApiAuth{
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

    //register

    register(data){
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "password": data.password,
            "email": data.email
        } )
        })
          .then(this._checkError)
      }

      //login

      login(data){
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                "password": data.password,
                "email": data.email
            } )
        })
            .then(this._checkError)
            .then((data) => {
                if(data.token){
                    localStorage.setItem("token", data.token)
                    return data
                } else {
                    return
                }
            })
            
      }

      //checkAuth

      checkAuth(jwt){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}` 
            }
        })
        .then(this._checkError)
        .then(data => data)
      }

}

const apiAuth = new ApiAuth ({baseUrl: 'https://kud.nomoredomains.sbs'})

export default apiAuth;

// ssh kudina@178.154.201.52
