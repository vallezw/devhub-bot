var fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
      console.log("Created data directory");
    }
  },
};
