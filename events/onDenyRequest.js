const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton() || interaction.customId != "denyRequest")
      return;

    await interaction.deferUpdate();
    await wait(500);
    await interaction.editReply({
      content: "Request has been denied!",
      components: [],
    });
  },
};
