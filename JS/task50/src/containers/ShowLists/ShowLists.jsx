import React from 'react'
import { Link } from 'react-router-dom'

import Lists from 'components/Lists'

// scss
import './ShowLists.scss'

const ShowLists = () => (
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
                        <Link to="/create">
                            <button>+新建问卷</button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <Lists />
        </table>
    </div>
)

export default ShowLists