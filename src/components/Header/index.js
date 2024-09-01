import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom';
import {auth} from './../../firebase/utils'

const Header = props => {
    const {currentUser} = props;
     
    return(
        <header className='header'> 
        <div className='wrap'>
            <div className='logo'>
                {/* componentler bir html elementi gibi işlendiği için </> şeklinde eklenirken dosyalar string ya da binary veri olaraak işlendiği için {} şeklinde ekleniyor */}
                <Link to="/">
                <img src={Logo} alt="logo"/>
                </Link>
                
            </div>
            <div className='callToActions'>

                {currentUser && (
                <ul>
                <li>
                    <span onClick={()=> auth.signOut()}>
                    LogOut
                    </span>
                </li>
                </ul>
                )}

                {!currentUser && (
                    <ul>
                    <li>
                        <Link to="/reg">
                        REGISTER
                        </Link>
                        
                    </li>
                    <li>
                        <Link to="/log">
                        LOGIN
                        </Link>
                    </li>
                    </ul>                   
                )}
                
            </div>

        </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;