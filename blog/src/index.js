import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/index.js'
import 'antd/dist/antd.less'
import './index.less'

ReactDOM.render(
    <App />,
    document.getElementById('asideContent')
)

if (module.hot) {
  module.hot.accept();
}
