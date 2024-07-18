const theServerSide = require("../websites/theServerSide");


const BASE_URL = "https://www.techtarget.com/whatis/glossary/";
exports.getAllPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
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
        const {category} = req.params;
        const result = await theServerSide.fetchPost(`https://www.techtarget.com/searchenterpriseai/definition/AgentGPT`);

        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return error;
    }
}

