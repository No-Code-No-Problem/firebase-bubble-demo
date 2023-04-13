module.exports = {
    generateRandomArticles: function(count) {
        const articles = [];
        for (let i = 0; i < count; i++) {
            const title = "New Article " + Math.floor(Math.random() * 1000);
            const data = {
                title: title,
                body: `This is the content of ${title}`
            };
            articles.push(data);
        }
        return articles;
    }
}