import React from 'react';

import './Logo.css';

import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    // style={{ height: props.height }}
    <div className="Logo" style={{ height: props.height }} >
        <img src={burgerLogo} alt="burger-queen" />
    </div>
);

export default logo;