import React, { Component } from 'react'

// component
import EditorTitle from 'components/EditorTitle'
import EditorAdd from 'components/EditorAdd'
import EditorFooter from 'components/EditorFooter'

// scss
import './Editor.scss'

class Editor extends Component {
    constructor() {
        super()

        this.setTitle = this.setTitle.bind(this)
        this.title = ''
    }

    setTitle(title) {
        this.title = title
    }

    render() {
        return (
            <div className="editor">
                <EditorTitle
                    setTitle={this.setTitle}
                />
                <div className="editor__container" />
                <EditorAdd />
                <EditorFooter />
            </div>
        )
    }
}

export default Editor