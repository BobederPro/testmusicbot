const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  name: "removedupes",
  description: `Entfernt alle doppelten Songs von der Wiedergabeliste`,
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
      let msg = await interaction.followUp(
        `** Alle doppelten 🎧 Songs werden von der Wiedergabeliste entfernt. Bitte habe etwas Geduld... **`
      );
      let tracks = queue.songs;
      const newtracks = [];
      for (let i = 0; i < tracks.length; i++) {
        let exists = false;
        for (j = 0; j < newtracks.length; j++) {
          if (tracks[i].url === newtracks[j].url) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          newtracks.push(tracks[i]);
        }
      }
      queue.delete();
      await newtracks.map((song, index) => {
        queue.addToQueue(song, index);
      });

      msg.edit(`** Es wurden 🎧 \`${newtracks.length}\` doppelte Songs von der Wiedergabeliste entfernt **`);
    }
  },
});
