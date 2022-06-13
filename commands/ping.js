const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong?"),
  async execute(interaction) {
    return await interaction.reply({
      content:
        "Pong! Replied in `" + Math.round(interaction.client.ws.ping) + "ms`.",
      ephemeral: true,
    });
  },
};
