const axios = require('axios');

// Get the top 20 movies
// Using async/await
async function getTop20Movies() {
    // URL for the movie information
    const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

    try {
        // Wait for the result
        const result = await axios.get(url);

        // Get the data from the result
        const {data} = result;

        // Check if the data is empty
        // If it is empty, throw an error
        if(!data.articleList || !data.articleList.size == 0) {
            throw new Error("No data found");
        }

        // Get the title and rank of the movies
        const movieinfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        });

        for(let movieInfo of movieinfos) {
            console.log(`Rank: ${movieInfo.rank}. ${movieInfo.title}`);
        }
    } catch (err) {
        // Log the error
        throw new Error(err);
    }
}

// Call the function
getTop20Movies();