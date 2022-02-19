const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "move",
  description: `Bewegt einen Song in der Wiedergabeliste`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "trackindex",
      description: `Gebe die Nummer des Songs in der Wiedergabeliste an`,
      type: "NUMBER",
      required: true,
    },
    {
      name: "targetindex",
      description: `Gebe die Nummer an, an welche Stelle er verschoben werden soll`,
      type: "NUMBER",
      required: true,
    },
  ],
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
      let songIndex = interaction.options.getNumber("trackindex");
      let position = interaction.options.getNumber("targetindex");
      if (position >= queue.songs.length || position < 0) position = -1;
      if (songIndex > queue.songs.length - 1) {
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setTitle(`${emoji.ERROR} **Dieser Song existiert nicht!**`)
              .setDescription(
                `>>> **Der letzte Song in der Warteschlange hat die Nummer: \`${queue.songs.length}\`**`
              )
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        });
      } else if (position === 0) {
        return interaction.followUp(
          `${emoji.ERROR} **Ich kann die Position des Liedes nicht verändern!**`
        );
      } else {
        let song = queue.songs[songIndex];
        queue.songs.splice(songIndex);
        queue.addToQueue(song, position);
        interaction.followUp(
          `📑 Position geändert des Liedes **${
            song.name
          }** zu der **\`${position}\`** Direkt dannach wurd der Song **_${
            queue.songs[position - 1].name
          } platziert _!**`
        );
      }
    }
  },
});
