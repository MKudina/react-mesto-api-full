import { useState } from "react";

function Login(props){

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
        props.onLogin({
            password: password,
            email: email
        })        
    }

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input type="email" className="login__input login__input_type_email" id="email-input"
                name="email" minLength="2" maxLength="20" placeholder="Email" onChange={handleChangeEmail} required></input>
                <input type="password" className="login__input login__input_type_password" id="password-input"
                name="password" minLength="8" maxLength="25" placeholder="Пароль" onChange={handleChangePassword} required></input>
                <button type='submit' className="login__submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;