const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const {
  MessageActionRow,
  MessageButton,
} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder().setName("send_market_guide").
  setDescription("Send the default market guide message")
  	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
	console.log();
	const marketGuideChannel =
    interaction.member.guild.channels.cache.get(
      "985705261610188821"
    );
	
	const row = new MessageActionRow().addComponents(
		new MessageButton()
		.setCustomId("openRequestButton")
		.setLabel("Open Request")
		.setStyle("SUCCESS")
		.setEmoji("💰")
	);

	marketGuideChannel.send({
		content: "Market Guide: Chroxify do ur job!",
		components: [row],
	});

	return interaction.reply("Sure thing!");
  },
};
