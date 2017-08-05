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
        var url = window.location.pathname.replace('b', 'get_catalog')

        axios.get(url).then(data => {
            var results = data.data,
                blog_catalog = JSON.parse(results.catalog),
                readNumber = results.readNumber

            this.setState({
                data: blog_catalog
            })
            document.getElementById('countNumbers').innerText = '阅读数： ' + readNumber
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
