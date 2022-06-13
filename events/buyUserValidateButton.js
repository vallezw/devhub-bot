const wait = require("node:timers/promises").setTimeout;
const { MessageEmbed } = require("discord.js");
const { buyChannelId } = require("../config.json");
const { incrementListing } = require("../utils/utils");
const fs = require("fs");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton() || interaction.customId != "validateBuyUser")
      return;

    const embed = interaction.message.embeds[0];

    await interaction.deferUpdate();
    await wait(500);
    await interaction.editReply({
      content: "Request has been validated!",
      components: [],
    });

    const buyListingPath = "./data/buyListing.txt";

    incrementListing(buyListingPath);
    fs.readFile(buyListingPath, (err, data) => {
      if (err) {
        data = 0;
      }
      let number = Number(data.toString());

      embed.title = "Buy listing #" + (number + 1).toString();

      const buyChannel =
        interaction.member.guild.channels.cache.get(buyChannelId);

      buyChannel.send({
        embeds: [embed],
      });
    });
  },
};
