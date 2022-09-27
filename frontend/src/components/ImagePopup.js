function ImagePopup(props){

    return(
        <div className={`popup popup_view-image ${props.card._id && 'popup_opened'}`}>
            <div className="popup__view-container">
              <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
              <img src={props.card.link} className="popup__view-image" alt={props.card.name}/>
            <h2 className="popup__view-title">{props.card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;