import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/index.js'
import Comment from './comment/index.js'
import './index.less'


ReactDOM.render(
    <App />,
    document.getElementById('asideContent')
)

ReactDOM.render(
    <Comment />,
    document.getElementById('comment')
)

if (module.hot) {
  module.hot.accept()
}
