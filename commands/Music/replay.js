const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  name: "replay",
  description: `Spielt den aktuellem Song nochmal`,
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
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ich bin gemuted, entmutet mich zuerst **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Es wird aktuell nichts gespielt **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Du bist kein DJ kannst also kein Lieder spielen **`
      );
    } else {
      await queue.seek(0).then((m) => {
        interaction.followUp(`** ${emoji.replay_track} Wiederholt den Track **`);
      });
    }
  },
});
