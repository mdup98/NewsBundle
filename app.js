const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const port = process.env.PORT || 3000;

const app = express();
app.get("/", (req, res) => {
	res.sendFile("/index.html", { root: __dirname });
});

app.get("/articles", (req, res) => {
	fs.readFile("articles.json", "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		res.send(JSON.parse(data));
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
