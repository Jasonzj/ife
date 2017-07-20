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

        this.chooseId = 0
        this.defaultTitles = {
            radio: '单选题',
            checkbox: '复选题',
            textarea: '文本题'
        }
        this.state = {
            showAddBox: false,
            title: '请输入问卷标题',
            chooses: []
        }
    }

    // 设置标题
    setTitle = (title) => {
        this.setState({ title })
    }

    // 设置choose标题
    setChooseTitle = (chooseId, title) => {
        const arr = [...this.state.chooses]
        arr[chooseId].title = title
        this.setState({ chooses: arr })
    }

    // 切换添加按钮显示状态
    toggleAddBoxHandle = () => {
        const showAddBox = !this.state.showAddBox
        this.setState({ showAddBox })
    }

    // 添加choose
    addChoose = (choose) => {
        const arr = [...this.state.chooses]
        arr.push({
            id: this.chooseId++,
            type: choose,
            title: `Q${this.chooseId} ${this.defaultTitles[choose]}`,
            options: [
                '选项1',
                '选项2',
                '选项3'
            ]
        })
        this.setState({ chooses: arr })
    }

    removeChoose = (chooseId) => {
        const arr = [...this.state.chooses]
        arr.splice(chooseId, 1)
        this.setState({ chooses: arr })
    }

    // 设置Option标题
    setOptionTitle = (chooseId, optionId, text) => {
        const arr = [...this.state.chooses]
        arr[chooseId].options[optionId] = text
        this.setState({ chooses: arr })
    }

    addOption = (chooseId) => {
        const arr = [...this.state.chooses]
        const options = arr[chooseId].options
        if (options.length > 9) {
            alert('最多10项，不能再添加了')
            return
        }

        options.push(`选项${options.length + 1}`)
        this.setState({ chooses: arr })
    }

    // 删除Option
    removeOption = (chooseId, optionId) => {
        const arr = [...this.state.chooses]
        arr[chooseId].options.splice(optionId, 1)
        this.setState({ chooses: arr })
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
                />
                <EditorAdd
                    showAddBox={this.state.showAddBox}
                    toggleAddBoxHandle={this.toggleAddBoxHandle}
                    addRadio={() => this.addChoose('radio')}
                    addCheckBox={() => this.addChoose('checkbox')}
                    addTextarea={() => this.addChoose('textarea')}
                />
                <EditorFooter />
            </div>
        )
    }
}

export default Editor