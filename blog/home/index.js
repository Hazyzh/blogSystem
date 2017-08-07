import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'


import HomePage from './HomePage'

import './index.less'

ReactDOM.render((
    <Router basename="/blog" >
        <HomePage />
    </Router>
),
    document.getElementById('container')
)


if (module.hot) {
  module.hot.accept()
}
