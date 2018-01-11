import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PieChart, BarChart } from 'react-d3'
import shallowCompare from 'utils/shallowCompare'

// component
import Options from './Options'
import EditorTitle from 'components/EditorTitle'

class Choose extends Component {
    shouldComponentUpdate(nextProps) {
        return shallowCompare(nextProps, this.props)
    }

    render() {
        const {
            id,
            up,
            down,
            type,
            check,
            title,
            options,
            disabled,
            checkData,
            addOption,
            noTextarea,
            moveChoose,
            reuseChoose,
            getChartData,
            removeChoose,
            removeOption,
            setChooseTitle,
            setOptionTitle,
            setOptionChecked
        } = this.props

        return (
            <div className={'choose'}>
                <EditorTitle
                    message={title}
                    msg={`Q${id + 1}`}
                    className="choose__title"
                    setTitle={[setChooseTitle, id]}
                />
                {
                    options.map((o, i) => (
                        <Options
                            key={i}
                            message={o}
                            type={type}
                            optionId={i}
                            check={check}
                            chooseId={id}
                            disabled={disabled}
                            noTextarea={noTextarea}
                            removeOption={removeOption}
                            setOptionTitle={setOptionTitle}
                            setOptionChecked={setOptionChecked}
                        />
                    ))
                }
                {
                    !check &&
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
                }
                {
                    checkData && type === 'radio' &&
                    <PieChart
                        width={1000}
                        height={400}
                        radius={100}
                        innerRadius={20}
                        sectorBorderColor="white"
                        data={getChartData(id, type)}
                    />
                }
                {
                    checkData && type === 'checkbox' &&
                    <BarChart
                        width={1000}
                        height={400}
                        fill={'#3182bd'}
                        data={getChartData(id, type)}
                    />
                }
                {
                    checkData && type === 'textarea' && `有效回答人数: ${getChartData(id, type)}`
                }
            </div>
        )
    }
}

Choose.propTypes = {
    up: PropTypes.bool,
    down: PropTypes.bool,
    id: PropTypes.number,
    check: PropTypes.bool,
    type: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    addOption: PropTypes.func,
    checkData: PropTypes.bool,
    moveChoose: PropTypes.func,
    noTextarea: PropTypes.bool,
    reuseChoose: PropTypes.func,
    removeChoose: PropTypes.func,
    getChartData: PropTypes.func,
    removeOption: PropTypes.func,
    setChooseTitle: PropTypes.func,
    setOptionTitle: PropTypes.func,
    setOptionChecked: PropTypes.func,
}

export default Choose