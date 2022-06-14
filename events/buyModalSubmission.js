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
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("denyRequest")
        .setLabel("Deny Request")
        .setStyle("DANGER")
    );

    const embed = {
      title: "Buy listing #XXX",
      color: 6930876,
      description: "",
      timestamp: new Date(),
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

    await submissionsChannel.send({
      content: interaction.member.id,
      embeds: [embed],
      components: [row],
    });
  },
};
