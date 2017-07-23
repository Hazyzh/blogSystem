import React,{ Component } from 'react'
import { Anchor } from 'antd'
const { Link } = Anchor

import axios from 'axios'
import data from './data.json'

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '1'
        }
    }

    componentWillMount(){
        console.log(1)
        // axios.get('/helloworld')
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
        var links = loop(data)
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
