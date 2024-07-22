const sds = require("../websites/sds");

const BASE_URL = "https://www.superdatascience.com/blogs";
exports.getAllPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        console.log(category);
        const result = await sds.fetchAllPosts(BASE_URL);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log("error in controller: " + error);
        return res.json(error);
    }
}
