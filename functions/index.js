const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    response.json({ message: "Hello from function!" });
});
    



