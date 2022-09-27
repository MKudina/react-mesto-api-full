import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import ButtonSubmit from './ButtonSubmit.js';


function EditAvatarPopup(props){

    const  avatarRef = useRef();

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    useEffect(() => {
        avatarRef.current.value = ('')
    },[props.isOpen])

    return(
        <PopupWithForm name='edit-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose}
                        onSubmit={handleSubmit}>
            <input type="url" className="popup__input popup__input_type_link" id="avatar-link-input" 
             name="avatar" placeholder="Ссылка аватара" ref={avatarRef} required/>
            <span className="popup__input-error avatar-link-input-error"></span>
            <ButtonSubmit buttonText={'Сохранить'} />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;