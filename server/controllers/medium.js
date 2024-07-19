const medium = require("../websites/medium");


const BASE_URL = "https://medium.com/search?q=";
exports.getAllPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        console.log(category);
        const result = await medium.fetchAllPosts(`${BASE_URL}${category}`);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log("error in controller: " + error);
        return res.json(error);
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const { url } = req.query;
        console.log(url);
        const result = await medium.fetchPost(url);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log("error in controller: " + error);
        return res.json(error);
    }
}

