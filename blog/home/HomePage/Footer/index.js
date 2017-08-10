import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout
import { Link } from 'react-router-dom'


const FooterLayout = () => (
    <Footer className="footer-box">
        <div className="footer-container">
            <p>闽ICP备17009641号</p>
            <p>Copyright ©2017 Powered By hazyzh</p>
        </div>
    </Footer>
)

export default FooterLayout
