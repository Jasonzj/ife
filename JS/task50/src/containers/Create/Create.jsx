import React from 'react'
import { Link } from 'react-router-dom'

// scss
import './Create.scss'

const Create = () => (
    <div className="create">
        <Link to="/newQuestion">
            <button className="create__btn">+新建问卷</button>
        </Link>
    </div>
)

export default Create