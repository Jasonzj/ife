import React, { Component } from 'react'

// component
import EditorTitle from 'components/EditorTitle'

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
                {/* <div className="editor__add"></div>
                <div className="editor__footer"></div> */}
            </div>
        )
    }
}

export default Editor