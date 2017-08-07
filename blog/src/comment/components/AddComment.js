import React, { Component } from 'react'
import { Row, Col, Input, Form, Button, message, Avatar, Icon, Modal } from 'antd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
const FormItem = Form.Item

import CommentDetails from './CommentDetails.js'
import axios from 'axios'
import logo from './weibo.png'

const formatlist = (list) => {
    let obj = {}, newlist = []
    list.forEach(d=> {
        if (d.pid) {
            if(!obj[d.pid]) obj[d.pid] = []

            obj[d.pid].push(d)
        } else {
            newlist.push(
                {...d,childern: obj[d.id] || []}
            )
        }
    })

    return newlist
}

class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
            commentList: [],
            showState: {}
        }
        this.getCommnet = this.getCommnet.bind(this)
    }

    componentDidMount() {
        this.getCommnet()
    }


    getCommnet() {
        var url = window.location.pathname.replace('b', 'blog_comment')

        axios.get(url, {headers: {'Cache-Control': 'no-cache'}}).then(result => {
            let { data } = result
            if(data.code == 0) {
                let list = data.content || []
                this.setState({
                    commentList: formatlist(list)
                })
            } else {
                message.warning(data.message)
            }
        }).catch(err => {
            message.error('加载评论信息失败')
        })
    }

    changeShow(id) {
        this.setState({
            showState: {
                ...this.showState,
                [id]: !this.state.showState[id]
            }
        })
    }

    addComment(val, pid, callback){
        var blogId = window.location.pathname.slice(3)
        var comment =val && val.replace(/\s+/g, '')
        if(!comment) {
            message.warning('请输入评论内容')
        } else {
            this.setState({
                isAdd: true
            })
            axios({
                method: 'post',
                url: '/blog_comment',
                data: { blogId, pid, comment: val }
            }).then(data => {
                if(data.data.code == 0) {
                    message.success('评论成功')
                    this.getCommnet()
                    callback()
                } else {
                    const modal = Modal.error({
                       title: '发表失败',
                       content: data.data.message
                     })
                     setTimeout(() => modal.destroy(), 3000)
                }
                this.setState({
                    isAdd: false
                })
            }).catch(err => {
                console.log(err)
                if(callback)callback()

                this.setState({
                    isAdd: false
                })
            })
        }
    }

    deleteComment(id){
        axios({
            method: 'delete',
            url: '/blog_comment',
            params: { id }
        }).then(data => {
            if(data.data.code == 0) {
                message.success('删除成功')
                this.getCommnet()
            } else {
                message.warning(data.data.message)
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue, resetFields } = this.props.form
        var state = encodeURIComponent('weibo,'+window.location.pathname + '#comment')
        var url = 'https://api.weibo.com/oauth2/authorize?client_id=1475313306&redirect_uri=http:%2F%2Fwww.hazyzh.com%2Foauth'+'&state='+state

        return (
            <div className="comment-box">
                <Row gutter={24}>
                    <Col span={4}>
                        <b className="title">评论:</b>
                    </Col>
                    <Col offset={16} span={4}>
                        <span className="login-type">
                            登录：
                            <a href={url}>
                                <Avatar shape='square' src={logo} />
                            </a>
                        </span>
                    </Col>
                    <Col>
                        <Form>
                            <FormItem>
                                {
                                    getFieldDecorator('addComment')(
                                        <Input
                                            type="textarea"
                                            style={{ height: 150, resize: 'none' }} />
                                    )
                                }
                            </FormItem>
                        </Form>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button
                            type="primary"
                            disabled={this.state.isAdd}
                            onClick={e => this.addComment(getFieldValue('addComment'), 0, () => resetFields(['addComment']))}
                            size="large" >
                            发表评论
                        </Button>
                    </Col>
                </Row>
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: 'slideInDown',
                        leave: 'bounceOut',
                    }}
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={1500}
                    transitionLeaveTimeout={1500} >
                {this.state.commentList.map(d=>
                    (<CommentDetails
                        changeShow={(id) => this.changeShow(id)}
                        showState={this.state.showState}
                        commentInfo={d}
                        deleteComment={(id) => this.deleteComment(id)}
                        key={d.id}
                        addComment={(val, pid, callback)=>this.addComment(val, pid, callback)} />)
                )}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default Form.create()(AddComment)
