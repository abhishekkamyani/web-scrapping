const datacamp = require("../websites/datacamp");


const BASE_URL = "https://www.datacamp.com/blog";
exports.getAllPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        console.log(category);
        const result = await datacamp.fetchAllPosts(`${BASE_URL}/category/${category}`);

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
        const result = await datacamp.fetchPost(BASE_URL + url);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log("error in controller: " + error);
        return res.json(error);
    }
}