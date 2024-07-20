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
    }
]


exports.getData = async (req, res, next) => {
    try {
        return res.json({ metadata: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
}