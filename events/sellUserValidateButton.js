const wait = require("node:timers/promises").setTimeout;
const { MessageEmbed } = require("discord.js");
const { sellChannelId } = require("../config.json");
const { incrementListing } = require("../utils/utils");
const fs = require("fs");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton() || interaction.customId != "validateSellUser")
      return;

    const embed = interaction.message.embeds[0];

    await interaction.deferUpdate();
    await wait(500);
    await interaction.editReply({
      content: "Request has been validated!",
      components: [],
    });

    const sellListingPath = "./data/sellListing.txt";

    incrementListing(sellListingPath);
    fs.readFile(sellListingPath, (err, data) => {
      if (err) {
        data = 0;
      }
      let number = Number(data.toString());

      embed.title = "Sell listing #" + (number + 1).toString();

      const sellChannel =
        interaction.member.guild.channels.cache.get(sellChannelId);

      sellChannel.send({
        embeds: [embed],
      });
    });
  },
};
