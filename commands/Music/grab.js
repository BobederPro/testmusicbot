const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "grab",
  description: `Zeigt Infos zu einem speziellen Song`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  run: async ({ client, interaction, args, prefix }) => {
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Zuerst musst du einem Voicechannel joinen **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Aktuell wird nichts gespielt **`);
    } else {
      let song = queue.songs[0];
      interaction.member.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(song.thumbnail)
            .setAuthor({
              name: `Erfolgreich Infos gefunden..`,
              iconURL: song.url,
              url: song.url,
            })
            .setDescription(`>>> ** [${song.name}](${song.url}) **`)
            .addField(
              `${emoji.song_by} Angefordert von:`,
              `>>> ${song.user}`,
              true
            )
            .addField(
              `${emoji.time} Dauer:`,
              `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``,
              true
            )
            .addField(
              `${emoji.show_queue} Wiedergabeliste:`,
              `>>> \`${queue.songs.length} song(s)\`\n\`${queue.formattedDuration}\``,
              true
            )
            .addField(
              `${emoji.raise_volume} Lautstärke:`,
              `>>> \`${queue.volume} %\``,
              true
            )
            .addField(
              `${emoji.repeat_mode} Dauerschleife:`,
              `>>> ${
                queue.repeatMode
                  ? queue.repeatMode === 2
                    ? `${emoji.SUCCESS} \`Wiedergabeliste\``
                    : `${emoji.SUCCESS} \`Song\``
                  : `${emoji.ERROR}`
              }`,
              true
            )
            .addField(
              `${emoji.autoplay_mode} Autoplay:`,
              `>>> ${
                queue.autoplay ? `${emoji.SUCCESS}` : `${emoji.ERROR}`
              }`,
              true
            )
            .addField(
              `${emoji.filters} Filter${queue.filters.length > 0 ? "s" : ""}:`,
              `>>> ${
                queue.filters && queue.filters.length > 0
                  ? `${queue.filters.map((f) => `\`${f}\``).join(`, `)}`
                  : `${emoji.ERROR}`
              }`,
              queue.filters.length > 1 ? false : true
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      }).then(m => {
          interaction.followUp(` ${emoji.lyrics} Überprüfe deine DMs!!`)
      })
      .catch(e => {
          interaction.followUp(` ${emoji.ERROR} Kann dir keine Dm schicken, öffne deine DMs`)
      })
    }
  },
});
