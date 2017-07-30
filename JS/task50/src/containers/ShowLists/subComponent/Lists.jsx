// import React from 'react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// components
import Item from './Item'
import Dialog from 'components/Dialog'

// action
import { AtoggleChecked, AremoveQuestion, AsetDialog, AchangeState } from 'action/questionnaires'

const stateTexts = ['未发布', '发布中', '已结束']

const getState = state => ({
    lists: state.lists,
    dialog: state.dialog.bool,
    dialogFunc: state.dialog.func,
    message: state.dialog.message
})

const getDispatch = dispatch => ({
    toggleChecked(id) {
        dispatch(AtoggleChecked(id))
    },
    removeQuestion(id) {
        dispatch(AremoveQuestion(id))
    },
    setDialog(bool, func, message) {
        dispatch(AsetDialog(bool, func, message))
    },
    changeEndState(id) {
        dispatch(AchangeState(id, 2))
    }
})

@connect(
    getState,
    getDispatch
)
class Lists extends Component {
    componentWillMount() {
        const { lists, history, changeEndState } = this.props
        if (!lists.length) {
            history.push('/create')
        }

        const date = new Date()
        lists.forEach((item) => {
            if (new Date(item.endTime) < date && item.state !== 2) {
                changeEndState(item.id)
            }
        })
    }

    render() {
        const {
            lists,
            dialog,
            toggleChecked,
            removeQuestion,
            setDialog,
            dialogFunc,
            message
        } = this.props

        return (
            <tbody className="lists__table__body">
                {
                    lists.map(item => (
                        <Item
                            key={item.id}
                            stateText={stateTexts[item.state]}
                            stateClassName={item.state === 1 ? 'color--success' : ''}
                            toggleChecked={toggleChecked}
                            setDialog={setDialog}
                            btnStateT={item.state ? 0 : 1}
                            btnStateF={item.state ? 1 : 0}
                            removeQuestion={removeQuestion}
                            {...item}
                        />
                    ))
                }
                <tr style={{ border: '0px' }}>
                    <ReactCSSTransitionGroup
                        component="th"
                        transitionName="dialog"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {
                            dialog &&
                            <Dialog
                                message={message}
                                close={() => setDialog(false, null)}
                                onClick={dialogFunc}
                            />
                        }
                    </ReactCSSTransitionGroup>
                </tr>
            </tbody>
        )
    }
}

Lists.propTypes = {
    lists: PropTypes.array,
    dialog: PropTypes.bool,
    toggleChecked: PropTypes.func,
    removeQuestion: PropTypes.func,
    setDialog: PropTypes.func,
    dialogFunc: PropTypes.func,
    message: PropTypes.string,
    history: PropTypes.any,
    changeEndState: PropTypes.func
}

export default Lists