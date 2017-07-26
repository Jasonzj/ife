import React from 'react'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

// scss
import './Dialog.scss'

const Dialog = ({
    message,
    close,
    onClick
}) => (
    <div className="dialog">
        <div className="dialog__box">
            <h1 className="dialog__title">
                提示
                <span
                    className="dialog__close"
                    onClick={close}
                >
                    X
                </span>
            </h1>
            <p className="dialog__content">
                {message}
            </p>
            <div className="dialog__btnBox">
                <Button
                    className={2}
                    onClick={() => {
                        onClick()
                        close()
                    }}
                >
                    确定
                </Button>
                <Button
                    className={1}
                    onClick={close}
                >
                    取消
                </Button>
            </div>
        </div>
    </div>
)

Dialog.propTypes = {
    message: PropTypes.string,
    close: PropTypes.func,
    onClick: PropTypes.func
}

export default Dialog