import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props){

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    function handleChangeEmail(e){
        setEmail(e.target.value)
    }

    function handleChangePassword(e){
        setpassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onRegistration({
            password: password,
            email: email
        })        
    }

    return(
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input type="email" className="register__input register__input_type_email" id="email-input"
                name="email" minLength="2" maxLength="20" placeholder="Email" onChange={handleChangeEmail} required></input>
                <input type="password" className="register__input register__input_type_password" id="password-input"
                name="password" minLength="8" maxLength="25" placeholder="Пароль" onChange={handleChangePassword} required></input>
                <button type="submit" className="register__submit">Зарегистрироваться</button>
            </form>
            <Link to={props.link} className="register__button-login">
                Уже зарегистрированы? Войти
            </Link>
        </div>
    )
}

export default Register;