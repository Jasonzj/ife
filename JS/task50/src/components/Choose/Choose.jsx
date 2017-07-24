import React from 'react'
import PropTypes from 'prop-types'
import { PieChart, BarChart } from 'react-d3'

// scss
import './Choose.scss'

// component
import Options from 'components/Options'
import EditorTitle from 'components/EditorTitle'

const Choose = ({
    setOptionChecked,
    setChooseTitle,
    setOptionTitle,
    removeOption,
    removeChoose,
    getChartData,
    reuseChoose,
    moveChoose,
    noTextarea,
    addOption,
    checkData,
    disabled,
    options,
    title,
    check,
    type,
    down,
    up,
    id
}) => (
    <div className={'choose'}>
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
                    check={check}
                    chooseId={id}
                    disabled={disabled}
                    setOptionTitle={setOptionTitle}
                    setOptionChecked={setOptionChecked}
                    removeOption={removeOption}
                    noTextarea={noTextarea}
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
                data={getChartData(id, type)}
                width={1000}
                height={400}
                radius={100}
                innerRadius={20}
                sectorBorderColor="white"
            />
        }
        {
            checkData && type === 'checkbox' &&
            <BarChart
                data={getChartData(id, type)}
                width={1000}
                height={400}
                fill={'#3182bd'}
            />
        }
    </div>
)

Choose.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    addOption: PropTypes.func,
    moveChoose: PropTypes.func,
    reuseChoose: PropTypes.func,
    removeChoose: PropTypes.func,
    removeOption: PropTypes.func,
    setOptionTitle: PropTypes.func,
    setChooseTitle: PropTypes.func,
    setOptionChecked: PropTypes.func,
    down: PropTypes.bool,
    up: PropTypes.bool,
    noTextarea: PropTypes.bool,
    check: PropTypes.bool,
    checkData: PropTypes.bool,
    getChartData: PropTypes.func
}

export default Choose