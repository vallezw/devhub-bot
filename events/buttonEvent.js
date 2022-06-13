const {
  MessageActionRow,
  Modal,
  TextInputComponent,
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
  const modal = new Modal().setCustomId("myModal").setTitle("My Modal");
  // Add components to modal
  // Create the text input components
  const favoriteColorInput = new TextInputComponent()
    .setCustomId("favoriteColorInput")
    // The label is the prompt the user sees for this input
    .setLabel("What's your favorite color?")
    // Short means only a single line of text
    .setStyle("SHORT");
  const hobbiesInput = new TextInputComponent()
    .setCustomId("hobbiesInput")
    .setLabel("What's some of your favorite hobbies?")
    // Paragraph means multiple lines of text.
    .setStyle("PARAGRAPH");
  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new MessageActionRow().addComponents(
    favoriteColorInput
  );
  const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
  // Add inputs to the modal
  modal.addComponents(firstActionRow, secondActionRow);
  // Show the modal to the user
  await interaction.showModal(modal);
}
