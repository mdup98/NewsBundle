let obj = {
	articles: [],
};
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

//Date section
const dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
const newdate = day + "." + month + "." + year;

//* NEWS SITES *//

//DODELAT IDNES - podelane kodovani
function getiDnesCZ() {
	request("https://idnes.cz/", (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			let source = "idnes.cz";
			let language = "CZ";
			$('a[score-type="Article"]').each((i, el) => {
				const idArticle = source + i;
				if (i < 5) {
					const link = $(el).attr("href");
					let nazev = $(el).children("h3").text();
					let clanok = {
						idArticle: idArticle,
						source: source,
						language: language,
						name: nazev,
						link: link,
						date: newdate,
					};
					obj.articles.push(clanok);
					// CSV  writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
				}
			});
		}
	});
}

/* //***--
---------------------------------------------------------------------------------------------------------------------------------
**/
//So far quite random, @@todo
const getNovinky = async () => {
	try {
		console.log("Novinky cz");
		await request("https://novinky.cz/", (error, response, html) => {
			if (!error && response.statusCode == 200) {
				//if website responded
				const $ = cheerio.load(html); // load dom to $
				let source = "novinky.cz";
				let language = "CZ";
				$("a[data-dot-text]").each((i, el) => {
					// for every a with class
					if (i < 20) {
						const idArticle = source + i;
						const link = $(el).attr("href");
						const nazev = $(el).attr("data-dot-text");
						let clanok = {
							idArticle: idArticle,
							source: source,
							language: language,
							name: nazev,
							link: link,
							date: newdate,
						};
						obj.articles.push(clanok);
					}
					// CSV writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
				});
			}
		});
	} catch (e) {
		console.log("error", e);
	}
};

const getAktualne = async () => {
	try {
		console.log("Aktualne articles");
		await request("https://aktualne.cz/", (error, response, html) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);
				let source = "aktualne.cz";
				let language = "CZ";
				//Top 3 clanky modra zona
				$('div[class="topicoftheday__box"]').each((i, el) => {
					const idArticle = source + "topicOfTheDay" + i;
					const link = $(el).children("a").eq(0).attr("href");
					let nazev = $(el).children("a").eq(0).text().trim();
					let clanok = {
						idArticle: idArticle,
						source: source,
						language: language,
						name: nazev,
						link: link,
						date: newdate,
					};
					obj.articles.push(clanok);
					// CSV writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
				});
				// Dalsi 3 clanky
				$('div[class="triple-box"]').each((i, el) => {
					const idArticle = source + "tripleBox" + i;
					const link = $(el).children("a").eq(0).attr("href");
					let nazev = $(el)
						.children("a")
						.children('div[class="triple-box__title"]')
						.text()
						.trim();
					let clanok = {
						idArticle: idArticle,
						source: source,
						language: language,
						name: nazev,
						link: link,
						date: newdate,
					};
					obj.articles.push(clanok);
					// CSV writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
				});
			}
		});
	} catch (e) {
		console.log("error", e);
	}
};

const getSeznamZpravy = async () => {
	try {
		console.log("Seznamzpravy articles");
		await request("https://www.seznamzpravy.cz/", (error, response, html) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);
				let source = "seznamzpravy.cz";
				let language = "CZ";
				$('a[data-dot="mol-article-card-title"]').each((i, el) => {
					const idArticle = source + i;
					if (i < 10) {
						const link = $(el).attr("href");
						let nazev = $(el).children("h3").text();
						let clanok = {
							idArticle: idArticle,
							source: source,
							language: language,
							name: nazev,
							link: link,
							date: newdate,
						};
						obj.articles.push(clanok);
						// CSV  writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
					}
				});
			}
		});
	} catch (e) {
		console.log("error", e);
	}
};
//Top articles in 24 hours
const getSme = async () => {
	try {
		console.log("SMEarticles");
		await request("https://www.sme.sk/", (error, response, html) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);
				let source = "sme.sk";
				let language = "SK";
				$('a[data-deep-tags^="24-hour"]').each((i, el) => {
					const idArticle = source + i;
					if (i < 10) {
						const link = $(el).attr("href");
						let nazev = $(el).children('span[class="tab-item-link"]').text();
						let clanok = {
							idArticle: idArticle,
							source: source,
							language: language,
							name: nazev,
							link: link,
							date: newdate,
						};
						obj.articles.push(clanok);
						// CSV  writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
					}
				});
			}
			console.log("request ending");
		});
	} catch (e) {
		console.log("error", e);
	}
};
// KOSICEDNES right panel
const getKosiceDnes = async () => {
	try {
		console.log("Kosicednes articles starting");
		await request("https://kosicednes.sk/", (error, response, html) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);
				let source = "kosicednes.sk";
				let language = "SK";
				$('div[class="top-clanky-cont__slider"] > a').each((i, el) => {
					const idArticle = source + i;
					let link = $(el).attr("href");
					let nazev = $(el)
						.children()
						.children()
						.children()
						.text()
						.replace(/,/g, "-");
					//CSV writeStream.write(`${language}, ${source}, ${nazev}, ${link}, ${newdate} \n`)
					let clanok = {
						idArticle: idArticle,
						source: source,
						language: language,
						name: nazev,
						link: link,
						date: newdate,
					};
					obj.articles.push(clanok);
				});
			}
		});
	} catch (e) {
		console.log("error", e);
	}
};
// JSON saving
const storeData = async () => {
	console.log("storedata starting");
	await getAktualne();
	await getSeznamZpravy();
	await getNovinky();
	await getSme();
	await getKosiceDnes();
	let jsondata = JSON.stringify(obj, null, 2);
	fs.writeFile("articles.json", jsondata, "utf8", (err) => {
		if (err) throw err;
		console.log("The file has been saved!");
	});
};
storeData();
