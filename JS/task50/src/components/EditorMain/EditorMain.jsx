import React from 'react'
import PropTypes from 'prop-types'

// component
import Choose from 'components/Choose'

const EditorMain = ({
    chooses,
    setOption,
    removeOption
}) => {
    console.log(chooses)
    return (
        <div className="editor__main">
            {
                chooses.map(item => (
                    <Choose
                        key={item.id}
                        disabled={1}
                        setOption={setOption}
                        removeOption={removeOption}
                        {...item}
                    />
                ))
            }
        </div>
    )
}

EditorMain.propTypes = {
    chooses: PropTypes.array,
    setOption: PropTypes.func,
    removeOption: PropTypes.func
}

export default EditorMain