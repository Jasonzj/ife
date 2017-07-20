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

        this.state = {
            showAddBox: false,
            title: ''
        }
    }

    setTitle = (title) => {
        this.setState({ title })
    }

    toggleAddBoxHandle = () => {
        this.setState({ showAddBox: !this.state.showAddBox })
    }

    render() {
        return (
            <div className="editor">
                <EditorTitle
                    setTitle={this.setTitle}
                />
                <EditorMain />
                <EditorAdd
                    showAddBox={this.state.showAddBox}
                    toggleAddBoxHandle={this.toggleAddBoxHandle}
                />
                <EditorFooter />
            </div>
        )
    }
}

export default Editor