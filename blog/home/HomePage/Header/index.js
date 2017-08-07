import React from 'react'
import { Layout } from 'antd'
const { Header } = Layout
import { Link } from 'react-router-dom'

import logo from './home.png'

const HeaderLayout = () => (
    <Header className="header-box">
        <div className="header-container">
            <div className="logo">
                <a href="#"><img src={logo} title="hazyzh的个人博客" /></a>
            </div>
            <div className="left-menu">
                <Link to="/">主页</Link>
                <Link to="/tags">标签分类</Link>
                <Link to="/about">个人中心</Link>
            </div>
        </div>
    </Header>
)

export default HeaderLayout
