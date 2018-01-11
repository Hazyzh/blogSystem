import React from 'react'
import { Route } from 'react-router-dom'

import { Layout } from 'antd'

import Header from './Header'
import Footer from './Footer'

import Content from './Content'
import Tags from './Tags'
import Abouts from './Abouts'





const HomePage = () => (
    <Layout style={{background: '#f5f5f5'}}>
        <Header />
        <Layout  className="main-content" style={{background: '#f5f5f5'}}>
             <Route exact path="/" component={Content}/>
             <Route path="/tags" component={Tags}/>
             <Route path="/about" component={Abouts}/>
        </Layout>
        <Footer />
    </Layout>
)

export default HomePage
