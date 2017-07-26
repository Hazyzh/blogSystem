import React, { Component } from 'react'
import { Card, Input, Icon, Form, message, Tag } from 'antd'
const FormItem = Form.Item

class TalkBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                name: 'zhangsan',
                time: '09:12:11',
                content: 'hello world !'
            }, {
                name: 'zhangsan',
                time: '09:12:11',
                content: 'hello world !'
            }, {
                name: 'zhangsan',
                time: '09:12:11',
                content: 'hello world !'
            }, {
                name: 'zhangsan',
                time: '09:12:11',
                content: 'hello world !'
            }, {
                name: 'zhangsan',
                time: '09:12:11',
                content: 'hello world !',
                isMe: true,
            }]
        }
    }

    componentWillMount(){

    }

    emitEmpty() {
        const { resetFields } = this.props.form
        resetFields(['hello'])
    }

    say(e) {
        e.preventDefault()
        const { resetFields, getFieldValue } = this.props.form
        var val = getFieldValue('hello').replace(/\s+/g, '')
        if(val) {
            console.log(val)
        } else {
            message.warning('请输入内容')
        }
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const suffix = getFieldValue('hello') ? <Icon type="close-circle" onClick={() => this.emitEmpty()} /> : null;
        var datalist = this.state.data.map((d,index)=> {
            return (
                <div key={index} className={d.isMe ? 'my-talk' : ''}>
                    <span className="name">{d.name}</span> <span className="time">{ d.time }</span>
                    <p>{d.content}</p>
                </div>
            )
        })
        return (
            <div>
                <Card
                    bodyStyle={{ padding: '10px 0' }} >
                    <div className="talk-container">
                        {datalist}
                    </div>
                    <Form onSubmit={(e) => this.say(e)}>
                        {
                            getFieldDecorator('hello')(
                                <Input
                                   size="large"
                                   placeholder="Talk about it casually"
                                   prefix={<Icon type="notification" />}
                                   suffix={suffix}/>
                            )
                        }
                    </Form>

                </Card>
            </div>
        )
    }
}

export default Form.create()(TalkBox)
