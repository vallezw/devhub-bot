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

    const submittedData = JSON.parse(interaction.message.content);

    await interaction.deferUpdate();
    await wait(4000);
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

      const embed = {
        title: "Sell listing #" + (number + 1).toString(),
        color: 6930876,
        description: "",
        timestamp: "2022-06-01T02:44:00.000Z",
        image: {},
        thumbnail: {
          url: submittedData.avatarURL,
        },
        footer: {
          text: "Developer Hub",
          icon_url: "",
        },
        fields: [
          {
            name: ":telescope: User accepts:",
            value: submittedData.sellType,
          },
          {
            name: ":briefcase: Portfolios:",
            value: submittedData.portfolio,
          },
          {
            name: ":metal: Skills:",
            value: submittedData.skills,
            inline: false,
          },
          {
            name: ":clap: Expertise:",
            value:
              submittedData.expertises +
              "\n\n:bust_in_silhouette: Listing by " +
              submittedData.author,
            inline: false,
          },
        ],
      };
      const sellChannel =
        interaction.member.guild.channels.cache.get(sellChannelId);

      sellChannel.send({
        embeds: [embed],
      });
    });
  },
};
