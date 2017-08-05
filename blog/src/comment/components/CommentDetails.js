import React, { Component } from 'react'
import { Row, Col, Input, Form, Button, message, Avatar, Icon, Popconfirm } from 'antd'
import moment from 'moment'

class CommentDetails extends Component {
    state = {
        usercomment: '',
        isload: false
    }

    commit() {
        console.log(this.state.usercomment)
        var comment = this.state.usercomment && this.state.usercomment.replace(/\s+/g, '')
        if(!comment) {
            message.warning('请输入内容')
        } else {
            this.setState({
                isload: true
            })
            let callback = () => {
                this.setState({
                    usercomment: '',
                    isload: false
                })
            }

            this.props.addComment(comment, this.props.commentInfo.id, callback)
        }
    }

    render() {
        var commentInfo = this.props.commentInfo,
            timeIsOk = !moment(commentInfo.createdate).add(1, 'd').isBefore(moment()),
            childIsOk = commentInfo.childern.length === 0

        return (
            <div className="user-comment-box">
                <Row className="comment-content">
                    <Col span={24}>
                        <p className="text">
                            {commentInfo.commentContent}
                        </p>
                    </Col>
                    <Col span={12} className="info">
                        <span className="inner-comment" onClick={() => this.props.changeShow(this.props.commentInfo.id)}><Icon type="ellipsis" /> {commentInfo.childern.length ? commentInfo.childern.length : ''} 评论</span>
                        {timeIsOk && childIsOk && commentInfo.isUser && <span
                            className="inner-delete">
                            <Popconfirm title="确定要删除此评论吗?" onConfirm={() => this.props.deleteComment(this.props.commentInfo.id)}>
                                <Icon type="close-circle" /> 删除
                           </Popconfirm>
                        </span>}
                    </Col>
                    <Col offset={4} span={2}>
                        <a href={commentInfo.commentUserUrl}>
                            <Avatar
                                shape="square"
                                size="large"
                                src={commentInfo.commentUserHead} />
                        </a>
                    </Col>
                    <Col span={6}>
                        <a href={commentInfo.commentUserUrl}>
                            {commentInfo.commentUser}
                        </a>
                        <span className="time">{commentInfo.createTime}</span>
                    </Col>
                </Row>
                <div style={{display: this.props.showState[commentInfo.id] ? 'block' : 'none'}}>
                    {
                        commentInfo.childern.map(d=>(
                            <Row className="userComment" key={d.id}>
                                <Col offset={4} span={20} className="info-one">
                                    <span className="content">{d.commentContent}</span>
                                    <a href={d.commentUserUrl}>
                                     {d.commentUser}
                                    </a>
                                    <span className="time">{d.createTime}</span>
                                    {d.isUser && !moment(d.createdate).add(1, 'd').isBefore(moment()) && <span
                                        className="inner-delete">
                                        <Popconfirm title="确定要删除此评论吗?" onConfirm={() => this.props.deleteComment(d.id)}>
                                            <Icon type="close-circle" /> 删除
                                       </Popconfirm>
                                    </span>}
                                </Col>
                            </Row>
                        ))
                    }
                    <Row className="user-form">
                        <Col span={20}>
                            <Input
                                value={this.state.usercomment}
                                onChange={e => this.setState({usercomment: e.target.value})}/>
                        </Col>
                        <Col span={4} className="btn">
                            <Button disabled={this.state.isload} onClick={e => this.commit()}>提交评论</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default CommentDetails
