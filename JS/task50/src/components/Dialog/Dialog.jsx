import React from 'react'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

// scss
import './Diglog.scss'

const Dialog = ({
    message,
    close,
    onClick
}) => (
    <div className="diglog">
        <div className="diglog__box">
            <h1 className="diglog__title">
                提示
                <span
                    className="diglog__close"
                    onClick={close}
                >
                    X
                </span>
            </h1>
            <p className="diglog__content">
                {message}
            </p>
            <div className="diglog__btnBox">
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