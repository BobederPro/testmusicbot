const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { createBar } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "nowplaying",
  description: `Gibt Infos zu dem aktuellen Song`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  run: async ({ client, interaction, args, prefix }) => {
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR}  Zuerst musst du einem Voicechannel joinen **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Aktuell wird nichts gespielt **`);
    } else {
      let song = queue.songs[0];
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(song.thumbnail)
            .setAuthor({
              name: `Zur Zeit wird gespielt:`,
              iconURL: song.url,
              url: song.url,
            })
            .setDescription(
              `>>> ** [${song.name}](${song.url}) ** \n\n ${createBar(queue)}`
            )
            .addFields([
              {
                name: `** ${emoji.time} Dauer **`,
                value: `>>> ${song.formattedDuration}`,
                inline: true,
              },
              {
                name: `** ${emoji.song_by} Angefordert von **`,
                value: `>>> ${song.user}`,
                inline: true,
              },
              {
                name: `** ${emoji.bot} Author **`,
                value: `>>> ${song.uploader.name}`,
                inline: true,
              },
              {
                name: `** ${emoji.raise_volume} Lautstärke: **`,
                value: `>>> ${queue.volume}%`,
                inline: true,
              },
              {
                name: `** ⬇️ Download: **`,
                value: `>>> [Jetzt herunterladen](${song.streamURL})`,
                inline: true,
              },
            ])
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    }
  },
});
