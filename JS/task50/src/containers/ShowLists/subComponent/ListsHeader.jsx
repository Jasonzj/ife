import React from 'react'
import { Link } from 'react-router-dom'

const ListHeader = () => (
    <thead className="lists__table__head">
        <tr>
            <th />
            <th>标题</th>
            <th>时间</th>
            <th>状态</th>
            <th>操作</th>
            <th>
                <Link to="/newQuestion">
                    <button>+新建问卷</button>
                </Link>
            </th>
        </tr>
    </thead>
)

export default ListHeader