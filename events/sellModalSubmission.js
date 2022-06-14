const { MessageActionRow, MessageButton } = require("discord.js");
const { submissionsChannelId } = require("../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isModalSubmit() || interaction.customId != "sellModal")
      return;

    const submissionsChannel =
      interaction.member.guild.channels.cache.get(submissionsChannelId);

    await interaction.reply({
      content:
        "Thanks for the submission! Our support team will look over it soon.",
      ephemeral: true,
    });

    const submittedData = {
      sellType: interaction.fields.getTextInputValue("typeInput"),
      skills: interaction.fields.getTextInputValue("skillsInput"),
      portfolio: interaction.fields.getTextInputValue("portfoliosInput"),
      expertises: interaction.fields.getTextInputValue("expertiseInput"),
      author: interaction.user.toString(),
      avatarURL: interaction.user.avatarURL(),
    };

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("validateSellUser")
        .setLabel("Validate Sell")
        .setStyle("SUCCESS"),
      new MessageButton()
        .setCustomId("denyRequest")
        .setLabel("Deny Request")
        .setStyle("DANGER")
    );

    const embed = {
      title: "Sell listing #XXX",
      color: 6930876,
      description: "",
      timestamp: new Date(),
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

    await submissionsChannel.send({
      content: interaction.member.id,
      embeds: [embed],
      components: [row],
    });
  },
};
