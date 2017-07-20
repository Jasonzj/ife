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

    setTitle = (title) => {
        this.setState({ title })
    }

    toggleAddBoxHandle = () => {
        const showAddBox = !this.state.showAddBox
        this.setState({ showAddBox })
    }

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

    setOption = (chooseId, optionId, text) => {
        const arr = [...this.state.chooses]
        arr[chooseId].options[optionId] = text
        this.setState({ chooses: arr })
    }

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