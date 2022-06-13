const { MessageActionRow, MessageButton } = require("discord.js");
const { submissionsChannelId } = require("../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isModalSubmit() || interaction.customId != "sellModal") return;

    const submissionsChannel = interaction.member.guild.channels.cache.get(submissionsChannelId);
    
    
    await interaction.reply({
      content: "Thanks for the submission! Our support team will look over it soon.",
      ephemeral: true,
    });

    const submittedData = {
      sellType: interaction.fields.getTextInputValue("typeInput"),
      skills: interaction.fields.getTextInputValue("skillsInput"),
      portfolio: interaction.fields.getTextInputValue("portfoliosInput"),
      expertises: interaction.fields.getTextInputValue("expertiseInput"),
      author: interaction.user.tag,
    };

    
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("validateUser")
        .setLabel("Validate")
        .setStyle("SUCCESS")
    );

   	await submissionsChannel.send({
      content: JSON.stringify(submittedData),
      components: [row],
    });
  },
};
