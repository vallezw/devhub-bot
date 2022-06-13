const { MessageActionRow, MessageButton } = require("discord.js");
const { submissionsChannelId } = require("../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isModalSubmit() || interaction.customId != "buyModal")
      return;

    const submissionsChannel =
      interaction.member.guild.channels.cache.get(submissionsChannelId);

    await interaction.reply({
      content:
        "Thanks for the submission! Our support team will look over it soon.",
      ephemeral: true,
    });

    const submittedData = {
      scope: interaction.fields.getTextInputValue("scopeInput"),
      budget: interaction.fields.getTextInputValue("budgetInput"),
      category: interaction.fields.getTextInputValue("categoryInput"),
      deadline: interaction.fields.getTextInputValue("deadlineInput"),
      description: interaction.fields.getTextInputValue("describeInput"),
      author: interaction.user.toString(),
      avatarURL: interaction.user.avatarURL(),
    };

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("validateBuyUser")
        .setLabel("Validate Buy")
        .setStyle("PRIMARY")
    );

    await submissionsChannel.send({
      content: JSON.stringify(submittedData),
      components: [row],
    });
  },
};
