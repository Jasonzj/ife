import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// component
import EditorTitle from 'components/EditorTitle'
import EditorAdd from 'components/EditorAdd'
import EditorFooter from 'components/EditorFooter'
import EditorMain from 'components/EditorMain'
import Dialog from 'components/Dialog'
import Button from 'components/Button'

// action
import { AaddQuestion, AsetDialog, AsetQuestion, AaddOptionChecked } from 'action/questionnaires'

// scss
import './Editor.scss'

@connect(
    state => ({
        lists: state.lists,
        dialog: state.dialog.bool,
        diglogFunc: state.dialog.func,
        dialogMsg: state.dialog.message
    })
)
class Editor extends Component {
    constructor() {
        super()

        const date = new Date()
        this.chooseId = 0
        this.disabled = true
        this.check = false
        this.data = false
        this.defaultTitles = {
            radio: '单选题',
            checkbox: '复选题',
            textarea: '文本题'
        }
        this.state = {
            showCalendar: false,
            showAddBox: false,
            title: '请输入问卷标题',
            chooses: [],
            endTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
    }

    componentWillMount() {
        const { match, lists } = this.props
        const id = match.params.id
        const path = match.path
        const editorPath = path.includes('/editor')
        const checkPath = path.includes('/check')
        const dataPath = path.includes('/data')

        if (id && editorPath || checkPath || dataPath) {
            const { chooses, title, endTime } = lists[id]

            this.setState({ chooses, title, endTime })

            this.addQuestion = (state) => {
                const { dispatch, history } = this.props
                const { title, chooses, endTime } = this.state
                dispatch(AsetQuestion(title, chooses, endTime, state, id))
                history.push('/')
            }
        }

        if (id && checkPath) {
            this.disabled = false
            this.check = true
        }

        if (id && dataPath) {
            this.check = true
            this.data = true
        }
    }

    // 获取深拷贝的引用值
    getNewReference(ref) {
        return JSON.parse(JSON.stringify(ref))
    }

    // 获取深拷贝的chooses
    getNewChooses() {
        return this.getNewReference(this.state.chooses)
    }

    // 截取数组指定值前后
    getSliceArr(arr, chooseId, num, num2) {
        const before = arr.slice(0, chooseId)
        const after = arr.slice(chooseId + num).map(t => ({
            ...t,
            id: t.id + num2
        }))

        return {
            before,
            after
        }
    }

    // 设置标题
    setTitle = (title) => {
        this.setState({ title })
    }

    // 设置choose标题
    setChooseTitle = (chooseId, title) => {
        const arr = this.getNewChooses()
        arr[chooseId].title = title
        this.setState(() => ({ chooses: arr }))
    }

    // 切换添加按钮显示状态
    toggleBool = (name) => {
        const bool = !this.state[name]
        this.setState({ [name]: bool })
    }

    // 添加choose
    addChoose = (choose) => {
        const arr = this.getNewChooses()

        if (arr.length >= 10) {
            alert('不能大于10个问题')
            return
        }

        const data = {
            id: this.chooseId++,
            type: choose,
            title: `${this.defaultTitles[choose]}`,
            options: [
                '选项1',
                '选项2',
                '选项3'
            ],
            checkeds: [],
            cacheChecked: [false, false, false]
        }

        if (choose === 'textarea') {
            data.options = ['']
            data.cacheChecked = false
        }

        arr.push(data)

        this.setState(() => ({ chooses: arr }))
    }

    // 复用choose
    reuseChoose = (chooseId) => {
        const arr = this.getNewChooses()

        if (arr.length >= 10) {
            alert('不能大于10个问题')
            return
        }

        const cur = this.getNewReference(arr[chooseId])
        const result = this.getSliceArr(arr, chooseId, 0, 1)
        this.setState({ chooses: [...result.before, cur, ...result.after] })
    }

    // 删除choose
    removeChoose = (chooseId) => {
        const arr = this.getNewChooses()
        const result = this.getSliceArr(arr, chooseId, 1, -1)
        this.setState({ chooses: [...result.before, ...result.after] })
    }

    // 设置Option标题
    setOptionTitle = (chooseId, optionId, text) => {
        const arr = this.getNewChooses()
        arr[chooseId].options[optionId] = text
        this.setState(() => ({ chooses: arr }))
    }

    // 设置Option选择
    setOptionChecked = (chooseId, optionId, bool) => {
        const arr = this.getNewChooses()
        arr[chooseId].cacheChecked[optionId] = bool
        this.setState(() => ({ chooses: arr }))
    }

    // 添加Option
    addOption = (chooseId) => {
        const arr = this.getNewChooses()
        const options = arr[chooseId].options
        const cacheChecked = arr[chooseId].cacheChecked

        if (options.length > 9) {
            alert('最多10项，不能再添加了')
            return
        }

        cacheChecked.push(false)
        options.push(`选项${options.length + 1}`)
        this.setState(() => ({ chooses: arr }))
    }

    // 删除Option
    removeOption = (chooseId, optionId) => {
        const arr = this.getNewChooses()
        arr[chooseId].options.splice(optionId, 1)
        arr[chooseId].cacheChecked.splice(optionId, 1)
        this.setState(() => ({ chooses: arr }))
    }

    // choose上移
    moveChoose = (chooseId, move) => {
        const arr = this.getNewChooses()
        let diff = 0

        if (move === 'up') diff = 1
        if (move === 'down') diff = -1

        const cur = {
            ...arr[chooseId],
            id: arr[chooseId].id - diff
        }
        const next = {
            ...arr[chooseId - diff],
            id: arr[chooseId - diff].id + diff
        }
        arr[chooseId] = next
        arr[chooseId - diff] = cur
        this.setState(() => ({ chooses: arr }))
    }

    // 设置问卷截止时间
    setEndTime = (endTime) => {
        this.setState(() => ({ endTime }))
    }

    // 添加问卷事件
    addQuestion = (state) => {
        const { dispatch, history } = this.props
        const { title, chooses, endTime } = this.state
        dispatch(AaddQuestion(title, chooses, endTime, state))
        history.push('/')
    }

    // 设置浮框
    setDialog = (bool, id, title) => {
        const { dispatch } = this.props

        if (!this.state.chooses.length) {
            alert('请至少添加一个问题在保存或发布')
            return
        }

        dispatch(AsetDialog(bool, id, title))
    }

    // 提交问卷事件
    addOptionChecked = () => {
        const { dispatch, match, lists } = this.props
        const { chooses } = this.state
        const id = match.params.id
        const state = lists[id].state

        if (state !== 1) {
            alert('当前状态不能提交问卷，只有发布中才能提交问卷')
            return
        }

        dispatch(AaddOptionChecked(id, chooses))
    }

    // 获取图表数据
    getChartData = (chooseId, type) => {
        const arr = this.getNewChooses()
        const radioData = []
        const checkBoxData = [{
            name: 'jason',
            values: []
        }]
        const choose = arr[chooseId]

        choose.options.forEach((label, i) => {
            let count = 0

            choose.checkeds.forEach((checked) => {
                if (checked[i] === true) {
                    count++
                }
            })

            const value = (count / choose.checkeds.length) * 100

            if (value === 0) {
                return
            }

            checkBoxData[0].values.push({
                x: label,
                y: count
            })

            radioData.push({
                label,
                value
            })
        })


        switch (type) {
            case 'radio':
                return radioData
            
            case 'checkbox':
                return checkBoxData
        }
    }

    render() {
        const { dialog, diglogFunc, dialogMsg } = this.props

        return (
            <div className="editor">
                <EditorTitle
                    className="editor__head"
                    setTitle={[this.setTitle]}
                    message={this.state.title}
                    disabled={!!this.check}
                />
                <EditorMain
                    test={this.state}
                    chooses={this.state.chooses}
                    checkBoxs={this.state.checkBoxs}
                    setOptionTitle={this.setOptionTitle}
                    setOptionChecked={this.setOptionChecked}
                    removeOption={this.removeOption}
                    setChooseTitle={this.setChooseTitle}
                    addOption={this.addOption}
                    removeChoose={this.removeChoose}
                    reuseChoose={this.reuseChoose}
                    moveChoose={this.moveChoose}
                    disabled={this.disabled}
                    check={this.check}
                    checkData={this.data}
                    getChartData={this.getChartData}
                />
                {
                    !this.check &&
                    <EditorAdd
                        showAddBox={this.state.showAddBox}
                        toggleAddBoxHandle={() => this.toggleBool('showAddBox')}
                        addRadio={() => this.addChoose('radio')}
                        addCheckBox={() => this.addChoose('checkbox')}
                        addTextarea={() => this.addChoose('textarea')}
                    />
                }
                {
                    !this.check &&
                    <EditorFooter
                        setEndTime={this.setEndTime}
                        showCalendar={this.state.showCalendar}
                        toggleCalendarHandle={() => this.toggleBool('showCalendar')}
                        endTime={this.state.endTime}
                        saveQuestion={() => this.addQuestion(0)}
                        releaseQuestion={() => this.addQuestion(1)}
                        setDialog={this.setDialog}
                    />
                }
                {
                    dialog &&
                    <Dialog
                        message={dialogMsg}
                        onClick={diglogFunc}
                        close={() => this.setDialog(false, null)}
                    />
                }{
                    this.check && !this.data &&
                    <div className="editor__btn">
                        <Link to="/">
                            <Button
                                className={2}
                                onClick={this.addOptionChecked}
                            >
                            提交
                            </Button>
                        </Link>
                    </div>
                }
            </div>
        )
    }
}

Editor.propTypes = {
    dispatch: PropTypes.func,
    dialog: PropTypes.bool,
    diglogFunc: PropTypes.func,
    dialogMsg: PropTypes.string,
    match: PropTypes.any,
    lists: PropTypes.array,
    history: PropTypes.any
}

export default Editor