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

    // Send message to the user that your request has been validated
    interaction.client.users
      .fetch(interaction.message.content, false)
      .then((user) => {
        user.send(
          "Hey there, sorry to inform you that your request has been denied. Please wirte a ticket if you don't understand the reasoning behind this."
        );
      });
  },
};
