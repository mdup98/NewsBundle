const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT || 5501;

//Call scrape.js every 4 hours
function updateArticles() {
	let child = require("child_process").fork("scrape.js");
}
setInterval(() => updateArticles(), 14400000);
//-------------------------------
const app = express();
app.use(cors());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
	res.sendFile("/index.html", { root: __dirname });
});

app.get("/articles", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	fs.readFile("articles.json", "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		res.send(JSON.parse(data));
	});
});

app.get("/articles/update", (req, res) => {
	//calling scrape.js - updateing articles.json
	updateArticles();
	res.end();
});

app.get("/articles/language/:param1", function (req, res) {
	0;
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
