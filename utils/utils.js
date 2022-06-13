// Currently there is a new file for each selling perhaps rewrite it into making multiple files
const fs = require("fs");

module.exports = {
  incrementSellListing: function incrementSellListing() {
    const sellListingPath = "./data/sellListing.txt";
    fs.readFile(sellListingPath, (err, data) => {
      if (err) {
        fs.writeFile(sellListingPath, "0", { flag: "wx" }, function (err) {
          console.log("Created sellListing.txt!");
        });
        return;
      }

      let num = Number(data.toString()) + 1;
      console.log(num);
      fs.writeFile(sellListingPath, num.toString(), (err) => {
        if (err) throw err;
        console.log("Incremented sell listing by 1");
      });
    });
  },
};
