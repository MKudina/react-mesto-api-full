import {useContext, useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import ButtonSubmit from './ButtonSubmit.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props){

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    function handleChangeName(e){
        setName(e.target.value)
    }

    function handleChangeAbout(e){
        setAbout(e.target.value)
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: about,
        })
    }

    return (
        <PopupWithForm name='profile' title='Редактировать профиль' isOpen={props.isOpen} 
                        onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" value={name || ''} className="popup__input popup__input_type_name" id="name-input" 
             name="name" minLength="2" maxLength="40" placeholder="Имя профиля" onChange={handleChangeName} required/>
            <span className="popup__input-error name-input-error"></span>
            <input type="text" value={about || ''} className="popup__input popup__input_type_about" id="about-input" 
            name="about" minLength="2" maxLength="200" placeholder="О профиле" onChange={handleChangeAbout} required/>
            <span className="popup__input-error about-input-error"></span>
            <ButtonSubmit buttonText={'Сохранить'} />
      </PopupWithForm>
    )
}

export default EditProfilePopup;