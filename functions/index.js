const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    // check steps.js for examples
    response.json({ message: "Hello from function!" });
});
    



