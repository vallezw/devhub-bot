// Currently there is a new file for each selling perhaps rewrite it into making multiple files
const fs = require("fs");

module.exports = {
  incrementListing: function incrementListing(listingPath) {
    fs.readFile(listingPath, (err, data) => {
      if (err) {
        fs.writeFile(listingPath, "0", { flag: "wx" }, function (err) {
          console.log(`Created ${listingPath}!`);
        });
        return;
      }

      let num = Number(data.toString()) + 1;
      console.log(num);
      fs.writeFile(listingPath, num.toString(), (err) => {
        if (err) throw err;
        console.log(`Incremented ${listingPath} listing by 1`);
      });
    });
  },

  checkTestRun: async function checkTestRun(args, callback) {
    // This method will check if its run as a test or not and thereby change the configs
    fs.unlink("config.json", (err) => {
      if (err) console.log(err);
      if (args[2] != undefined && args[2] == "test") {
        console.log("Running in test mode...");
        fs.copyFileSync("configs/testingConfig.json", "config.json");
        callback();
        return;
      }
      console.log("Running in main mode...");
      fs.copyFileSync("configs/mainConfig.json", "config.json");
      callback();
    });
  },
};
