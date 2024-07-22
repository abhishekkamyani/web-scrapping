require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sds = require("./websites/sds");
const techTargetRouter = require("./routers/techTarget");
const mediumRouter = require("./routers/medium");
const sdsRouter = require("./routers/sds");
const websitesRouter = require("./routers/websites");
 
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://production-website.com'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Enable credentials
}));

app
    .use("/api/v1/websites", websitesRouter)
    .use("/api/v1/techtarget", techTargetRouter)
    .use("/api/v1/medium", mediumRouter)
    .use("/api/v1/sds", sdsRouter)

const main = async () => {
    console.log(await sds.fetchAllPosts("https://www.superdatascience.com/blogs"));
 }



// main();
// app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});