import Success from '../images/Success.png';
import Fail from '../images/Fail.png'

function InfoTooltip(props){
    return(
        <div className={`info-tooltip ${props.isOpen && 'info-tooltip_opened'}`}>
            <div className="info-tooltip__container">
                <button type="button" className="info-tooltip__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
                <img src={props.success ? Success : Fail} className="info-tooltip__image" />
                <h2 className="info-tooltip__title">{props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;