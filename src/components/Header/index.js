import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png'

const Header = props => {
    return(
        <header className='header'> 
        <div className='wrap'>
            <div className='logo'>
                {/* componentler bir html elementi gibi işlendiği için </> şeklinde eklenirken dosyalar string ya da binary veri olaraak işlendiği için {} şeklinde ekleniyor */}
                
                <img src={Logo} alt="logo"/>

            </div>
            

        </div>
        </header>
    );
};

export default Header;