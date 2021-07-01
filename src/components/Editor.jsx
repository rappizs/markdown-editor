import Codemirror from "@uiw/react-codemirror";
import 'codemirror/keymap/sublime';
import { useEffect } from "react";

export default function Editor({ value, theme, onChange }) {

	const handleChange = (editor) => {
		const newValue = editor.getValue();
		onChange(newValue);
	}

	return <Codemirror
		value={value}
		onChange={editor => handleChange(editor)}
		options={{
			theme: theme,
			keyMap: "sublime",
			mode: "markdown",
		}}
	/>

}