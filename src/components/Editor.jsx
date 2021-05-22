import React from 'react';
import { Component } from "react";

let CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
	CodeMirror = require('@uiw/react-codemirror');
}

class Editor extends Component {

	handleChange(editor, change) {
		const { value, onChange } = this.props
		const newValue = editor.getValue();
		if (newValue !== value)
			onChange(newValue);
	}

	render() {
		const { value, theme } = this.props;

		return <> { CodeMirror && <CodeMirror
			value={value}
			onChange={(editor, change) => this.handleChange(editor, change)}
			options={{
				theme: theme,
				mode: "markdown",
			}}
		/>}</>
	}
}

export default Editor;