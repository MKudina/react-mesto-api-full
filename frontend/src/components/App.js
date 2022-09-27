import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddCardPopup from './AddCardPopup.js';
import SubmitPopup from './SubmitPopup.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import apiAuth from '../utils/ApiAuth.js';
import ProtectedRoute from './ProtectedRoute.js';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)
  const [isInfoTooltip, setIsInfoTooltip] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const [isEmail, setIsEmail] = useState('')

  //Получаем текущего юзера и карточки

  useEffect(() => {
    if(loggedIn){
      api.getUserInfo()
        .then((responseData) => {
          setCurrentUser(responseData.user);
        })
        .catch(err => console.log(err));
      api.getInitialCards()
        .then((responseData) => {
          setCards(responseData.card);
        })
        .catch(err => console.log(err));
    }
  }, [setCurrentUser, setCards, loggedIn])

  // Обновляем данные юзера и добовляем карточку

  function handleUpdateUser(inputValue){
    api.editProfile(inputValue)
      .then((responseData)=>{
        setCurrentUser(responseData.user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatarRef){
    api.editAvatar(avatarRef)
      .then((responseData) => {
        setCurrentUser(responseData.user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddCardSubmit(cardData){
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard.card, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // Обработка лайков и удаление карточки

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    if(!isLiked){
    api.like(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
      })
      .catch(err => console.log(err));
    }else {
      api.dislike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
        })
        .catch(err => console.log(err));
    }
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((prevState) => (
          prevState.filter(item => item._id !== cardId)
        ))
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // Регистрация пользователя

  function registration(inputValue) {
    apiAuth.register(inputValue)
      .then(() => {
        setIsInfoTooltip(true);
        setIsSuccess(true);
        history.push('/sign-in')
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsSuccess(false);
        console.log(err)
      });
  }

  // Авторизация пользователя

  function login(inputValue) {
    apiAuth.login(inputValue)
      .then((data) => {
        if(data.token){
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsSuccess(false);
        console.log(err);
      });
  }

  // Проверка валидности токена

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function checkToken(){
      const jwt = localStorage.getItem('token');
      if(jwt){
        apiAuth.checkAuth(jwt).then((res) => {
          if(res){
            setIsEmail(res.user.email)
            setLoggedIn(true)
            history.push('/')
          }
        })
        .catch(err => console.log(err));
      } 
    }

    useEffect(() => {
      checkToken();
    }, [checkToken])

  //Выход из профиля 

  function logout(){
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  // Открытие/закрытие попапов

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddCardClick(){
    setIsAddCardOpen(!isAddCardOpen);
  }

  function handleSubmitClick(cardId){
    setIsSubmitOpen(!isSubmitOpen);
    setCardId(cardId);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardOpen(false);
    setIsSubmitOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({});
  }

  return (
  <div className="background-page">
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={isEmail} logout={logout} />        
          <Switch>
            <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick} onAddCard={handleAddCardClick} onCardClick={handleCardClick} 
                            cards={cards} onCardLike={handleCardLike} onSubmitCardDelete={handleSubmitClick} />

            <Route path='/sign-in'>
              <Login onLogin={login}  />
            </Route>

            <Route path='/sign-up'>
              <Register onRegistration={registration} link={'/sign-in'} />
            </Route>

            <Route path='*' component={() => '404 NOT FOUND'} />
          </Switch>
        <Footer />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddCardPopup isOpen={isAddCardOpen} onClose={closeAllPopups} onAddCard={handleAddCardSubmit} />
          <SubmitPopup isOpen={isSubmitOpen} onClose={closeAllPopups}  onCardDelete={handleCardDelete} isCardId={cardId} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} success={isSuccess} />
      </CurrentUserContext.Provider>
    </div>
  </div>
  );
}

export default App;
