import React from 'react'
import PropTypes from 'prop-types'

// component
import Choose from './Choose'

const EditorMain = ({
    check,
    chooses,
    disabled,
    checkData,
    addOption,
    moveChoose,
    reuseChoose,
    removeChoose,
    removeOption,
    getChartData,
    setOptionTitle,
    setChooseTitle,
    setOptionChecked
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
                    checkData={checkData}
                    addOption={addOption}
                    moveChoose={moveChoose}
                    reuseChoose={reuseChoose}
                    removeOption={removeOption}
                    removeChoose={removeChoose}
                    getChartData={getChartData}
                    setOptionTitle={setOptionTitle}
                    setChooseTitle={setChooseTitle}
                    setOptionChecked={setOptionChecked}
                    {...item}
                />
            ))
        }
    </div>
)


EditorMain.propTypes = {
    check: PropTypes.bool,
    disabled: PropTypes.bool,
    checkData: PropTypes.bool,
    chooses: PropTypes.array,
    addOption: PropTypes.func,
    moveChoose: PropTypes.func,
    reuseChoose: PropTypes.func,
    removeChoose: PropTypes.func,
    removeOption: PropTypes.func,
    setOptionTitle: PropTypes.func,
    setChooseTitle: PropTypes.func,
    setOptionChecked: PropTypes.func,
    getChartData: PropTypes.func
}

export default EditorMain