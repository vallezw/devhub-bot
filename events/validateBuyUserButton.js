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

    const submittedData = JSON.parse(interaction.message.content);

    await interaction.deferUpdate();
    await wait(4000);
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

      const embed = {
        title: "Buy listing #" + (number + 1).toString(),
        color: 6930876,
        description: "",
        timestamp: "2022-06-01T02:44:00.000Z",
        author: {
          name: "",
          icon_url: "",
        },
        image: {},
        thumbnail: { url: submittedData.avatarURL },
        footer: {
          text: "Developer Hub",
          icon_url: "",
        },
        fields: [
          {
            name: ":telescope: Scope:",
            value: submittedData.scope,
          },
          {
            name: ":dollar: Budget:",
            value: submittedData.budget,
          },
          {
            name: ":label: Category:",
            value: submittedData.category,
            inline: false,
          },
          {
            name: ":date: Deadline:",
            value: submittedData.deadline,
            inline: false,
          },
          {
            name: ":bust_in_silhouette: Client:",
            value: submittedData.author,
          },
          {
            name: ":page_facing_up: Description",
            value: submittedData.description,
          },
        ],
      };
      const buyChannel =
        interaction.member.guild.channels.cache.get(buyChannelId);

      buyChannel.send({
        embeds: [embed],
      });
    });
  },
};
