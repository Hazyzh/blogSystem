import React, { Component } from 'react'
import { Card, Input, Icon, Form, message, Tag } from 'antd'
const FormItem = Form.Item
import io from 'socket.io-client'
import moment from 'moment'
import Scroll from 'react-scroll'
const scroll = Scroll.animateScroll


const COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
]

function getUsernameColor (username) {
  // Compute hash code
  var hash = 7;
  for (var i = 0; i < username.length; i++) {
     hash = username.charCodeAt(i) + (hash << 5) - hash;
  }
  // Calculate color
  var index = Math.abs(hash % COLORS.length);
  return COLORS[index];
}

let isOver

class TalkBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            chatName: '',
            socket: {},
            peopleNumber: 1
        }
    }

    componentWillMount(){
        const socket = io('/b')

        this.setState({
            socket
        })

        socket.on('connect', function(){
            console.log('socket','content----')
        })

        socket.on('hi', (data) => {
            this.setState({
                chatName: data
            })
            console.log(data, this.state)
        })

        socket.on('join', (data) => {
            console.log('join', data)
        })

        socket.on('leave', (data) => {
            console.log('leave', data)
        })

        socket.on('say', (item) => {
            console.log('say', item)
            item.isMe = false
            this.setState({
                data: [...this.state.data, item]
            })
            if(!isOver) {
                scroll.scrollToBottom({
                    containerId: 'containerElement',
                    duration: 1500
                })
            }
        })

        socket.on('peopleNumber', (num) => {
            console.log('now-people-num', num)
            this.setState({
                peopleNumber: num
            })
        })
    }

    emitEmpty() {
        const { resetFields } = this.props.form
        resetFields(['hello'])
    }

    say(e) {
        e.preventDefault()
        const { resetFields, getFieldValue } = this.props.form
        const { socket } = this.state

        var val = getFieldValue('hello') && getFieldValue('hello').replace(/\s+/g, '')
        if(val) {
            var time = moment().format('HH:mm:ss')
            // console.log(time, val)
            var name = this.state.chatName
            var item = {
                time,
                name,
                content: getFieldValue('hello'),
                isMe: true
            }

            this.setState({
                data: [...this.state.data, item]
            })
            resetFields(['hello'])
            // socket
            socket.emit('say', item)
            scroll.scrollToBottom({
                containerId: 'containerElement',
                duration: 1500
            })
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
                    <span className="name" style={{color: getUsernameColor(d.name)}}>{d.name}</span> <span className="time">{ d.time }</span>
                    <p>{d.content}</p>
                </div>
            )
        })
        return (
            <div>
                <p className="people-number">在线 <span>{this.state.peopleNumber}</span> 人</p>
                <Card
                    bodyStyle={{ padding: '10px 5px', border: 'none' }}
                    onMouseEnter={() => { isOver = true} }
                    onMouseLeave={() => { isOver = false} } >
                    <div className="talk-container" id="containerElement">
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
