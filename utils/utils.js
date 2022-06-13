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
};
