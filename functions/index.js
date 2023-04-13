const functions = require("firebase-functions");



const { generateRandomArticles } = require('./Helpers.js')
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