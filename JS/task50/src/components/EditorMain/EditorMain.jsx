import React from 'react'
import PropTypes from 'prop-types'

// component
import Choose from 'components/Choose'

const EditorMain = ({
    chooses,
    addOption,
    moveChoose,
    reuseChoose,
    removeChoose,
    removeOption,
    setOptionTitle,
    setChooseTitle,
}) => {
    console.log(chooses)
    return (
        <div className="editor__main">
            {
                chooses.map(item => (
                    <Choose
                        key={item.id}
                        disabled={1}
                        up={item.id !== 0}
                        down={item.id !== (chooses.length - 1)}
                        addOption={addOption}
                        moveChoose={moveChoose}
                        reuseChoose={reuseChoose}
                        removeOption={removeOption}
                        removeChoose={removeChoose}
                        setOptionTitle={setOptionTitle}
                        setChooseTitle={setChooseTitle}
                        noTextarea={item.type !== 'textarea'}
                        {...item}
                    />
                ))
            }
        </div>
    )
}

EditorMain.propTypes = {
    chooses: PropTypes.array,
    setOptionTitle: PropTypes.func,
    removeOption: PropTypes.func,
    setChooseTitle: PropTypes.func,
    addOption: PropTypes.func,
    removeChoose: PropTypes.func,
    reuseChoose: PropTypes.func,
    moveChoose: PropTypes.func
}

export default EditorMain