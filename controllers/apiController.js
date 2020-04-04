const axios = require("axios")

class ApiController {
    static showProductivityTips(req,res){
        return axios.get(`http://newsapi.org/v2/everything?q=productivity-tips&from=2020-03-15&sortBy=publishedAt&apiKey=${process.env.APIKEY_NEWS}`)
        .then(result => {
            const { articles } = result.data
            let RecentTenArticles = []
            for (let i = 0; i < 10; i++) {
                RecentTenArticles.push(articles[i])
            }
            res.status(200).json({
                message: "article list successfully read",
                selectedArticles : RecentTenArticles
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
}

module.exports = ApiController