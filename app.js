const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const fs = require("fs");
const { request } = require("http");

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

//HomePage
app.get("/", (req, res) => {
	res.sendFile("/index.html", { root: __dirname });
});

//List all articles from articles.json
app.get("/articles", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	fs.readFile("articles.json", "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		res.send(JSON.parse(data).articles);
	});
});

//Manually rescrape the articles
app.get("/articles/update", (req, res) => {
	updateArticles();
	res.end();
});

//Get articles by language
app.get("/articles/language/:lang", (req, res) => {
	let lang = req.params.lang;
	fs.readFile("articles.json", "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		let articleList = JSON.parse(data).articles;
		cutArticleList(articleList);
	});

	//iterate through articles and keep just those with right lang
	function cutArticleList(data) {
		data = data.filter((entry) => {
			return entry.language === lang.toUpperCase();
		});
		res.send(data);
	}
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
