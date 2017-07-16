import React, { Component } from 'react'

// scss
import './Lists.scss'

class Lists extends Component {
    constructor() {
        super()
        this.state = {
            id: 1
        }
    }

    render() {
        return (
            <div className="lists">
                <table className="lists__table">
                    <thead className="lists__table__head">
                        <tr>
                            <th />
                            <th>标题</th>
                            <th>时间</th>
                            <th>状态</th>
                            <th>操作</th>
                            <th>
                                <button>+新建问卷</button>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

export default Lists