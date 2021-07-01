import ReactMarkdown from 'react-markdown';
import React from 'react';

import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function Interpreter(props) {

	const remarkPlugins = [remarkToc, remarkGfm, remarkMath, remarkSlug];
	const rehypePlugins = [rehypeKatex, rehypeRaw];
	const components = {
		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '')
			return !inline && match ? (
				<SyntaxHighlighter language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
			) : (
				<code className={className} {...props} />
			)
		}
	};

	const { value } = props;

	return <ReactMarkdown
		className="markdown-body"
		components={components}
		remarkPlugins={remarkPlugins}
		rehypePlugins={rehypePlugins}
		children={value}
	/>

}