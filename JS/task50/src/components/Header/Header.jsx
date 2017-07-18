import React from 'react'
import { Link } from 'react-router-dom'

// scss
import './Header.scss'

const Header = () => (
    <header className="header">
        <span className="header__logo">?</span>
        <Link to="/">
            <h1 className="header__title">问卷管理</h1>
        </Link>
        <h2 className="header__title-s">我的问卷</h2>
    </header>
)

export default Header