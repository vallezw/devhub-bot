var fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
      console.log("Created data directory");
    }

    client.user.setActivity("for new listings", { type: "WATCHING" });

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
