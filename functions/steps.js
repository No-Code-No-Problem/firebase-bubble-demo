// 1. Functions Hello World
/*
exports.helloWorld = functions.https.onRequest(async (request, response) => {
    response.json({ message: "Hello from function!" });
});
*/



// 2. Environment Variables
// add OUR_TOKEN to .env file
/*
const ourToken = process.env.OUR_TOKEN;
*/



// 3. Functions + Authorization
/*
exports.helloWorld = functions.https.onRequest(async (request, response) => {
    if (request.headers.authorization !== "Bearer " + ourToken) {
        response.status(401).send("Unauthorized");
        return;
    }
    response.json({ message: "Authorized. Hello from function!" });
});
*/



// 3. Functions + BubbleAPI (Get Things)
/*
const bubbleBaseDataURL  = process.env.BUBBLE_DATA_URL;
const bubbleApiKey = process.env.BUBBLE_API_KEY;

const BubbleDataClient = require('./BubbleDataClient.js');
const bubbleApiClient = new BubbleDataClient(bubbleBaseDataURL, bubbleApiKey);

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    // Fetch all articles
    const res = await bubbleApiClient.getThings("Article", fetchAll=true);
    response.json({ ...res });
});
*/



// 4. Functions + BubbleAPI (Get Things + Constraints)
/*
const bubbleBaseDataURL  = process.env.BUBBLE_DATA_URL;
const bubbleApiKey = process.env.BUBBLE_API_KEY;

const BubbleDataClient = require('./BubbleDataClient.js');
const bubbleApiClient = new BubbleDataClient(bubbleBaseDataURL, bubbleApiKey);

const ConstraintsBuilder = require('./BubbleConstraintsBuilder.js');

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    const constraints = new ConstraintsBuilder().addConstraint("title", "equals", "Article 1").build();
    const res = await bubbleApiClient.getThings('Article', constraints, fetchAll=true);
    response.json({ ...res });
});
*/



// 5. Functions + BubbleAPI (Create Thing/Things)
/*
const { generateRandomArticles } = require('./Helpers.js')
const bubbleBaseDataURL  = process.env.BUBBLE_DATA_URL;
const bubbleApiKey = process.env.BUBBLE_API_KEY;

const BubbleDataClient = require('./BubbleDataClient.js');
const bubbleApiClient = new BubbleDataClient(bubbleBaseDataURL, bubbleApiKey);

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    // Create 1 new article
    // const newArticle = generateRandomArticles(1)[0];
    // const res = await bubbleApiClient.createThing('Article', newArticle);
    // const allthings = await bubbleApiClient.getThings('Article', fetchAll=true);
    // response.json({ ...res, updatedResult: allthings.response.results });

    // Create 3 new articles
    // const newArticles = generateRandomArticles(3);
    // const res = await bubbleApiClient.createBulkThings('Article', newArticles);
    // const allthings = await bubbleApiClient.getThings('Article', fetchAll=true);
    // response.json({ res, updatedResult: allthings.response.results });
});
*/

// 6. Functions + BubbleAPI (Update Thing/Things)
/*
const bubbleBaseDataURL  = process.env.BUBBLE_DATA_URL;
const bubbleApiKey = process.env.BUBBLE_API_KEY;

const ConstraintsBuilder = require('./BubbleConstraintsBuilder.js');

const BubbleDataClient = require('./BubbleDataClient.js');
const bubbleApiClient = new BubbleDataClient(bubbleBaseDataURL, bubbleApiKey);

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    // Create 1 new article
    const allArticles = await bubbleApiClient.getThings('Article', fetchAll=true);
    var firstArticle = allArticles.response.results[6];
    const res = await bubbleApiClient.updateThing('Article', firstArticle._id, { title: "Updated Title", body: "Updated Body"});
    const idConstraints = new ConstraintsBuilder().addConstraint("_id", "equals", firstArticle._id).build();
    const updatedThing = await bubbleApiClient.getThings('Article', idConstraints, fetchAll=true);
    console.log(updatedThing);
    response.json({ ...res, updatedThing });
});
*/


// 7. .etc (Delete Thing/Things) and more

// 8. 
// You can use cloud functions for pretty anything you want.
// Uploadimg images to storage, sending emails, do some calculations, etc.

