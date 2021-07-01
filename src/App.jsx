//base imports
import './App.css';
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

//css imports
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/ssms.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/rubyblue.css';

//other imports
import Editor from './components/Editor';
import ThemeSelect from './components/ThemeSelect';
import defaults from './defaults';

export default function App() {

	const [editorValue, setEditorValue] = useState("");
	const [theme, setTheme] = useState(defaults.theme);
	const [pendingFetchController, setPendingFetchController] = useState(null);
	const pendingFetchControllerRef = useRef();
	pendingFetchControllerRef.current = pendingFetchController;

	useEffect(() => {
		const themeFromStorage = window.localStorage.getItem("theme");
		const initValue =
			`# Markdown demo

## Table of contents

## Syntax highlighting

### JavaScript

\`\`\`js
import Codemirror from "@uiw/react-codemirror";
import { Component } from "react";

class Editor extends Component {

	handleChange(editor, change) {
		const { value, onChange } = this.props
		const newValue = editor.getValue();
		if (newValue !== value)
			onChange(newValue);
	}
\`\`\`

### Scala

\`\`\`scala
override def create(
	in: proto.CreateRequest): Future[proto.Response] = {
	val aggregateRootId = UUID.randomUUID()
	val entityRef =
	sharding.entityRefFor(e.EntityKey, aggregateRootId.toString)
	val reply: Future[e.Summary] =
	entityRef.askWithStatus(
		e.Create(in.name, in.value, in.quantity, _))
	val response =
	reply.map(entity => proto.Response(Some(toProto(entity))))
	convertError(response)
}
\`\`\`

### PHP

\`\`\`php
<?php
require __DIR__ . "/../models/hu_num.php";
require __DIR__ . "/../models/not_booked_record.php";
require __DIR__ . "/../models/user.php";
require __DIR__ . "/../models/station.php";

class Repository
{
	private  $pgDBconn;
	private  $mysqlDBconn;

	public function __construct($pgDBconn, $mysqlDBconn = null)
	{
		$this->pgDBconn = $pgDBconn;
		$this->mysqlDBconn = $mysqlDBconn;
		mysqli_set_charset($mysqlDBconn, "utf8mb4");
	}
\`\`\`

## Math with TeX

$$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi$$

## HTML in Markdown

<p>
	<span class="tg_task tg_taskctrl tg_neutral" id="task1">
		<span class="tg_cnt">#2</span>
		<span>✓</span>
		<span>?</span>
	</span> 
	Hello World, I'm in a HTML paragraph!
</p>`;

		if (themeFromStorage)
			setTheme(themeFromStorage);

		setEditorValue(initValue);
	}, [])

	const handleChange = (newValue) => {
		const controller = new AbortController();
		const signal = controller.signal;

		if (pendingFetchControllerRef.current)
			pendingFetchControllerRef.current.abort();

		if (newValue) {
			setPendingFetchController(controller);
			fetch("http://127.0.0.1:3006", {
				signal,
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ value: newValue })
			}).then(res => res.text())
				.then(data => document.getElementById("result").innerHTML = data)
				.catch(err => err);
			setEditorValue(newValue);
		}
		else
			document.getElementById("result").innerHTML = null
	}

	const save = () => {
		const html = document.getElementById('result').innerHTML;
		console.log(html, editorValue);
	}

	const changeTheme = (newTheme) => {
		window.localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	}

	return <>
		<div className="header">
			<button onClick={() => save()} className="btn btn-primary">Save</button>
			<ThemeSelect value={theme} changeTheme={newTheme => changeTheme(newTheme)} />
		</div>
		<div className="editor" contentEditable="true" spellCheck="true">
			<Editor theme={theme} value={editorValue} onChange={newValue => handleChange(newValue)} />
		</div>
		<div id="result" className="result">
		</div>
	</>
}
