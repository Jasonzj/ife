import React from 'react'
import PropTypes from 'prop-types'

// component
import Choose from 'components/Choose'

const EditorMain = ({
    chooses,
    setOptionTitle,
    removeOption,
    removeChoose,
    setChooseTitle,
    addOption
}) => {
    console.log(chooses)
    return (
        <div className="editor__main">
            {
                chooses.map(item => (
                    <Choose
                        key={item.id}
                        disabled={1}
                        setOptionTitle={setOptionTitle}
                        removeOption={removeOption}
                        removeChoose={removeChoose}
                        setChooseTitle={setChooseTitle}
                        addOption={addOption}
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
    removeChoose: PropTypes.func
}

export default EditorMain