const axios = require('axios');
// URL for the movie information
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

axios
    // GET request
    .get(url)
    // Handle the response
    .then((result) => {
        // Check the status code
        // If it is not 200, throw an error
        if (result.status !== 200) {
            throw new Error("Invalid response from server");
        }

        // Check the data
        // If the result.data is valid, return it
        if(result.data) {
            return result.data;
        }

        // If the data is not valid, throw an error
        throw new Error("Invalid data from server");
    })
    // Handle the data
    .then((data) => {
        // If the data is not valid or size is zero, throw an error
        if(!data.articleList || data.articleList.size === 0) {
            throw new Error("Invalid data format");
        }
        // Return the articleList
        return data.articleList;
    })
    // Handle the articles
    .then((articles) => {
        // Each article is divided into two parts(title and rank)
        return articles.map((article, idx) => {
            return {
                title: article.title,
                rank: idx + 1
            };
        });
    })
    .then((results) => {
        // Display the movie information
        for (let movieinfo of results) {
            console.log(`Rank: ${movieinfo.rank}, Title: ${movieinfo.title}`);
        }
    })
    // Handle the error
    .catch((err) => {
        console.error("<<Error>>");
        console.error(err);
    });
