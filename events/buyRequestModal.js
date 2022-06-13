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
      interaction.customId != "openBuyRequestButton"
    )
      return;
    await openModal(interaction);
  },
};

async function openModal(interaction) {
  // Create the modal
  const modal = new Modal().setCustomId("buyModal").setTitle("Buy Request");

  const scopeInput = new TextInputComponent()
    .setCustomId("scopeInput")
    .setLabel("What scope has your task?")
    .setPlaceholder("eg. One Time Gig")
    .setRequired(true)
    .setStyle("SHORT");

  const budgetInput = new TextInputComponent()
    .setCustomId("budgetInput")
    .setLabel("What is your budget?")
    .setPlaceholder("eg. $25–30")
    .setRequired(true)
    .setStyle("SHORT");

  const categoryInput = new TextInputComponent()
    .setCustomId("categoryInput")
    .setLabel("What category is your task in?")
    .setPlaceholder("eg. Discord Bot")
    .setRequired(true)
    .setStyle("SHORT");

  const deadlineInput = new TextInputComponent()
    .setCustomId("deadlineInput")
    .setPlaceholder("eg. 16 June")
    .setRequired(true)
    .setLabel("When is your deadline?")
    .setStyle("SHORT");

  const describeInput = new TextInputComponent()
    .setCustomId("describeInput")
    .setRequired(true)
    .setLabel("Quickly describe your task")
    .setStyle("PARAGRAPH");

  const firstActionRow = new MessageActionRow().addComponents(scopeInput);
  const secondActionRow = new MessageActionRow().addComponents(budgetInput);
  const thirdActionRow = new MessageActionRow().addComponents(categoryInput);
  const fourthActionRow = new MessageActionRow().addComponents(deadlineInput);
  const fithActionRow = new MessageActionRow().addComponents(describeInput);

  modal.addComponents(
    firstActionRow,
    secondActionRow,
    thirdActionRow,
    fourthActionRow,
    fithActionRow
  );

  await interaction.showModal(modal);
}
