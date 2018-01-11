import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// component
import Button from 'components/Button'

class EditorAdd extends Component {
    shouldComponentUpdate(nextProps) {
        const showAddBox = nextProps.showAddBox
        return !this.props.showAddBox === showAddBox
    }

    render() {
        const {
            addRadio,
            showAddBox,
            addCheckBox,
            addTextarea,
            toggleAddBoxHandle
        } = this.props

        return (
            <div className="editor__add">
                <ReactCSSTransitionGroup
                    transitionName="addBox"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        showAddBox &&
                        <div className="editor__add__box">
                            <Button className={1} onClick={addRadio}>单选</Button>
                            <Button className={1} onClick={addCheckBox}>多选</Button>
                            <Button className={1} onClick={addTextarea}>文本框</Button>
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
    }
}

EditorAdd.propTypes = {
    addRadio: PropTypes.func,
    showAddBox: PropTypes.bool,
    addCheckBox: PropTypes.func,
    addTextarea: PropTypes.func,
    toggleAddBoxHandle: PropTypes.func,
}

export default EditorAdd