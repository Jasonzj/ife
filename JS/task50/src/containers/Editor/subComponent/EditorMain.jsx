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
                    up={item.id !== 0}
                    disabled={disabled}
                    addOption={addOption}
                    checkData={checkData}
                    moveChoose={moveChoose}
                    reuseChoose={reuseChoose}
                    removeOption={removeOption}
                    removeChoose={removeChoose}
                    getChartData={getChartData}
                    setOptionTitle={setOptionTitle}
                    setChooseTitle={setChooseTitle}
                    setOptionChecked={setOptionChecked}
                    noTextarea={item.type !== 'textarea'}
                    down={item.id !== (chooses.length - 1)}
                    {...item}
                />
            ))
        }
    </div>
)


EditorMain.propTypes = {
    check: PropTypes.bool,
    chooses: PropTypes.array,
    disabled: PropTypes.bool,
    checkData: PropTypes.bool,
    addOption: PropTypes.func,
    moveChoose: PropTypes.func,
    reuseChoose: PropTypes.func,
    removeChoose: PropTypes.func,
    removeOption: PropTypes.func,
    getChartData: PropTypes.func,
    setOptionTitle: PropTypes.func,
    setChooseTitle: PropTypes.func,
    setOptionChecked: PropTypes.func,
}

export default EditorMain