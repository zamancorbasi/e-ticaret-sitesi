import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom';

const Header = props => {
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
                <ul>
                    <li>
                        <Link to="/reg">
                        Register
                        </Link>
                        
                    </li>
                    <li>
                        <Link to="/log">
                        Login
                        </Link>
                    </li>
                </ul>                   
            </div>
            

        </div>
        </header>
    );
};

export default Header;