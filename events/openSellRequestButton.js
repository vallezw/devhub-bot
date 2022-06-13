const {
  MessageActionRow,
  Modal,
  TextInputComponent,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (
      !interaction.isButton() ||
      interaction.customId != "openSellRequestButton"
    )
      return;
    await openModal(interaction);
  },
};

async function openModal(interaction) {
  // Create the modal
  const modal = new Modal().setCustomId("sellModal").setTitle("Sell Request");

  /* Cant retrieve this data currently bcz of discord.js
  	const sellTypeSelect = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
			.setCustomId("selectSellType")
			.setPlaceholder("What type of seller are you?")
			.addOptions([
			{
				label: "Fulltime",
				description: "You are a fulltime dude",
				value: "fulltime"
			},
			{
				label: "Part time",
				description: "You are a part time dude",
				value: "parttime"
			},
			])
		);

	*/

  const typeInput = new TextInputComponent()
    .setCustomId("typeInput")
    .setLabel("What type of seller are you?")
    .setPlaceholder("eg. Part-Time")
    .setRequired(true)
    .setStyle("SHORT");

  const skillsInput = new TextInputComponent()
    .setCustomId("skillsInput")
    .setLabel("What are your skills?")
    .setPlaceholder("eg. Website/Bot Programmer")
    .setRequired(true)
    .setStyle("SHORT");

  const portfoliosInput = new TextInputComponent()
    .setCustomId("portfoliosInput")
    .setRequired(true)
    .setLabel("Show me your Portfolio?")
    .setPlaceholder("Share your GitHub projects etc")
    .setStyle("PARAGRAPH");

  const expertiseInput = new TextInputComponent()
    .setCustomId("expertiseInput")
    .setLabel("What are your expertises??")
    .setPlaceholder("eg. Website developer for over 10 years")
    .setRequired(true)
    .setStyle("PARAGRAPH");

  const firstActionRow = new MessageActionRow().addComponents(typeInput);
  const secondActionRow = new MessageActionRow().addComponents(skillsInput);
  const thirdActionRow = new MessageActionRow().addComponents(portfoliosInput);
  const fourthActionRow = new MessageActionRow().addComponents(expertiseInput);

  modal.addComponents(
    firstActionRow,
    secondActionRow,
    thirdActionRow,
    fourthActionRow
  );

  await interaction.showModal(modal);
}
