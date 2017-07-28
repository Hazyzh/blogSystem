import React, { Component } from 'react'
import { Anchor } from 'antd'
const { Link } = Anchor

import axios from 'axios'

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount(){
        var ipurl = 'http://restapi.amap.com/v3/ip'
        var key = 'e38506ecc1e237f3a242b11fef36a18e'
        var parameters = {
            key,
            ip: '120.35.119.10',
        }
        axios({
            method:"get",
            url: ipurl,
            params: parameters
        }).then(data=>{
            console.log(data)
        })
        var url = window.location.pathname.replace('b', 'get_catalog')
        // var url = "/get_catalog/170720113848"

        axios.get(url).then(data => {
            var blog_catalog = JSON.parse(data.data)
            this.setState({
                data: blog_catalog
            })
        })
    }

    render() {
        var loop = (list)=> {
            return list.map(d=>{
                if(d.children && d.children.length) {
                    return (<Link href={d.id} title={htmlDecode(d.text)} key={d.id}>{loop(d.children)}</Link>)
                }else {
                    return (<Link href={d.id} title={htmlDecode(d.text)} key={d.id}/>)
                }
            })
        }
        var links = loop(this.state.data)
        return (
            <div>
                <Anchor>
                    {links}
                </Anchor>
            </div>
        )
    }
}

export default Catalog
