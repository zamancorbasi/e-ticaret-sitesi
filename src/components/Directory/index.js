import React from "react";
import Coraline_endpaper_1 from '../../assets/kategori1.jpeg';
import Coraline_endpaper_2 from '../../assets/kategori2.jpeg';
import './styles.scss';

const Directory = props => {
    return(
        <div className="directory">
            <div className="wrap">
            <div
                className="item1"
                style={{
                    backgroundImage: `url(${Coraline_endpaper_1})`
                }}
            >
            <a>
                sağ
            </a>
            </div>
            <div
                className="item2"                
                style={{
                    backgroundImage: `url(${Coraline_endpaper_2})`
                }}
            >
            <a>
                sol
            </a>
            </div>
            </div>
        </div>
        
        
        
        
    );
};

export default Directory;