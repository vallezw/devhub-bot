const {
  MessageActionRow,
  Modal,
  TextInputComponent,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton() || interaction.customId != "openRequestButton") return;
	await openModal(interaction);
  },
};

async function openModal(interaction) {
 	 // Create the modal
  	const modal = new Modal().setCustomId("sellModal").setTitle("Freelancing Sell");

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
      .setStyle("SHORT");

  	const skillsInput = new TextInputComponent()
		.setCustomId("skillsInput")
		.setLabel("What are your skills?")
		.setStyle("SHORT");

  	const portfoliosInput = new TextInputComponent()
		.setCustomId("portfoliosInput")
		.setLabel("Show me your cool projects and GitHub idk?")
		.setStyle("PARAGRAPH");
  
	const expertiseInput = new TextInputComponent()
		.setCustomId("expertiseInput")
		.setLabel("What are your expertises??")
		.setStyle("PARAGRAPH");

	const firstActionRow = new MessageActionRow().addComponents(typeInput);
	const secondActionRow = new MessageActionRow().addComponents(skillsInput);;
	const thirdActionRow = new MessageActionRow().addComponents(portfoliosInput);;
	const fourthActionRow = new MessageActionRow().addComponents(expertiseInput);

	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
	
	await interaction.showModal(modal);
}
