import React, { Component } from 'react'
import { Row, Col, Icon, Tag, message, Card, Spin, Pagination } from 'antd'
import axios from 'axios'
const CheckableTag = Tag.CheckableTag
import QueueAnim from 'rc-queue-anim'

import { htmlDecode } from 'Utils/index.js'

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

class Tags extends Component {

	state = {
		lastestBlogs: [],
		tagsinfo: [],
		checklist: [],
		params: {
			pageNum: 1
		},
		blogsList: [],
		loading: false,
		total: 0
	}

	componentWillMount() {
		let a = this.props.location.state || {}
		let { tag } = a
		tag && this.setState({ checklist: [tag.trim()] })

		this._getTagsInfo()
		this._getBlogsInfo({pageNum: 1, tags: tag})
	}
	// 查找tags
	_getTagsInfo = () => {
		axios('/get_tags_info').then(result => {
			var data = result.data
			console.log(data)
			if (data.code == 0) {
				this.setState({
					tagsinfo: JSON.parse(data.content.tagsInfo).map(d => ({...d, val: d.val.trim()}))
				})
			} else {
				message.warning(data.message)
			}

		}).catch(err => {
			message.error('获取信息错误')
		})
	}
	// 查找博客
	_getBlogsInfo = (params) => {
		this.setState({loading: true})
		axios('/tags_blogs_list', {
			params
		}).then(result => {
			var data = result.data
			let { pageNum, tags, total } = data
			this.setState({
				blogsList: data.content || [],
				loading: false,
				params: {
					pageNum,
					tags
				},
				total
			})
		}).catch(err => {
			message.error('获取信息错误')
			this.setState({loading: false})
		})
	}
	// tag改变
	handleChange = (name, checked) => {
		let { checklist } = this.state
		let newList = []
		if ( checklist.includes(name) ) {
			newList = checklist.filter(d => d != name)
		} else {
			newList = [...checklist, name]
		}

		this.setState({checklist: newList})
		let params = {
			pageNum: 1,
			tags: newList.join(',')
		}
		this._getBlogsInfo(params)
	}
	// 分页改变
	onPageChange = (page, pageSize) => {
		let params = {
			...this.state.params,
			pageNum: page
		}
		this._getBlogsInfo(params)
	}
	render() {
		let { blogsList, checklist, loading, total, params } = this.state
		return (
			<Row>
				<Col span={16}>
					<Spin
						spinning={loading}
						tip="Loading..." >
						<div className="content tags-content">
							{	blogsList.length == 0 &&
								<div className="no-data">
									<p className="icon"><Icon type="coffee" /></p>
									<div>
										{
											checklist.map(d =>
												<Tag color="#87d068" className="tagss" key={d}>
													<Icon type="tag-o" /> {d}
												</Tag>
											)
										}
									</div>
									<p className="tip">没有找到相关内容 看看其他的吧</p>
								</div>
							}
							<ul>
								<QueueAnim
									type={ ['alpha'] }
									duration={300}
									leaveReverse >
								{
									blogsList.map(d=>(
										<li key={d.blogId} style={{paddingBottom: '5px'}}>
											<p className="time">
												<Icon type="clock-circle-o" />
												{d.nowtime}
											</p>
											<div className="blog-item-info">
												<a href={`/b/${d.blogId}`} className="title">{htmlDecode(d.title)}</a>
												{
													d.tags.split(',').map((d,i)=>
														<Tag
															key={i}
															color={checklist.includes(d.trim()) ? "#f16d7a" : "#71afae"} >{d}</Tag>
													)
												}
											</div>
											<i className="line" style={{height: '2px'}}></i>
										</li>
									))
								}
								</QueueAnim >
							</ul>
							{
								total > 10 &&
								<Pagination
									style={{float: 'right', margin: '10px'}}
									showTotal={total => `共计 ${total} 条`}
									showQuickJumper
									current={Number(params.pageNum)}
									total={total}
									onChange={this.onPageChange} />
							}
						</div>
					</Spin>
				</Col>

				<Col span={8} className="aside">
					<Card>
						<h3>标签分类</h3>
						<i className="line"></i>
						{
							this.state.tagsinfo.map((d, i) =>
								<CheckableTag
									style={{margin: '5px 10px'}}
									key={d.val}
									checked={this.state.checklist.includes(d.val)}
									onChange={checked => this.handleChange(d.val, checked)} >
									{d.val}
								</CheckableTag>
							)
						}
					</Card>
				</Col>
			</Row>
		)
	}
}

export default Tags
