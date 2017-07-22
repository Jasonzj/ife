import React from 'react'
import PropTypes from 'prop-types'

// component
import Choose from 'components/Choose'

const EditorMain = ({
    check,
    chooses,
    disabled,
    addOption,
    moveChoose,
    reuseChoose,
    removeChoose,
    removeOption,
    setOptionTitle,
    setChooseTitle,
}) => (
    <div className="editor__main">
        {
            chooses.map((item, i) => (
                <Choose
                    key={i}
                    check={check}
                    disabled={disabled}
                    up={item.id !== 0}
                    down={item.id !== (chooses.length - 1)}
                    noTextarea={item.type !== 'textarea'}
                    addOption={addOption}
                    moveChoose={moveChoose}
                    reuseChoose={reuseChoose}
                    removeOption={removeOption}
                    removeChoose={removeChoose}
                    setOptionTitle={setOptionTitle}
                    setChooseTitle={setChooseTitle}
                    {...item}
                />
            ))
        }
    </div>
)

EditorMain.propTypes = {
    chooses: PropTypes.array,
    setOptionTitle: PropTypes.func,
    removeOption: PropTypes.func,
    setChooseTitle: PropTypes.func,
    addOption: PropTypes.func,
    removeChoose: PropTypes.func,
    reuseChoose: PropTypes.func,
    moveChoose: PropTypes.func,
    disabled: PropTypes.bool,
    check: PropTypes.bool
}

export default EditorMain