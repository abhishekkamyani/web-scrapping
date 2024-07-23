const data = [
    {
        name: "Medium",
        slug: "medium",
        categories: ["Artificial Intelligence", "Web Development", "Data Science", "Machine Learning", "Deep Learning", "React", "JavaScript", "Python"],
        api: "medium/posts/"
    },
    {
        name: "Tech Target",
        slug: "techtarget",
        categories: ["Artificial-intelligence", "Internet-of-Things", "Robotics", "Agile-Scrum-XP-Programming", "Application-Development", "DevOps", "Programming"],
        api: "techtarget/posts/"
    },
    {
        name: "Super DataScience",
        slug: "sds",
        categories: ["All"],
        api: "sds/posts/"
    },
    {
        name: "Coursera",
        slug: "coursera",
        categories: ["ai-and-machine-learning", "data-analytics", "data-engineering", "data-science", "advance-your-machine-learning-engineer-career", "advance-your-business-analyst-career", "advance-your-data-analyst-career", "advance-your-data-scientist-career"],
        api: "coursera/posts/"
    },
    {
        name: "Datacamp",
        slug: "datacamp",
        categories: ["ai", "aws", "learn-business-intelligence", "git", "power-bi", "python", "r-programming", "sql"],
        api: "datacamp/posts/"
    },
]


exports.getData = async (req, res, next) => {
    try {
        return res.json({ metadata: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
}