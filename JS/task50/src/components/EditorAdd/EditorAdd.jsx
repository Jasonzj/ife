import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// component
import Button from 'components/Button'

const EditorAdd = ({
    showAddBox,
    toggleAddBoxHandle,
}) => (
    <div className="editor__add">
        <ReactCSSTransitionGroup
            transitionName="addBox"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
            {
                showAddBox &&
                <div className="editor__add__box">
                    <Button className={1}>单选</Button>
                    <Button className={1}>多选</Button>
                    <Button className={1}>文本框</Button>
                </div>
                
            }
        </ReactCSSTransitionGroup>
        <div
            className="editor__add__btn"
            onClick={toggleAddBoxHandle}
        >
            +添加问题
        </div>
    </div>
)

EditorAdd.propTypes = {
    toggleAddBoxHandle: PropTypes.func,
    showAddBox: PropTypes.bool
}

export default EditorAdd