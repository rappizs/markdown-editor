//base imports
import './App.css';
import { Component } from 'react';

//css imports
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/ssms.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/rubyblue.css';

//plugin imports
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

//other imports
import ReactMarkdown from 'react-markdown';
import Editor from './components/Editor';
import ThemeSelect from './components/ThemeSelect';

class App extends Component {

	state = {
		value: `# Markdown demo

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
`,

		remarkPlugins: [remarkToc, remarkGfm, remarkMath, remarkSlug],
		rehypePlugins: [rehypeKatex],
		components: {
			code({ node, inline, className, children, ...props }) {
				const match = /language-(\w+)/.exec(className || '')
				return !inline && match ? (
					<SyntaxHighlighter language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
				) : (
					<code className={className} {...props} />
				)
			}
		},
		theme: "monokai"
	}

	componentDidMount() {
		const theme = window.localStorage.getItem("theme");
		this.setState({ theme })
	}

	handleChange(newValue) {
		this.setState({ value: newValue });
	}

	save() {
		const html = document.getElementById('result').innerHTML;
		const { value } = this.state;

		console.log(html, value);
	}

	changeTheme(theme) {
		window.localStorage.setItem("theme", theme);
		this.setState({ theme })
	}

	render() {
		const { value, components, remarkPlugins, rehypePlugins, theme } = this.state;

		return <>
			<div className="header">
				<button onClick={() => this.save()} className="btn btn-primary">Save</button>
				<ThemeSelect value={theme} changeTheme={theme => this.changeTheme(theme)} />
			</div>
			<div className="editor">
				<Editor theme={theme} value={value} onChange={newValue => this.handleChange(newValue)} />
			</div>
			<div id="result" className="result">
				<ReactMarkdown
					className="markdown-body"
					components={components}
					remarkPlugins={remarkPlugins}
					rehypePlugins={rehypePlugins}
					children={value}
				/>
			</div>
		</>
	}
}

export default App;
