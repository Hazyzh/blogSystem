import React, { Component } from 'react'

import AddComment from './components/AddComment.js'

class Comment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="comment-box">
                <AddComment />
            </div>
        )
    }
}

export default Comment
