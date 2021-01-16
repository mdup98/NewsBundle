//target request for json
let targetUrl = "http://localhost:5501/articles.json";
$(document).ready(function () {
	//get new list from server and call new articles
	function updateArticles() {
		//Fetch json with articles /articles
		let promiseGetArticleLists = new Promise((resolve, reject) => {
			try {
				fetch(targetUrl)
					.then((response) => response.json())
					.then((json) => {
						console.log("Promise2");
						let currentArticles = json;
						resolve(currentArticles);
					});
			} catch {
				reject(console.log("Json was not loaded"));
			}
		});

		function createList() {
			promiseGetArticleLists.then(function fillTable(data) {
				let articleList = data.articles;
				for (let i = 0; i < articleList.length; i++) {
					$(".table-locator > tbody").append(
						`<tr>
					<th scope="row">${i + 1}</th>
					<td>${articleList[i].source}</td>
					<td>${articleList[i].language}</td>
					<td>${articleList[i].name}</td>
					<td><a href="${
						articleList[i].link
					}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
						<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
						</svg></a></td>
					</tr>`
					);
				}
			});
		}

		//clear the table and fill it again
		$(".table-locator > tbody").empty();
		setTimeout(function () {
			createList();
		}, 1000);
	}
	$("#updateButton").click(updateArticles);
});
