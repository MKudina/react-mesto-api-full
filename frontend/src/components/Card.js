import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props){

  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  )
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  )

  function handleClick(){
    props.onCardClick(props.card);
  }

  function handleCardLike(){
    props.onCardLike(props.card);
  }

  function handleSubmitPopup(){
    props.onSubmitCardDelete(props.card._id)
  }
  
  return (
      <li className="card">
        <img src={props.card.link} className="card__image" alt={props.card.name} onClick={handleClick} />
        <button type="button" className={cardDeleteButtonClassName} aria-label="удалить карточку" onClick={handleSubmitPopup}>
          <div className="card__delete-icon card__delete-icon_position_top"></div> 
          <div className="card__delete-icon card__delete-icon_position_bottom"></div>
        </button>
        <div className="card__about">
          <h2 className="card__name">{props.card.name}</h2>
          <div className="card__likes">
            <button type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк" onClick={handleCardLike}></button>
            <p className="card__number-of-likes">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    )
  }

export default Card;