const coursera = require("../websites/coursera");


const BASE_URL = "https://www.coursera.org";
exports.getAllPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        console.log(category);
        const result = await coursera.fetchAllPosts(`${BASE_URL}/articles/category/${category}`);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log("error in controller: " + error);
        return res.json(error);
    }
}