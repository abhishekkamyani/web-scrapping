require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const theServerSide = require("./websites/theServerSide");
const theServerSideRouter = require("./routers/theServerSide");
 
const app = express();

app
    .use("/api/theserverside", theServerSideRouter)

const main = async () => {
    // const result = await theServerSide.fetch_all_posts("https://www.techtarget.com/whatis/glossary/Artificial-intelligence");
    // console.log("result: " + result);
    // console.log(techtarget.fetch_posts);

    theServerSide.fetch_post("https://www.theserverside.com/definition/abstract-class?_gl=1*15rr3b4*_ga*MjQyMjQwNTU0LjE3MjEyODk1MDM.*_ga_TQKE4GS5P9*MTcyMTI5NjY5OS4zLjEuMTcyMTI5NzIxOC4wLjAuMA..");
}



// main();
// app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});