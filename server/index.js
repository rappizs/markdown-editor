require("@babel/register")({
	presets: ["@babel/preset-env", "@babel/preset-react"],
	"plugins": [
		[
			"transform-assets",
			{
				"extensions": [
					"css",
					"svg"
				],
				"name": "static/media/[name].[hash:8].[ext]"
			}
		]
	]
});
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const express = require("express");
const path = require("path");
const Interpreter = require("../src/components/Interpreter").default;
const cors = require('cors')

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors())

app.post("/*", (req, res, next) => {
	if (req.url !== '/') {
		return next();
	}
	return res.send(
		ReactDOMServer.renderToString(Interpreter({ value: req.body.value }))
	);
});


app.listen(3006, () =>
	console.log("Express server is running on localhost:3006")
);