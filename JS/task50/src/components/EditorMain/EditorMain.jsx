import React from 'react'
import PropTypes from 'prop-types'

// component
import Choose from 'components/Choose'

const EditorMain = ({
    chooses,
    setOptionTitle,
    removeOption,
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
    addOption: PropTypes.func
}

export default EditorMain