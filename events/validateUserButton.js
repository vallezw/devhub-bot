const wait = require("node:timers/promises").setTimeout;
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton() || interaction.customId != "validateUser")
      return;

    const submittedData = JSON.parse(interaction.message.content);
    console.log(submittedData);

    await interaction.deferUpdate();
    await wait(4000);
    await interaction.editReply({
      content: "Request has been validated!",
      components: [],
    });

	const sellChannel =
    interaction.member.guild.channels.cache.get("985675363847913483");


  },
};
