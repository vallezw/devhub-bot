module.exports = {
  name: "interactionCreate",
  execute(interaction) {
	if (!interaction.isModalSubmit() || interaction.customId != "sellModal") return; 
	interaction.user.send("Thx m8") // TODO: add repsonse thx for submitting sell etc
	
	const submittedData = {
		sellType: interaction.fields.getTextInputValue("typeInput"),
		skills: interaction.fields.getTextInputValue("skillsInput"),
		portfolio: interaction.fields.getTextInputValue("portfoliosInput"),
		expertises: interaction.fields.getTextInputValue("expertiseInput"),
  	};

	console.log(submittedData);
  },
};
