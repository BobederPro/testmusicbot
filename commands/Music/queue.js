const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { swap_pages } = require("../../handlers/functions");
const {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = new Command({
  name: "queue",
  description: `Zeigt die Wiedergabeliste`,
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
      let tracks = queue.songs;
      let quelist = [];
      var maxTracks = 10; 
      for (let i = 0; i < tracks.length; i += maxTracks) {
        let songs = tracks.slice(i, i + maxTracks);
        quelist.push(
          songs
            .map(
              (track, index) =>
                `**\` ${i + ++index}. \` [${track.name.substr(0, 60)}](${
                  track.url
                })** - \`${track.formattedDuration}\`\n> *Angefordert von: __${
                  track.user
                }__*`
            )
            .join(`\n`)
        );
      }

      let embeds = [];
      let theSongs = queue.songs;
      let limit = quelist.length;
      if (theSongs.length < 10) {
        for (let i = 0; i < limit; i++) {
          let desc = String(quelist[i]).substr(0, 2048);
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(
                  `Wiedergabe mit ${interaction.guild.name} ${theSongs.length} Liedern`
                )
                .setDescription(
                  `${
                    desc || `** Es sind ${theSongs.length} Lieder in der Wiedergabeliste **`
                  }`
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                .setColor(ee.color)
                .addField(
                  `**\` 0. \` __AKTUELLES LIED__**`,
                  `**[${queue.songs[0].name.substr(0, 60)}](${
                    queue.songs[0].url
                  })** - \`${
                    queue.songs[0].formattedDuration
                  }\`\n> *Angefordert von: __${queue.songs[0].user}__*`
                ),
            ],
          });
        }
      } else {
        for (let i = 0; i < limit; i++) {
          let desc = String(quelist[i]).substr(0, 2048);
          await embeds.push(
            new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
              .setTitle(
                `Wiedergabeliste mit ${interaction.guild.name} ${theSongs.length} Liedern`
              )
              .setDescription(
                `${desc || `** Es sind ${theSongs.length} Lieder in der Wiedergabeliste **`}`
              )
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })
              .setColor(ee.color)
              .addField(
                `**\` 0. \` __AKTUELLES LIED__**`,
                `**[${queue.songs[0].name.substr(0, 60)}](${
                  queue.songs[0].url
                })** - \`${
                  queue.songs[0].formattedDuration
                }\`\n> *Angefordert von: __${queue.songs[0].user}__*`
              )
          );
        }
        swap_pages(interaction, embeds);
      }
    }
  },
});
