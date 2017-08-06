import React from 'react'
import { Affix, BackTop } from 'antd'
import Catalog from './components/Catalog.js'
import TalkBox from './components/TalkBox.js'

// const app = ()=> (
//     <div className="aside-box">
//         <Affix>
//             <p>导航栏</p>
//             <Catalog />
//             <p className="chat-box">讨论区</p>
//         </Affix>
//     </div>
// )

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="aside-box">
               <Affix>
                   <p>导航栏</p>
                   <Catalog />
                   <p className="chat-box">讨论区</p>
                   <TalkBox />
                   <BackTop />
               </Affix>
            </div>
        )
    }
}

export default App
