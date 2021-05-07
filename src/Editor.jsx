import Codemirror from "@uiw/react-codemirror";
import { Component } from "react";
import 'codemirror/keymap/sublime';

class Editor extends Component {

	handleChange(editor, change) {
		const { value, onChange } = this.props
		const newValue = editor.getValue();
		if (newValue !== value)
			onChange(newValue);
	}

	render() {
		const { value, theme } = this.props;

		return <Codemirror
			value={value}
			onChange={(editor, change) => this.handleChange(editor, change)}
			options={{
				theme: theme,
				keyMap: "sublime",
				mode: "markdown",
			}}
		/>
	}
}

export default Editor;