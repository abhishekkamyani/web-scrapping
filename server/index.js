require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const medium = require("./websites/medium");
const techTargetRouter = require("./routers/techTarget");
const mediumRouter = require("./routers/medium");
 
const app = express();

app
    .use("/api/techtarget", techTargetRouter)
    .use("/api/medium", mediumRouter)

// const main = async () => {
//     console.log(await medium.fetchAllPosts('https://medium.com/search?q=Web Development'));
//  }



// main();
// app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});