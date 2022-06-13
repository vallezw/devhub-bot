const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isModalSubmit() || interaction.customId != "sellModal")
      return;

	const submissionsChannel =
    interaction.member.guild.channels.cache.get("985731962499108934");


    interaction.user.send("Thx m8"); // TODO: add repsonse thx for submitting sell etc
	interaction.reply("Thanks for the submission")
	interaction.member.guild.channels.cache
    .get("985705261610188821")
    .bulkDelete(1);


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
