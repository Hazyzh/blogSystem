import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Layout } from 'antd'
const { Footer, Sider } = Layout

import Header from './Header'
import Content from './Content'


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
    <Layout>
        <Header />
        <Layout className="main-content">
             <Route exact path="/" component={Content}/>
             <Route path="/tags" component={Tags}/>
             <Route path="/about" component={About}/>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
)

export default HomePage
