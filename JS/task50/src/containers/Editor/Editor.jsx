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
            title: '',
            chooses: [],
            data: []
        }
    }

    // 设置标题
    setTitle = (title) => {
        this.setState({ title })
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
            title: this.defaultTitles[choose],
            options: [
                '选项1',
                '选项2',
                '选项3'
            ]
        })
        this.setState({ chooses: arr })
    }

    // 设置Option
    setOption = (chooseId, optionId, text) => {
        const arr = [...this.state.chooses]
        arr[chooseId].options[optionId] = text
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
                    setTitle={this.setTitle}
                />
                <EditorMain
                    chooses={this.state.chooses}
                    checkBoxs={this.state.checkBoxs}
                    setOption={this.setOption}
                    removeOption={this.removeOption}
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