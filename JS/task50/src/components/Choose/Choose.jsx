import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Choose.scss'

// component
import Options from 'components/Options'
import EditorTitle from 'components/EditorTitle'

const Choose = ({
    setChooseTitle,
    setOptionTitle,
    removeOption,
    removeChoose,
    reuseChoose,
    moveChoose,
    noTextarea,
    addOption,
    disabled,
    options,
    title,
    type,
    down,
    up,
    id
}) => (
    <div className="choose">
        <EditorTitle
            className="choose__title"
            message={title}
            msg={`Q${id + 1}`}
            setTitle={[setChooseTitle, id]}
        />
        {
            options.map((o, i) => (
                <Options
                    key={i}
                    message={o}
                    type={type}
                    optionId={i}
                    chooseId={id}
                    disabled={disabled}
                    setOptionTitle={setOptionTitle}
                    removeOption={removeOption}
                />
            ))
        }
        <div className={noTextarea ? 'choose__btn' : 'choose__btn--textarea'}>
            {
                noTextarea &&
                <button
                    className="choose__btn--add"
                    onClick={() => addOption(id)}
                >
                    +
                </button>
            }

            <button
                className="choose__btn--remove"
                onClick={() => removeChoose(id)}
            >
                删除
            </button>

            <button
                className="choose__btn--reuse"
                onClick={() => reuseChoose(id)}
            >
                复用
            </button>

            {
                up &&
                <button
                    className="choose__btn--up"
                    onClick={() => moveChoose(id, 'up')}
                >
                    上移
                </button>
            }

            {
                down &&
                <button
                    className="choose__btn--down"
                    onClick={() => moveChoose(id, 'down')}
                >
                    下移
                </button>
            }
        </div>
    </div>
)

Choose.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    disabled: PropTypes.number,
    options: PropTypes.array,
    addOption: PropTypes.func,
    moveChoose: PropTypes.func,
    reuseChoose: PropTypes.func,
    removeChoose: PropTypes.func,
    removeOption: PropTypes.func,
    setOptionTitle: PropTypes.func,
    setChooseTitle: PropTypes.func,
    down: PropTypes.bool,
    up: PropTypes.bool,
    noTextarea: PropTypes.bool
}

export default Choose