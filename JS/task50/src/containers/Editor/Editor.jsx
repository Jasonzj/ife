import React, { Component } from 'react'

// component
import EditorTitle from 'components/EditorTitle'
import EditorAdd from 'components/EditorAdd'
import EditorFooter from 'components/EditorFooter'
import EditorMain from 'components/EditorMain'

// scss
import './Editor.scss'

class Editor extends Component {
    constructor() {
        super()

        const date = new Date()
        this.chooseId = 0
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
            ]
        }

        if (choose === 'textarea') {
            data.options = ['']
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

    // 添加Option
    addOption = (chooseId) => {
        const arr = this.getNewChooses()
        const options = arr[chooseId].options
        if (options.length > 9) {
            alert('最多10项，不能再添加了')
            return
        }

        options.push(`选项${options.length + 1}`)
        this.setState(() => ({ chooses: arr }))
    }

    // 删除Option
    removeOption = (chooseId, optionId) => {
        const arr = this.getNewChooses()
        arr[chooseId].options.splice(optionId, 1)
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

    setEndTime = (endTime) => {
        this.setState(() => ({ endTime }))
    }

    render() {
        return (
            <div className="editor">
                <EditorTitle
                    className="editor__head"
                    setTitle={[this.setTitle]}
                    message={this.state.title}
                />
                <EditorMain
                    test={this.state}
                    chooses={this.state.chooses}
                    checkBoxs={this.state.checkBoxs}
                    setOptionTitle={this.setOptionTitle}
                    removeOption={this.removeOption}
                    setChooseTitle={this.setChooseTitle}
                    addOption={this.addOption}
                    removeChoose={this.removeChoose}
                    reuseChoose={this.reuseChoose}
                    moveChoose={this.moveChoose}
                />
                <EditorAdd
                    showAddBox={this.state.showAddBox}
                    toggleAddBoxHandle={() => this.toggleBool('showAddBox')}
                    addRadio={() => this.addChoose('radio')}
                    addCheckBox={() => this.addChoose('checkbox')}
                    addTextarea={() => this.addChoose('textarea')}
                />
                <EditorFooter
                    setEndTime={this.setEndTime}
                    showCalendar={this.state.showCalendar}
                    toggleCalendarHandle={() => this.toggleBool('showCalendar')}
                    endTime={this.state.endTime}
                />
            </div>
        )
    }
}

export default Editor