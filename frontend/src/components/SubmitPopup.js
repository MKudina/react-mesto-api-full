import PopupWithForm from './PopupWithForm.js';
import ButtonSubmit from './ButtonSubmit.js';

function SubmitPopup(props) {

    function handleSubmit(e){
        e.preventDefault();
        props.onCardDelete(props.isCardId)
      }

    return(
        <PopupWithForm name='submit' title='Вы уверены?' isOpen={props.isOpen} onClose={props.onClose} 
                        onSubmit={handleSubmit} children>
            <ButtonSubmit buttonText={'Да'} />
         </PopupWithForm>
    )
}

export default SubmitPopup;