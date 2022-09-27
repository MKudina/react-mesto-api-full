function PopupWithForm(props){

    return(
        <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
              <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
              <h2 className="popup__title">{`${props.title}`}</h2>
              <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
                {props.children}
              </form>
            </div>
        </div>
    );
}

export default PopupWithForm;