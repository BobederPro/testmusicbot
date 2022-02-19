const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  name: "clearqueue",
  description: `Löscht die Wiedergabeliste`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  run: async ({ client, interaction, args, prefix }) => {
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Zuerst musst du einem Voicechannel joinen **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} Du musst zuerst __meinem__ Voicechannel joinen **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Aktuell wird nichts gespielt **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Du bist kein DJ kannst also kein Lieder spielen **`
      );
    } else {
      queue.delete();
      interaction.followUp(`** ${emoji.SUCCESS} Wiedergabeliste erfolgreich gelöscht **`);
    }
  },
});
