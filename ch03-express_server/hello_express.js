// Initiate the express server
const express = require("express");
const { charsets } = require("mime");
// Create an express application
const app = express();
const port = 3000;

// "/" is the root path
app.get("/", (req, res) => {
    // Header setting
    res.set({ "Content-Type": "text/html", charsets: "utf-8" });
    res.end("Hello Express!");
});

// server start
app.listen(port, () => {
    console.log(`START SERVER : use ${port}`);
});   