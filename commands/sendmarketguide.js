const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { marketGuideChannelId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send_market_guide")
    .setDescription("Send the default market guide message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const marketGuideChannel =
      interaction.member.guild.channels.cache.get(marketGuideChannelId);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("openRequestButton")
        .setLabel("Open Request")
        .setStyle("SUCCESS")
        .setEmoji("💰")
    );

    const embed = {
      author: {
        name: "Developer Hub",
        icon_url:
          "https://cdn.discordapp.com/icons/985660112779747388/4b1979b987a7113723bf0a211ca3c772.webp?size=96",
      },
      title: "Buying and Selling Guide",
      color: 6930876,
      description:
        "Before going ahead with any sale make sure to read over <#985710160464973854>!\n\nNever do business outside of the Developer Hub server or within direct messages. If another user lures you to do a deal outside of the Developer Hub discord server, please report this to a member off staff immediately with it likely being a scam.\n‏‏‎ ‎\n> Step One:\n- Create a Request via the button below.\n⠀\n> Step Two:\n- View the desired buy or sell channel. Contact a seller or buyer from within the channel.\n⠀\n> Step Three:\n- Come to an agreement with the user on the details of the transaction. (Example: Price, Payment Method)\n⠀\n> Step Four:\n- Open a middleman ticket within <#985713057055518751> and a verified middleman will walk you through the process of the deal for your desired product.\n\nNote: We will never request you to complete a sale via direct message or another server.*",
      timestamp: "",
      image: {},
      thumbnail: {},
      footer: {
        text: "Developer Hub",
        icon_url:
          "https://cdn.discordapp.com/icons/985660112779747388/4b1979b987a7113723bf0a211ca3c772.webp?size=96",
      },
      fields: [],
    };

    marketGuideChannel.send({
      components: [row],
      embeds: [embed],
    });

    return await interaction.reply({
      content: "Aye aye captain!",
      ephemeral: true,
    });
  },
};
