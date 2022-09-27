import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import ButtonSubmit from './ButtonSubmit.js';

function AddCardPopup(props){

    const cardNameRef = useRef();
    const cardLinkRef = useRef();

    function handleSubmit(e){
        e.preventDefault();
        props.onAddCard({
            name: cardNameRef.current.value,
            link: cardLinkRef.current.value
        })
    }

    useEffect(() => {
        cardNameRef.current.value = ('')
        cardLinkRef.current.value = ('')
    },[props.isOpen])

    return(
        <PopupWithForm name='add-card' title='Новое место' isOpen={props.isOpen}  onClose={props.onClose} 
                        onSubmit={handleSubmit}>
            <input type="text" className="popup__input popup__input_type_name-image" id="name-image-input" 
             name="name" placeholder="Имя карточки" minLength="2" maxLength="30" ref={cardNameRef} required/>
            <span className="popup__input-error name-image-input-error"></span>
            <input type="url" className="popup__input popup__input_type_link" id="link-input" 
            name="link" placeholder="Ссылка карточки" required ref={cardLinkRef}/>
            <span className="popup__input-error link-input-error"></span>
            <ButtonSubmit buttonText={'Создать'} />
        </PopupWithForm>
    )
}

export default AddCardPopup;