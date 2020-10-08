import React from 'react';
import './header.scss';


const Header = () => {

    return (
        <header className="header">
            <h1 className="title">Unsplash Photo-Viewer</h1>
            <span className="subtitle">Приложение для просмотра фотографий с сайта unsplash.com</span>
        </header>
    )
}

export default Header;