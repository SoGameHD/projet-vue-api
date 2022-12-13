const client = require("./client/client.js");
const message = require("./services/command.js");

client.on ("ready", () => {
    console.log("🌤  Weather Bot Online ☁");
});

client.on("message", message);
