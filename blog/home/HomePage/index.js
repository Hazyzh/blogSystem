import React from 'react'
import { Route } from 'react-router-dom'

import { Layout } from 'antd'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Tags = () => (
  <div>
    <h2>Tags</h2>
  </div>
)



const HomePage = () => (
    <Layout style={{background: '#f5f5f5'}}>
        <Header />
        <Layout  className="main-content" style={{background: '#f5f5f5'}}>
             <Route exact path="/" component={Content}/>
             <Route path="/tags" component={Tags}/>
             <Route path="/about" component={About}/>
        </Layout>
        <Footer />
    </Layout>
)

export default HomePage
