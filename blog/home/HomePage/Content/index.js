import React, { Component } from 'react'
import { Layout, Card, Row, Col, Icon, Tag, message } from 'antd'
const { Content } = Layout
import axios from 'axios'
import { htmlDecode } from 'Utils/index.js'
import { Link } from 'react-router-dom'

class ContentLayout extends Component {

    state ={
        lastestBlog: {},
        lastestBlogs: [],
        tagsinfo: []
    }

    componentDidMount() {
        this.get_tags_info()
        this.get_lastest_blog()
    }
// 获取博客信息
    get_lastest_blog = () => {
        axios('/get_lastest_blog').then(result => {
            var data = result.data

            if (data.code == 0) {
                this.setState({
                    lastestBlog: data.content && data.content[0] || {},
                    lastestBlogs: data.content || []
                })
            } else {
                message.warning(data.message)
            }

        }).catch(err => {
			console.log(err)
            message.error('获取信息错误')
        })
    }
// tags信息
    get_tags_info = () => {
        axios('/get_tags_info').then(result => {
            var data = result.data

            if (data.code == 0) {
                this.setState({
                    tagsinfo: JSON.parse(data.content.tagsInfo).sort((a,b)=>b.count-a.count)
                })
            } else {
                message.warning(data.message)
            }

        }).catch(err => {
            message.error('获取信息错误')
        })
    }


    render(){
        const { lastestBlog, lastestBlogs, tagsinfo } = this.state
        const catalog = lastestBlog.catalog && JSON.parse(lastestBlog.catalog).slice(0, 3) || []
        const len = tagsinfo.length
        return (
            <Content>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card className="lastest-blog">
                            <div className="lastest-title">
                                <div className="tag-content">
                                    <Icon type="tags-o" />
                                    {lastestBlog.tags && lastestBlog.tags.split(',')[0]}
                                </div>
                                <div className="tag-after"></div>
                                <div className="read-count">阅读量： {lastestBlog.readNumber}</div>
                            </div>
                            <div className="blog-content">
                                <div className="title"><a href={`/b/${lastestBlog.blogId}`}><h3>{lastestBlog.title}</h3></a></div>
                                <div className="time">
                                    <Icon type="calendar" />
                                    <span>{lastestBlog.nowtime}</span>
                                </div>
                                <div className="content">
                                    <ul className="box">
                                        {
                                            catalog.map(d=>(<li key={d.id}><span>{htmlDecode(d.text)}</span></li>))
                                        }
                                    </ul>
                                </div>
                                <i className="line"></i>
                                <div className="blog-addr">
                                    <a href={`/b/${lastestBlog.blogId}`}>
                                        前往查看详情
                                        <Icon type="enter" />
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <div className="blogs">
                            <h3>
                                近期文章
                                <Link to="tags"> 归档>> </Link>
                            </h3>
                            <i className="line"></i>
                            <div className="content">
                                <ul>
                                    {
                                        lastestBlogs.map(d=>(
                                            <li key={d.blogId}>
                                                <span className="time">{d.nowtime} >> </span>
                                                <a href={`/b/${d.blogId}`} className="title">{htmlDecode(d.title)}</a>
                                                {d.tags.split(',').map((d,i)=><Tag key={i} color="#71afae" >{d}</Tag>)}
                                            </li>
                                        ))
                                    }
                                    <li>
										<Link to="tags"> <span className="title last-title">查看更多>></span> </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col span={8} className="aside">
                        <Card>
                            <h3>文章分类</h3>
                            <i className="line"></i>
                            <div className="tags-box">
                                {
                                    tagsinfo.map((d, i)=>(
                                        <Tag key={i} color={`rgba(255, 0, 127, ${1-i/(len+1)})`}>
											<Link
												to={{
												  pathname: '/tags',
												  state: {tag: d.val}
											  }} >
												{d.val}
											</Link>
										</Tag>
                                    ))
                                }
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default ContentLayout
