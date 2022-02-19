const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");

module.exports = new Command({
  // options
  name: "ping",
  description: `Zeigt den Ping des Bots`,
  userPermissions: ['SEND_MESSAGES'],
  botPermissions: ['SEND_MESSAGES'],
  category: "Information",
  cooldown: 10,
  run: async ({ client, interaction, args, prefix }) => {
    interaction.followUp(`\`\`\`html\n Ping :- ${client.ws.ping} \`\`\``)
  },
});
