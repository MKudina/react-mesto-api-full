function ButtonSubmit(props){
    return (
        <button type="submit" className="popup__submit" aria-label={props.buttonText}>{props.buttonText}</button>
    )
}

export default ButtonSubmit;