const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
	const row = new MessageActionRow().addComponents(
		new MessageButton()
		.setCustomId("primary")
		.setLabel("Primary")
		.setStyle("PRIMARY")
  	);

	const embed = new MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Some title")
		.setURL("https://discord.js.org")
		.setDescription("Some description here");

	await interaction.reply({
		content: "Pong!",
		ephemeral: true,
		embeds: [embed],
		components: [row],
	});


	const filter = (i) =>
    i.customId === "primary" 

  	const collector = interaction.channel.createMessageComponentCollector({
		filter,
		time: 15000,
	});

	collector.on("collect", async (i) => {
		if (i.customId === "primary") {
			await i.update({ content: "A button was clicked!", components: [] });
		}
	});

	collector.on("end", (collected) =>
		console.log(`Collected ${collected.size} items`)
	);

  },
};
