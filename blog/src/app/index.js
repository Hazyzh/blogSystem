import React from 'react'
import { Affix } from 'antd'
import Catalog from './components/Catalog.js'

const app = ()=> (
    <div className="aside-box">
        <Affix>
            <p>导航栏</p>
            <Catalog />
            <p className="chat-box">讨论区</p>

        </Affix>
    </div>
)

export default app
