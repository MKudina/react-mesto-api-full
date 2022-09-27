import {useContext} from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props){
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__edit-avatar-button" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" aria-label="Изменить профиль" onClick={props.onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить карточку" onClick={props.onAddCard}></button>
      </section>

      <section>
        <template className="cards cards-template_type_default">
          {props.cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} 
                   onSubmitCardDelete={props.onSubmitCardDelete} />
          ))}
        </template>
      </section>
    </main>
  );
    
}

export default Main;