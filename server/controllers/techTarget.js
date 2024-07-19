const theServerSide = require("../websites/techTarget");


const BASE_URL = "https://www.techtarget.com/whatis/glossary/";
exports.getAllPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        console.log(category);
        const result = await theServerSide.fetchAllPosts(`${BASE_URL}/${category}`);

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
        const result = await theServerSide.fetchPost(url);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log("error in controller: " + error);
        return res.json(error);
    }
}

