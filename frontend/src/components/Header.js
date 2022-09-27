import headerLogo from '../images/logoWhite.svg';
import { Link, Route, Switch } from 'react-router-dom'; 

function Header(props){
    return (
        <header className="header">
            <img src={headerLogo} className="header__logo" alt="Лого"/>
            <p className='header__email'>{props.loggedIn && props.email}</p>
            <Switch>
                <Route exact path='/'>
                    <Link to='sign-in' className="header__button" onClick={props.loggedIn && props.logout}> 
                        {'Выход'}
                    </Link>
                </Route>
                <Route path='/sign-in'>
                    <Link to='/sign-up' className="header__button"> 
                        {'Регистрация'}
                    </Link>
                </Route>
                <Route path='/sign-up'>
                    <Link to='/sign-in' className="header__button"> 
                        {'Вход'}
                    </Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;